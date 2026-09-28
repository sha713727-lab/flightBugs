import type { IncomingMessage, ServerResponse } from "node:http";

import {
  getDestinationById,
  getDestinationBySlug,
} from "../../../database/repositories/destinations/destinations.js";
import { sendError, sendSuccess } from "../../../http/response.js";
import { enforceAdminSession } from "../../../middleware/admin-session.js";
import { enforceHmacAuthentication } from "../../../middleware/authenticate.js";
import { enforceRateLimit } from "../../../middleware/rate-limit.js";

export async function handler(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  const path = "/destinations/details";

  const allowed = await enforceRateLimit(
    request,
    response,
    "destinations-details",
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

  const url = new URL(request.url ?? "/", "http://localhost");
  const slug = url.searchParams.get("slug");
  const id = url.searchParams.get("id");
  const scope = url.searchParams.get("scope");
  const publishedOnly = scope !== "admin";

  if (!publishedOnly) {
    const adminOk = await enforceAdminSession(request, response);
    if (!adminOk) {
      return;
    }
  }

  if (slug) {
    const destination = await getDestinationBySlug(slug, { publishedOnly });
    if (!destination) {
      sendError(response, 404, "not_found", "Destination not found");
      return;
    }
    sendSuccess(response, 200, { destination });
    return;
  }

  if (id) {
    if (publishedOnly) {
      sendError(response, 400, "invalid_input", "Public details require slug");
      return;
    }
    const destination = await getDestinationById(id);
    if (!destination) {
      sendError(response, 404, "not_found", "Destination not found");
      return;
    }
    sendSuccess(response, 200, { destination });
    return;
  }

  sendError(response, 400, "invalid_input", "slug or id is required");
}
