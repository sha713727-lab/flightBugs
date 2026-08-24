import pino from "pino";

import { env } from "../config/env.js";

export const logger = pino({
  level: env.NODE_ENV === "production" ? "info" : "debug",
  base: {
    service: "backend",
  },
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "*.password",
      "*.token",
      "*.secret",
      "*.hmac",
      "HMAC_SIGNING_SECRET",
      "DUFFEL_API_TOKEN",
    ],
    remove: true,
  },
});
