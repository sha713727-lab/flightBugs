import type { PoolConfig } from "pg";
import { Pool } from "pg";

import { env } from "../config/env.js";

function connectionStringWithStatementTimeout(
  databaseUrl: string,
  statementTimeoutMs: number,
): string {
  const url = new URL(databaseUrl);
  const existingOptions = url.searchParams.get("options") ?? "";
  const timeoutOption = `-c statement_timeout=${String(statementTimeoutMs)}`;
  url.searchParams.set(
    "options",
    existingOptions.length > 0
      ? `${existingOptions} ${timeoutOption}`
      : timeoutOption,
  );
  return url.toString();
}

const poolConfig: PoolConfig = {
  connectionString: connectionStringWithStatementTimeout(
    env.DATABASE_URL,
    env.DATABASE_STATEMENT_TIMEOUT_MS,
  ),
  max: env.DATABASE_POOL_MAX,
  idleTimeoutMillis: env.DATABASE_IDLE_TIMEOUT_MS,
  connectionTimeoutMillis: env.DATABASE_CONNECTION_TIMEOUT_MS,
};

export const pool = new Pool(poolConfig);
