import type { IncomingMessage, ServerResponse } from "node:http";

import { listDestinations } from "../../../database/repositories/destinations/destinations.js";
import { sendSuccess } from "../../../http/response.js";
import { enforceAdminSession } from "../../../middleware/admin-session.js";
import { enforceHmacAuthentication } from "../../../middleware/authenticate.js";
import { enforceRateLimit } from "../../../middleware/rate-limit.js";

export async function handler(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  const path = "/destinations/list";

  const allowed = await enforceRateLimit(
    request,
    response,
    "destinations-list",
    60,
    1,
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

  const url = new URL(request.url ?? "/", "http://localhost");
  const scope = url.searchParams.get("scope");
  const publishedOnly = scope !== "admin";

  if (!publishedOnly) {
    const adminOk = await enforceAdminSession(request, response);
    if (!adminOk) {
      return;
    }
  }

  const data = await listDestinations({ publishedOnly });
  sendSuccess(response, 200, { destinations: data });
}
