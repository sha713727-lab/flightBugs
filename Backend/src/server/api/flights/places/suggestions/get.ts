import type { IncomingMessage, ServerResponse } from "node:http";

import {
  buildSuggestPlacesPath,
  suggestPlacesQuerySchema,
} from "../../../../../schemas/flights/suggest-places.js";
import { flightPlaceSuggestionsResponseSchema } from "../../../../../schemas/flights/suggest-places-response.js";
import { sendError, sendSuccess } from "../../../../http/response.js";
import { enforceHmacAuthentication } from "../../../../middleware/authenticate.js";
import { enforceRateLimit } from "../../../../middleware/rate-limit.js";
import { logger } from "../../../../observability/logger.js";
import { suggestPlacesWithDuffel } from "../../../../services/flights/suggest-places.js";

export async function handler(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  const allowed = await enforceRateLimit(
    request,
    response,
    "flight-places",
    60,
    0.5,
  );
  if (!allowed) {
    return;
  }

  const url = new URL(request.url ?? "/", "http://localhost");
  const query = url.searchParams.get("query") ?? "";
  const validation = suggestPlacesQuerySchema.safeParse({ query });

  if (!validation.success) {
    sendError(
      response,
      400,
      "invalid_input",
      "Place search input is invalid",
      validation.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    );
    return;
  }

  const path = buildSuggestPlacesPath(validation.data.query);
  const authenticated = await enforceHmacAuthentication(
    request,
    response,
    path,
    "",
  );
  if (!authenticated) {
    return;
  }

  try {
    const data = await suggestPlacesWithDuffel(validation.data.query);
    const output = flightPlaceSuggestionsResponseSchema.safeParse(data);
    if (!output.success) {
      logger.error({ route: path }, "Place search output validation failed");
      sendError(
        response,
        500,
        "internal_error",
        "Place search could not be completed",
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
      "Place search failed",
    );
    sendError(
      response,
      422,
      "search_failed",
      "Place search could not be completed",
    );
  }
}
