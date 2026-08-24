import { pool } from "../../pool.js";

export async function pruneExpiredNonces(): Promise<number> {
  const result = await pool.query(
    `
    DELETE FROM used_nonces
    WHERE expires_at <= NOW()
    `,
  );

  return result.rowCount ?? 0;
}
