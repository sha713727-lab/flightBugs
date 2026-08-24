import { consumeRateLimitToken as consumeRateLimitTokenRepository } from "../../database/repositories/rate-limit/consume-token.js";

export async function consumeRateLimitToken(
  bucketKey: string,
  capacity: number,
  refillRatePerSecond: number,
): Promise<
  { ok: true } | { ok: false; retryAfterSeconds: number }
> {
  return consumeRateLimitTokenRepository(
    bucketKey,
    capacity,
    refillRatePerSecond,
  );
}
