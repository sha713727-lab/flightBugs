import type { IncomingMessage, ServerResponse } from "node:http";

import type {
  ApiErrorEnvelope,
  ApiSuccessEnvelope,
} from "../../types/api-envelope.js";
import { serializeJsonWithinLimit } from "./json-limit.js";

export function sendJson(
  response: ServerResponse,
  statusCode: number,
  body: ApiSuccessEnvelope<unknown> | ApiErrorEnvelope,
): void {
  const limited = serializeJsonWithinLimit(body);

  if (!limited.ok) {
    const fallback: ApiErrorEnvelope = {
      error: {
        code: "payload_too_large",
        message: "Response payload too large",
      },
    };
    const fallbackSerialized = JSON.stringify(fallback);
    response.writeHead(413, {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(fallbackSerialized),
    });
    response.end(fallbackSerialized);
    return;
  }

  response.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Content-Length": limited.byteLength,
  });
  response.end(limited.serialized);
}

export function sendError(
  response: ServerResponse,
  statusCode: number,
  code: string,
  message: string,
  fields?: ApiErrorEnvelope["error"]["fields"],
): void {
  sendJson(response, statusCode, {
    error: {
      code,
      message,
      ...(fields ? { fields } : {}),
    },
  });
}

export function sendSuccess<T>(
  response: ServerResponse,
  statusCode: number,
  data: T,
): void {
  sendJson(response, statusCode, { data });
}
