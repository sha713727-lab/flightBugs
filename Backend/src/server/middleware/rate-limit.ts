import type { IncomingMessage, ServerResponse } from "node:http";

import { sendError } from "../http/response.js";
import { consumeRateLimitToken } from "../services/rate-limit/consume-token.js";

export function getClientIp(request: IncomingMessage): string {
  const forwarded = request.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  return request.socket.remoteAddress ?? "unknown";
}

export async function enforceRateLimit(
  request: IncomingMessage,
  response: ServerResponse,
  bucketPrefix: string,
  capacity: number,
  refillRatePerSecond: number,
): Promise<boolean> {
  const clientIp = getClientIp(request);
  const rateLimit = await consumeRateLimitToken(
    `${bucketPrefix}:${clientIp}`,
    capacity,
    refillRatePerSecond,
  );

  if (!rateLimit.ok) {
    response.setHeader("Retry-After", String(rateLimit.retryAfterSeconds));
    sendError(response, 429, "rate_limited", "Too many requests");
    return false;
  }

  return true;
}
