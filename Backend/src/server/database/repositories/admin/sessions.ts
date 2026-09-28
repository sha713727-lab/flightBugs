import { randomBytes } from "node:crypto";

import { env } from "../../../config/env.js";
import { hashPassword, hashToken, verifyPassword } from "../../../auth/password.js";
import { pool } from "../../pool.js";

const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

export async function ensureBootstrapAdmin(): Promise<void> {
  const email = env.ADMIN_BOOTSTRAP_EMAIL.toLowerCase();
  const existing = await pool.query<{
    id: string;
    password_hash: string;
    password_salt: string;
  }>(
    `SELECT id, password_hash, password_salt
     FROM admin_users
     WHERE email = $1
     LIMIT 1`,
    [email],
  );
  const current = existing.rows[0];

  if (!current) {
    const hashed = await hashPassword(env.ADMIN_BOOTSTRAP_PASSWORD);
    await pool.query(
      `INSERT INTO admin_users (email, password_hash, password_salt)
       VALUES ($1, $2, $3)`,
      [email, hashed.hash, hashed.salt],
    );
    return;
  }

  const alreadyMatches = await verifyPassword(
    env.ADMIN_BOOTSTRAP_PASSWORD,
    current.password_hash,
    current.password_salt,
  );
  if (alreadyMatches) {
    return;
  }

  const hashed = await hashPassword(env.ADMIN_BOOTSTRAP_PASSWORD);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      `UPDATE admin_users
       SET password_hash = $1, password_salt = $2
       WHERE id = $3`,
      [hashed.hash, hashed.salt, current.id],
    );
    await client.query(`DELETE FROM admin_sessions WHERE admin_user_id = $1`, [
      current.id,
    ]);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function createAdminSession(
  email: string,
  password: string,
): Promise<{ token: string; expiresAt: string } | null> {
  await ensureBootstrapAdmin();

  const userResult = await pool.query<{
    id: string;
    password_hash: string;
    password_salt: string;
  }>(
    `SELECT id, password_hash, password_salt
     FROM admin_users
     WHERE email = $1
     LIMIT 1`,
    [email.toLowerCase()],
  );
  const user = userResult.rows[0];
  if (!user) {
    return null;
  }

  const valid = await verifyPassword(
    password,
    user.password_hash,
    user.password_salt,
  );
  if (!valid) {
    return null;
  }

  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await pool.query(
    `INSERT INTO admin_sessions (admin_user_id, token_hash, expires_at)
     VALUES ($1, $2, $3)`,
    [user.id, tokenHash, expiresAt.toISOString()],
  );

  return { token, expiresAt: expiresAt.toISOString() };
}

export async function deleteAdminSession(token: string): Promise<void> {
  await pool.query(`DELETE FROM admin_sessions WHERE token_hash = $1`, [
    hashToken(token),
  ]);
}

export async function isAdminSessionValid(token: string): Promise<boolean> {
  const result = await pool.query<{ id: string }>(
    `SELECT id
     FROM admin_sessions
     WHERE token_hash = $1 AND expires_at > NOW()
     LIMIT 1`,
    [hashToken(token)],
  );
  return Boolean(result.rows[0]);
}
