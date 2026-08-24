import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { Pool } from "pg";

const migrationsDir = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../Database/migrations",
);

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const pool = new Pool({ connectionString: databaseUrl });

const files = readdirSync(migrationsDir)
  .filter((name) => /^\d{4}_.+\.sql$/.test(name))
  .sort((a, b) => a.localeCompare(b));

try {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  for (const fileName of files) {
    const version = fileName.replace(/\.sql$/, "");
    const existing = await pool.query<{ version: string }>(
      `SELECT version FROM schema_migrations WHERE version = $1`,
      [version],
    );

    if (existing.rowCount) {
      continue;
    }

    const sql = readFileSync(join(migrationsDir, fileName), "utf8");
    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      await client.query(sql);
      await client.query(
        `INSERT INTO schema_migrations (version) VALUES ($1)`,
        [version],
      );
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
} finally {
  await pool.end();
}
