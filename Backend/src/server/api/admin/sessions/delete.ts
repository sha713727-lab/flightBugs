import type { IncomingMessage, ServerResponse } from "node:http";

import { deleteAdminSession } from "../../../database/repositories/admin/sessions.js";
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
    "admin-sessions-delete",
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

  const tokenHeader = request.headers["x-admin-session"];
  const token = typeof tokenHeader === "string" ? tokenHeader.trim() : "";
  if (!token) {
    sendError(response, 400, "invalid_input", "Missing admin session token");
    return;
  }

  await deleteAdminSession(token);
  sendSuccess(response, 200, { ok: true });
}
