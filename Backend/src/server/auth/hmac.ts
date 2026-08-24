import type { IncomingMessage } from "node:http";

import { env } from "../config/env.js";
import { pool } from "../database/pool.js";
import { logger } from "../observability/logger.js";
import {
  buildHmacSignaturePayload,
  hmacSignaturesEqual,
  signHmacPayload,
} from "./hmac-crypto.js";

const TIMESTAMP_HEADER = "x-timestamp";
const NONCE_HEADER = "x-nonce";
const SIGNATURE_HEADER = "x-signature";

export async function verifyHmacRequest(
  request: IncomingMessage,
  path: string,
  rawBody: string,
): Promise<
  { ok: true } | { ok: false; statusCode: number; code: string; message: string }
> {
  const timestampHeader = request.headers[TIMESTAMP_HEADER];
  const nonceHeader = request.headers[NONCE_HEADER];
  const signatureHeader = request.headers[SIGNATURE_HEADER];

  if (
    typeof timestampHeader !== "string" ||
    typeof nonceHeader !== "string" ||
    typeof signatureHeader !== "string"
  ) {
    return {
      ok: false,
      statusCode: 401,
      code: "unauthenticated",
      message: "Missing authentication headers",
    };
  }

  const timestamp = Number.parseInt(timestampHeader, 10);
  if (!Number.isFinite(timestamp)) {
    return {
      ok: false,
      statusCode: 401,
      code: "unauthenticated",
      message: "Invalid timestamp",
    };
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  if (Math.abs(nowSeconds - timestamp) > 300) {
    return {
      ok: false,
      statusCode: 401,
      code: "expired_request",
      message: "Request timestamp expired",
    };
  }

  const payload = buildHmacSignaturePayload({
    method: request.method ?? "GET",
    path,
    timestamp: timestampHeader,
    nonce: nonceHeader,
    rawBody,
  });
  const expected = signHmacPayload(env.HMAC_SIGNING_SECRET, payload);

  if (!hmacSignaturesEqual(signatureHeader, expected)) {
    return {
      ok: false,
      statusCode: 401,
      code: "invalid_signature",
      message: "Invalid request signature",
    };
  }

  const inserted = await pool.query<{ nonce: string }>(
    `
    INSERT INTO used_nonces (nonce, expires_at)
    VALUES ($1, NOW() + INTERVAL '5 minutes')
    ON CONFLICT (nonce) DO NOTHING
    RETURNING nonce
    `,
    [nonceHeader],
  );

  if (!inserted.rowCount) {
    logger.warn({ path }, "HMAC nonce replay rejected");
    return {
      ok: false,
      statusCode: 401,
      code: "replay_detected",
      message: "Nonce already used",
    };
  }

  return { ok: true };
}
