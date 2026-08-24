import { Pool } from "pg";

const admin = new Pool({
  connectionString: "postgresql://postgres:postgres@127.0.0.1:5432/postgres",
});

try {
  await admin.query("CREATE DATABASE avion");
} catch (error) {
  if (
    error instanceof Error &&
    !error.message.includes("already exists")
  ) {
    throw error;
  }
} finally {
  await admin.end();
}
