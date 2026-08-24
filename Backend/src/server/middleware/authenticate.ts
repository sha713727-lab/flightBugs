import type { IncomingMessage, ServerResponse } from "node:http";

import { verifyHmacRequest } from "../auth/hmac.js";
import { sendError } from "../http/response.js";

export async function enforceHmacAuthentication(
  request: IncomingMessage,
  response: ServerResponse,
  path: string,
  rawBody: string,
): Promise<boolean> {
  const auth = await verifyHmacRequest(request, path, rawBody);

  if (!auth.ok) {
    sendError(response, auth.statusCode, auth.code, auth.message);
    return false;
  }

  return true;
}
