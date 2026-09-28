import type { IncomingMessage, ServerResponse } from "node:http";

import { adminSessionCreateSchema } from "../../../../schemas/destinations/destination.js";
import { createAdminSession } from "../../../database/repositories/admin/sessions.js";
import { sendError, sendSuccess } from "../../../http/response.js";
import { enforceHmacAuthentication } from "../../../middleware/authenticate.js";
import { readRequestBody } from "../../../middleware/read-body.js";
import { enforceRateLimit } from "../../../middleware/rate-limit.js";

export async function handler(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  const path = "/admin/sessions";

  const allowed = await enforceRateLimit(
    request,
    response,
    "admin-sessions-create",
    10,
    0.05,
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

  const validation = adminSessionCreateSchema.safeParse(parsedBody);
  if (!validation.success) {
    sendError(response, 400, "invalid_input", "Login input is invalid", 
      validation.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    );
    return;
  }

  const session = await createAdminSession(
    validation.data.email,
    validation.data.password,
  );
  if (!session) {
    sendError(response, 401, "unauthenticated", "Invalid email or password");
    return;
  }

  sendSuccess(response, 201, session);
}
