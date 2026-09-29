import type { IncomingMessage, ServerResponse } from "node:http";

import { sendError, sendSuccess } from "../../http/response.js";
import { enforceAdminSession } from "../../middleware/admin-session.js";
import { enforceHmacAuthentication } from "../../middleware/authenticate.js";
import { readRequestBodyBuffer } from "../../middleware/read-body-buffer.js";
import { enforceRateLimit } from "../../middleware/rate-limit.js";
import { createUploadedMediaAsset } from "../../services/media/create-media-asset.js";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export async function handler(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  const path = "/media";

  const allowed = await enforceRateLimit(
    request,
    response,
    "media-create",
    20,
    0.1,
  );
  if (!allowed) {
    return;
  }

  const bodyResult = await readRequestBodyBuffer(request, MAX_UPLOAD_BYTES);
  if (!bodyResult.ok) {
    sendError(response, 413, bodyResult.code, bodyResult.message);
    return;
  }

  const authenticated = await enforceHmacAuthentication(
    request,
    response,
    path,
    bodyResult.buffer.toString("latin1"),
  );
  if (!authenticated) {
    return;
  }

  const adminOk = await enforceAdminSession(request, response);
  if (!adminOk) {
    return;
  }

  const filenameHeader = request.headers["x-filename"];
  const mimeHeader = request.headers["x-mime-type"];
  const altHeader = request.headers["x-alt-text"];
  const originalFilename =
    typeof filenameHeader === "string" ? filenameHeader : "";
  const declaredMime = typeof mimeHeader === "string" ? mimeHeader : "";
  const altText = typeof altHeader === "string" ? altHeader : "";
  const allowedMime = new Set(["image/jpeg", "image/png", "image/webp"]);

  if (
    !allowedMime.has(declaredMime) ||
    !/\.(jpe?g|png|webp)$/i.test(originalFilename)
  ) {
    sendError(
      response,
      400,
      "invalid_input",
      "Only JPEG, PNG, or WebP images are allowed",
    );
    return;
  }

  const created = await createUploadedMediaAsset({
    buffer: bodyResult.buffer,
    originalFilename,
    declaredMime,
    altText,
  });

  if ("error" in created) {
    sendError(
      response,
      400,
      "invalid_input",
      "Only JPEG, PNG, or WebP images are allowed",
    );
    return;
  }

  sendSuccess(response, 201, { media: created });
}
