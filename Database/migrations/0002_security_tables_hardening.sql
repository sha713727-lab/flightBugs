ALTER TABLE rate_limit_buckets
  ADD COLUMN IF NOT EXISTS id UUID,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;

UPDATE rate_limit_buckets
SET
  id = COALESCE(id, gen_random_uuid()),
  created_at = COALESCE(created_at, NOW()),
  updated_at = COALESCE(updated_at, NOW());

ALTER TABLE rate_limit_buckets
  ALTER COLUMN id SET DEFAULT gen_random_uuid(),
  ALTER COLUMN id SET NOT NULL,
  ALTER COLUMN created_at SET DEFAULT NOW(),
  ALTER COLUMN created_at SET NOT NULL,
  ALTER COLUMN updated_at SET DEFAULT NOW(),
  ALTER COLUMN updated_at SET NOT NULL;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'rate_limit_buckets_pkey'
      AND conrelid = 'rate_limit_buckets'::regclass
  ) THEN
    ALTER TABLE rate_limit_buckets DROP CONSTRAINT rate_limit_buckets_pkey;
  END IF;
END $$;

ALTER TABLE rate_limit_buckets ADD PRIMARY KEY (id);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'rate_limit_buckets_bucket_key_key'
  ) THEN
    ALTER TABLE rate_limit_buckets
      ADD CONSTRAINT rate_limit_buckets_bucket_key_key UNIQUE (bucket_key);
  END IF;
END $$;

ALTER TABLE used_nonces
  ADD COLUMN IF NOT EXISTS id UUID,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;

UPDATE used_nonces
SET
  id = COALESCE(id, gen_random_uuid()),
  created_at = COALESCE(created_at, NOW()),
  updated_at = COALESCE(updated_at, NOW());

ALTER TABLE used_nonces
  ALTER COLUMN id SET DEFAULT gen_random_uuid(),
  ALTER COLUMN id SET NOT NULL,
  ALTER COLUMN created_at SET DEFAULT NOW(),
  ALTER COLUMN created_at SET NOT NULL,
  ALTER COLUMN updated_at SET DEFAULT NOW(),
  ALTER COLUMN updated_at SET NOT NULL;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'used_nonces_pkey'
      AND conrelid = 'used_nonces'::regclass
  ) THEN
    ALTER TABLE used_nonces DROP CONSTRAINT used_nonces_pkey;
  END IF;
END $$;

ALTER TABLE used_nonces ADD PRIMARY KEY (id);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'used_nonces_nonce_key'
  ) THEN
    ALTER TABLE used_nonces
      ADD CONSTRAINT used_nonces_nonce_key UNIQUE (nonce);
  END IF;
END $$;

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS rate_limit_buckets_set_updated_at ON rate_limit_buckets;
CREATE TRIGGER rate_limit_buckets_set_updated_at
  BEFORE UPDATE ON rate_limit_buckets
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();

DROP TRIGGER IF EXISTS used_nonces_set_updated_at ON used_nonces;
CREATE TRIGGER used_nonces_set_updated_at
  BEFORE UPDATE ON used_nonces
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();
