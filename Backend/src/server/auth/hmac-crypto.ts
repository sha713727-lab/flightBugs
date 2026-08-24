import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export function hashRequestBody(rawBody: string): string {
  return createHash("sha256").update(rawBody).digest("hex");
}

export function buildHmacSignaturePayload(input: {
  readonly method: string;
  readonly path: string;
  readonly timestamp: string;
  readonly nonce: string;
  readonly rawBody: string;
}): string {
  const bodyHash = hashRequestBody(input.rawBody);
  return `${input.method}:${input.path}:${input.timestamp}:${input.nonce}:${bodyHash}`;
}

export function signHmacPayload(secret: string, payload: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function hmacSignaturesEqual(
  provided: string,
  expected: string,
): boolean {
  const providedBuffer = Buffer.from(provided, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");
  return (
    providedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(providedBuffer, expectedBuffer)
  );
}
