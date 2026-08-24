import type { IncomingMessage, ServerResponse } from "node:http";

import { logger } from "../observability/logger.js";
import { sendError } from "../http/response.js";

export async function withErrorBoundary(
  request: IncomingMessage,
  response: ServerResponse,
  run: () => Promise<void>,
): Promise<void> {
  try {
    await run();
  } catch (error) {
    logger.error(
      {
        err: error instanceof Error ? error.message : "unknown",
        method: request.method,
        url: request.url,
      },
      "Unhandled request error",
    );

    if (!response.headersSent) {
      sendError(response, 500, "internal_error", "Unexpected server error");
    }
  }
}
