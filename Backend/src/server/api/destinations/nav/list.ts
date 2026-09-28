import type { IncomingMessage, ServerResponse } from "node:http";

import { listNavDestinations } from "../../../database/repositories/destinations/destinations.js";
import { sendSuccess } from "../../../http/response.js";
import { enforceHmacAuthentication } from "../../../middleware/authenticate.js";
import { enforceRateLimit } from "../../../middleware/rate-limit.js";

export async function handler(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  const path = "/destinations/nav";

  const allowed = await enforceRateLimit(
    request,
    response,
    "destinations-nav",
    120,
    2,
  );
  if (!allowed) {
    return;
  }

  const authenticated = await enforceHmacAuthentication(
    request,
    response,
    path,
    "",
  );
  if (!authenticated) {
    return;
  }

  const data = await listNavDestinations();
  sendSuccess(response, 200, { destinations: data });
}
