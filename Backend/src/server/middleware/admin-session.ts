import type { IncomingMessage, ServerResponse } from "node:http";

import { isAdminSessionValid } from "../database/repositories/admin/sessions.js";
import { sendError } from "../http/response.js";

export async function enforceAdminSession(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<boolean> {
  const tokenHeader = request.headers["x-admin-session"];
  const token = typeof tokenHeader === "string" ? tokenHeader.trim() : "";
  if (!token) {
    sendError(response, 401, "unauthenticated", "Missing admin session");
    return false;
  }

  const valid = await isAdminSessionValid(token);
  if (!valid) {
    sendError(response, 401, "unauthenticated", "Invalid or expired admin session");
    return false;
  }

  return true;
}
