import { createHash, createHmac, randomUUID } from "node:crypto";

import { env } from "@/lib/env";
import { serverEnv } from "@/lib/server-env";

export function createSignedBackendHeaders(
  method: string,
  path: string,
  rawBody: string,
): Record<string, string> {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const nonce = randomUUID();
  const bodyHash = createHash("sha256").update(rawBody).digest("hex");
  const payload = `${method}:${path}:${timestamp}:${nonce}:${bodyHash}`;
  const signature = createHmac("sha256", serverEnv.HMAC_SIGNING_SECRET)
    .update(payload)
    .digest("hex");

  return {
    "Content-Type": "application/json",
    Origin: env.NEXT_PUBLIC_APP_URL,
    "X-Timestamp": timestamp,
    "X-Nonce": nonce,
    "X-Signature": signature,
  };
}

export async function postSignedBackend<T>(
  path: string,
  body: unknown,
): Promise<
  | { ok: true; data: T }
  | { ok: false; status: number; message: string }
> {
  const rawBody = JSON.stringify(body);
  const headers = createSignedBackendHeaders("POST", path, rawBody);
  const response = await fetch(`${serverEnv.BACKEND_URL}${path}`, {
    method: "POST",
    headers,
    body: rawBody,
    cache: "no-store",
  });

  const payload = (await response.json()) as
    | { data: T }
    | { error: { message: string } };

  if (!response.ok) {
    const message =
      "error" in payload ? payload.error.message : "Request failed";
    return { ok: false, status: response.status, message };
  }

  if (!("data" in payload)) {
    return { ok: false, status: response.status, message: "Invalid response" };
  }

  return { ok: true, data: payload.data };
}

export async function getSignedBackend<T>(
  path: string,
): Promise<
  | { ok: true; data: T }
  | { ok: false; status: number; message: string }
> {
  const headers = createSignedBackendHeaders("GET", path, "");
  const response = await fetch(`${serverEnv.BACKEND_URL}${path}`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const payload = (await response.json()) as
    | { data: T }
    | { error: { message: string } };

  if (!response.ok) {
    const message =
      "error" in payload ? payload.error.message : "Request failed";
    return { ok: false, status: response.status, message };
  }

  if (!("data" in payload)) {
    return { ok: false, status: response.status, message: "Invalid response" };
  }

  return { ok: true, data: payload.data };
}
