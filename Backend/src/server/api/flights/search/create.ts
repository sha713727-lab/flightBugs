import type { IncomingMessage, ServerResponse } from "node:http";

import { flightSearchRequestSchema } from "../../../../schemas/flights/search-flights.js";
import { flightSearchResponseSchema } from "../../../../schemas/flights/search-flights-response.js";
import { sendError, sendSuccess } from "../../../http/response.js";
import { enforceHmacAuthentication } from "../../../middleware/authenticate.js";
import { readRequestBody } from "../../../middleware/read-body.js";
import { enforceRateLimit } from "../../../middleware/rate-limit.js";
import { logger } from "../../../observability/logger.js";
import { searchFlightsWithDuffel } from "../../../services/flights/search-flights.js";

export async function handler(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  const path = "/flights/search";

  const allowed = await enforceRateLimit(
    request,
    response,
    "flight-search",
    30,
    0.2,
  );
  if (!allowed) {
    return;
  }

  const bodyResult = await readRequestBody(request);
  if (!bodyResult.ok) {
    sendError(response, 413, bodyResult.code, bodyResult.message);
    return;
  }

  const authenticated = await enforceHmacAuthentication(
    request,
    response,
    path,
    bodyResult.rawBody,
  );
  if (!authenticated) {
    return;
  }

  let parsedBody: unknown;
  try {
    parsedBody = JSON.parse(bodyResult.rawBody) as unknown;
  } catch {
    sendError(response, 400, "invalid_json", "Request body must be valid JSON");
    return;
  }

  const validation = flightSearchRequestSchema.safeParse(parsedBody);
  if (!validation.success) {
    sendError(
      response,
      400,
      "invalid_input",
      "Flight search input is invalid",
      validation.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    );
    return;
  }

  try {
    const data = await searchFlightsWithDuffel(validation.data);
    const output = flightSearchResponseSchema.safeParse(data);
    if (!output.success) {
      logger.error({ route: path }, "Flight search output validation failed");
      sendError(
        response,
        500,
        "internal_error",
        "Flight search could not be completed",
      );
      return;
    }

    sendSuccess(response, 200, output.data);
  } catch (error) {
    logger.error(
      {
        err: error instanceof Error ? error.message : "unknown",
        route: path,
      },
      "Flight search failed",
    );
    sendError(
      response,
      422,
      "search_failed",
      "Flight search could not be completed",
    );
  }
}
