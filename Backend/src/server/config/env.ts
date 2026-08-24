import { z } from "zod";

import { loadEnvFile } from "./load-env-file.js";

loadEnvFile();

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]),
    HOST: z.string().min(1),
    PORT: z.coerce.number().int().positive(),
    DATABASE_URL: z.string().min(1),
    DATABASE_POOL_MAX: z.coerce.number().int().positive(),
    DATABASE_IDLE_TIMEOUT_MS: z.coerce.number().int().positive(),
    DATABASE_CONNECTION_TIMEOUT_MS: z.coerce.number().int().positive(),
    DATABASE_STATEMENT_TIMEOUT_MS: z.coerce.number().int().positive(),
    HMAC_SIGNING_SECRET: z.string().min(32),
    ALLOWED_ORIGINS: z.string().min(1),
    DUFFEL_API_TOKEN: z.string().min(1),
    DUFFEL_API_VERSION: z.string().min(1),
    DUFFEL_API_BASE_URL: z.string().url(),
    DUFFEL_SUPPLIER_TIMEOUT_MS: z.coerce.number().int().min(2000).max(60000),
  })
  .strict();

const parsed = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV ?? "development",
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_POOL_MAX: process.env.DATABASE_POOL_MAX,
  DATABASE_IDLE_TIMEOUT_MS: process.env.DATABASE_IDLE_TIMEOUT_MS,
  DATABASE_CONNECTION_TIMEOUT_MS: process.env.DATABASE_CONNECTION_TIMEOUT_MS,
  DATABASE_STATEMENT_TIMEOUT_MS: process.env.DATABASE_STATEMENT_TIMEOUT_MS,
  HMAC_SIGNING_SECRET: process.env.HMAC_SIGNING_SECRET,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
  DUFFEL_API_TOKEN: process.env.DUFFEL_API_TOKEN,
  DUFFEL_API_VERSION: process.env.DUFFEL_API_VERSION,
  DUFFEL_API_BASE_URL: process.env.DUFFEL_API_BASE_URL,
  DUFFEL_SUPPLIER_TIMEOUT_MS: process.env.DUFFEL_SUPPLIER_TIMEOUT_MS,
});

if (!parsed.success) {
  throw new Error(
    `Invalid environment configuration: ${parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ")}`,
  );
}

export const env = parsed.data;
