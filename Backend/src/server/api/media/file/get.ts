import { createReadStream } from "node:fs";
import { access } from "node:fs/promises";
import { join } from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";

import { env } from "../../../config/env.js";
import { getMediaAssetById } from "../../../database/repositories/media/media-assets.js";
import { sendError } from "../../../http/response.js";
import { enforceRateLimit } from "../../../middleware/rate-limit.js";

export async function handler(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  const allowed = await enforceRateLimit(
    request,
    response,
    "media-file",
    300,
    5,
  );
  if (!allowed) {
    return;
  }

  const url = new URL(request.url ?? "/", "http://localhost");
  const id = url.searchParams.get("id");
  if (!id) {
    sendError(response, 400, "invalid_input", "id is required");
    return;
  }

  const asset = await getMediaAssetById(id);
  if (!asset) {
    sendError(response, 404, "not_found", "Media not found");
    return;
  }

  const absolutePath = join(env.UPLOAD_ROOT, asset.storageKey);
  try {
    await access(absolutePath);
  } catch {
    sendError(response, 404, "not_found", "Media file missing");
    return;
  }

  response.writeHead(200, {
    "Content-Type": asset.mimeType,
    "Cache-Control": "public, max-age=86400",
    "X-Content-Type-Options": "nosniff",
  });
  createReadStream(absolutePath).pipe(response);
}
