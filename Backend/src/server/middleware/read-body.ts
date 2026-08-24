import type { IncomingMessage } from "node:http";

import { MAX_JSON_BYTES } from "../http/json-limit.js";

export type ReadBodyResult =
  | { ok: true; rawBody: string }
  | { ok: false; code: "payload_too_large"; message: string };

export async function readRequestBody(
  request: IncomingMessage,
  maxBytes: number = MAX_JSON_BYTES,
): Promise<ReadBodyResult> {
  const chunks: Buffer[] = [];
  let total = 0;

  for await (const chunk of request) {
    const buffer = typeof chunk === "string" ? Buffer.from(chunk) : chunk;
    total += buffer.byteLength;

    if (total > maxBytes) {
      request.destroy();
      return {
        ok: false,
        code: "payload_too_large",
        message: "Request body too large",
      };
    }

    chunks.push(buffer);
  }

  return { ok: true, rawBody: Buffer.concat(chunks).toString("utf8") };
}
