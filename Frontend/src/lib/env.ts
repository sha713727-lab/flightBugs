import { z } from "zod";

const gaMeasurementIdSchema = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim().length > 0
      ? value.trim()
      : undefined,
  z
    .string()
    .regex(/^G-[A-Z0-9]+$/, "must be a GA4 Measurement ID (G-…)")
    .optional(),
);

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_GA_MEASUREMENT_ID: gaMeasurementIdSchema,
  })
  .strict();

const parsed = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
});

if (!parsed.success) {
  throw new Error(
    `Invalid Frontend environment configuration: ${parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ")}`,
  );
}

export const env = parsed.data;
