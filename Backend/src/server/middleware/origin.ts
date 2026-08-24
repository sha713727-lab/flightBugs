import type { IncomingMessage, ServerResponse } from "node:http";

import { env } from "../config/env.js";
import { sendError } from "../http/response.js";

const MUTATING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

const allowedOrigins = env.ALLOWED_ORIGINS.split(",")
  .map((value) => value.trim())
  .filter((value) => value.length > 0);

export type OriginCheckResult =
  | { ok: true; origin: string | null }
  | { ok: false };

export function assertAllowedOrigin(
  request: IncomingMessage,
  response: ServerResponse,
): OriginCheckResult {
  const method = request.method ?? "GET";
  const originHeader = request.headers.origin;
  const refererHeader = request.headers.referer;

  let origin: string | null = null;

  if (typeof originHeader === "string" && originHeader.length > 0) {
    origin = originHeader;
  } else if (typeof refererHeader === "string" && refererHeader.length > 0) {
    try {
      origin = new URL(refererHeader).origin;
    } catch {
      sendError(response, 403, "forbidden_origin", "Origin is not allowed");
      return { ok: false };
    }
  }

  if (MUTATING_METHODS.has(method)) {
    if (!origin || !allowedOrigins.includes(origin)) {
      sendError(response, 403, "forbidden_origin", "Origin is not allowed");
      return { ok: false };
    }
  } else if (origin && !allowedOrigins.includes(origin)) {
    sendError(response, 403, "forbidden_origin", "Origin is not allowed");
    return { ok: false };
  }

  if (origin && allowedOrigins.includes(origin)) {
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader("Vary", "Origin");
    response.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, X-Timestamp, X-Nonce, X-Signature",
    );
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  }

  return { ok: true, origin };
}

export function isAllowedOriginValue(origin: string): boolean {
  return allowedOrigins.includes(origin);
}
