import { createHash, createHmac, randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

function loadEnvFile(): void {
  const envPath = join(dirname(fileURLToPath(import.meta.url)), "../.env");
  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    process.env[key] = value;
  }
}

loadEnvFile();

const backendUrl = `http://${process.env.HOST ?? "127.0.0.1"}:${process.env.PORT ?? "3001"}`;
const path = "/flights/search";
const body = {
  origin: "YUL",
  destination: "LHR",
  departDate: "2026-08-28",
  returnDate: "2026-09-05",
  adults: 1,
  cabinClass: "economy",
  tripType: "round_trip",
};
const rawBody = JSON.stringify(body);
const timestamp = String(Math.floor(Date.now() / 1000));
const nonce = randomUUID();
const secret = process.env.HMAC_SIGNING_SECRET ?? "";
const bodyHash = createHash("sha256").update(rawBody).digest("hex");
const payload = `POST:${path}:${timestamp}:${nonce}:${bodyHash}`;
const signature = createHmac("sha256", secret).update(payload).digest("hex");

const response = await fetch(`${backendUrl}${path}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Timestamp": timestamp,
    "X-Nonce": nonce,
    "X-Signature": signature,
  },
  body: rawBody,
});

const result = await response.json();

if (!response.ok) {
  process.stderr.write(
    `Search test failed (${response.status}): ${JSON.stringify(result, null, 2)}\n`,
  );
  process.exit(1);
}

const offers = "data" in result ? result.data.offers?.length ?? 0 : 0;
process.stdout.write(
  `Search test passed: ${offers} offers returned (request ${result.data.offerRequestId})\n`,
);

if (offers > 0) {
  const first = result.data.offers[0];
  process.stdout.write(
    `Sample offer: ${first.airlineName} ${first.cabinClass} ${first.outbound.originCode}-${first.outbound.destinationCode}\n`,
  );
}
