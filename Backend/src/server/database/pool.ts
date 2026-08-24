import type { PoolConfig } from "pg";
import { Pool } from "pg";

import { env } from "../config/env.js";

const poolConfig: PoolConfig = {
  connectionString: env.DATABASE_URL,
  max: env.DATABASE_POOL_MAX,
  idleTimeoutMillis: env.DATABASE_IDLE_TIMEOUT_MS,
  connectionTimeoutMillis: env.DATABASE_CONNECTION_TIMEOUT_MS,
};

export const pool = new Pool(poolConfig);

pool.on("connect", (client) => {
  void client.query(
    `SET statement_timeout = ${env.DATABASE_STATEMENT_TIMEOUT_MS}`,
  );
});
