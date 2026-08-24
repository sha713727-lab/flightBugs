import { z } from "zod";

const optionalTrimmed = (value: unknown) =>
  typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;

const gaMeasurementIdSchema = z.preprocess(
  optionalTrimmed,
  z
    .string()
    .regex(/^G-[A-Z0-9]+$/, "must be a GA4 Measurement ID (G-…)")
    .optional(),
);

const clarityProjectIdSchema = z.preprocess(
  optionalTrimmed,
  z
    .string()
    .regex(/^[a-z0-9]+$/i, "must be a Microsoft Clarity project ID")
    .optional(),
);

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_GA_MEASUREMENT_ID: gaMeasurementIdSchema,
    NEXT_PUBLIC_CLARITY_PROJECT_ID: clarityProjectIdSchema,
  })
  .strict();

const parsed = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  NEXT_PUBLIC_CLARITY_PROJECT_ID: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
});

if (!parsed.success) {
  throw new Error(
    `Invalid Frontend environment configuration: ${parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ")}`,
  );
}

export const env = parsed.data;
