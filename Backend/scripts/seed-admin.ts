import { verifyPassword } from "../src/server/auth/password.js";
import { env } from "../src/server/config/env.js";
import { ensureBootstrapAdmin } from "../src/server/database/repositories/admin/sessions.js";
import { pool } from "../src/server/database/pool.js";

await ensureBootstrapAdmin();

const stored = await pool.query<{
  password_hash: string;
  password_salt: string;
}>(
  `SELECT password_hash, password_salt
   FROM admin_users
   WHERE email = $1
   LIMIT 1`,
  [env.ADMIN_BOOTSTRAP_EMAIL.toLowerCase()],
);
const user = stored.rows[0];
if (!user) {
  throw new Error("Admin bootstrap user was not created");
}

const matches = await verifyPassword(
  env.ADMIN_BOOTSTRAP_PASSWORD,
  user.password_hash,
  user.password_salt,
);
if (!matches) {
  throw new Error("Admin bootstrap password does not match stored hash");
}

await pool.end();
