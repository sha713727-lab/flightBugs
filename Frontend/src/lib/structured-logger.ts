import pino from "pino";

import { env } from "@/lib/env";

export const logger = pino({
  level: env.NODE_ENV === "production" ? "info" : "debug",
  base: {
    service: "frontend",
  },
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "*.password",
      "*.token",
      "*.secret",
      "*.hmac",
    ],
    remove: true,
  },
});
