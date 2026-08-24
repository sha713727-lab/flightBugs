import { pool } from "../../pool.js";
import { computeRetryAfterSeconds } from "./retry-after.js";

type ConsumeTokenResult =
  | { ok: true }
  | { ok: false; retryAfterSeconds: number };

export async function consumeRateLimitToken(
  bucketKey: string,
  capacity: number,
  refillRatePerSecond: number,
): Promise<ConsumeTokenResult> {
  const result = await pool.query<{ tokens: string }>(
    `
    INSERT INTO rate_limit_buckets (
      bucket_key,
      tokens,
      capacity,
      refill_rate,
      last_refill_at
    )
    VALUES ($1, $2::numeric - 1, $2::numeric, $3::numeric, NOW())
    ON CONFLICT (bucket_key) DO UPDATE
    SET
      tokens = LEAST(
        rate_limit_buckets.capacity,
        rate_limit_buckets.tokens
          + EXTRACT(EPOCH FROM (NOW() - rate_limit_buckets.last_refill_at))
            * rate_limit_buckets.refill_rate
      ) - 1,
      last_refill_at = NOW(),
      capacity = EXCLUDED.capacity,
      refill_rate = EXCLUDED.refill_rate
    WHERE LEAST(
      rate_limit_buckets.capacity,
      rate_limit_buckets.tokens
        + EXTRACT(EPOCH FROM (NOW() - rate_limit_buckets.last_refill_at))
          * rate_limit_buckets.refill_rate
    ) >= 1
    RETURNING tokens
    `,
    [bucketKey, capacity, refillRatePerSecond],
  );

  if (!result.rowCount) {
    return {
      ok: false,
      retryAfterSeconds: computeRetryAfterSeconds(refillRatePerSecond),
    };
  }

  return { ok: true };
}
