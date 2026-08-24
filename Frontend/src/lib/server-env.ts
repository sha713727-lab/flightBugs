import { z } from "zod";

const serverEnvSchema = z
  .object({
    BACKEND_URL: z.string().url(),
    HMAC_SIGNING_SECRET: z.string().min(32),
  })
  .strict();

const parsed = serverEnvSchema.safeParse({
  BACKEND_URL: process.env.BACKEND_URL,
  HMAC_SIGNING_SECRET: process.env.HMAC_SIGNING_SECRET,
});

if (!parsed.success) {
  throw new Error(
    `Invalid server environment configuration: ${parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ")}`,
  );
}

export const serverEnv = parsed.data;
