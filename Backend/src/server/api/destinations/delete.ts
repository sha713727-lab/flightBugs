import type { IncomingMessage, ServerResponse } from "node:http";
import { z } from "zod";

import { deleteDestination } from "../../database/repositories/destinations/destinations.js";
import { sendError, sendSuccess } from "../../http/response.js";
import { enforceAdminSession } from "../../middleware/admin-session.js";
import { enforceHmacAuthentication } from "../../middleware/authenticate.js";
import { readRequestBody } from "../../middleware/read-body.js";
import { enforceRateLimit } from "../../middleware/rate-limit.js";

const deleteSchema = z
  .object({
    id: z.string().uuid(),
  })
  .strict();

export async function handler(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  const path = "/destinations";

  const allowed = await enforceRateLimit(
    request,
    response,
    "destinations-delete",
    20,
    0.1,
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

  const adminOk = await enforceAdminSession(request, response);
  if (!adminOk) {
    return;
  }

  let parsedBody: unknown;
  try {
    parsedBody = JSON.parse(bodyResult.rawBody) as unknown;
  } catch {
    sendError(response, 400, "invalid_json", "Request body must be valid JSON");
    return;
  }

  const validation = deleteSchema.safeParse(parsedBody);
  if (!validation.success) {
    sendError(response, 400, "invalid_input", "Destination id is required");
    return;
  }

  const deleted = await deleteDestination(validation.data.id);
  if (!deleted) {
    sendError(response, 404, "not_found", "Destination not found");
    return;
  }

  sendSuccess(response, 200, { ok: true });
}
