CREATE TABLE IF NOT EXISTS rate_limit_buckets (
  bucket_key TEXT PRIMARY KEY,
  tokens NUMERIC NOT NULL CHECK (tokens >= 0),
  capacity NUMERIC NOT NULL CHECK (capacity > 0),
  refill_rate NUMERIC NOT NULL CHECK (refill_rate > 0),
  last_refill_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS used_nonces (
  nonce TEXT PRIMARY KEY,
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS used_nonces_expires_at_idx ON used_nonces (expires_at);
