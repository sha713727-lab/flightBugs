import type { IncomingMessage, ServerResponse } from "node:http";

import { destinationUpdateSchema } from "../../../schemas/destinations/destination.js";
import { updateDestination } from "../../database/repositories/destinations/destinations.js";
import { sendError, sendSuccess } from "../../http/response.js";
import { MAX_UPLOAD_BYTES } from "../../http/upload-limit.js";
import { enforceAdminSession } from "../../middleware/admin-session.js";
import { enforceHmacAuthentication } from "../../middleware/authenticate.js";
import { readRequestBody } from "../../middleware/read-body.js";
import { enforceRateLimit } from "../../middleware/rate-limit.js";
import { logger } from "../../observability/logger.js";

export async function handler(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  const path = "/destinations";

  const allowed = await enforceRateLimit(
    request,
    response,
    "destinations-update",
    30,
    0.2,
  );
  if (!allowed) {
    return;
  }

  const bodyResult = await readRequestBody(request, MAX_UPLOAD_BYTES);
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

  const validation = destinationUpdateSchema.safeParse(parsedBody);
  if (!validation.success) {
    sendError(
      response,
      400,
      "invalid_input",
      "Destination input is invalid",
      validation.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    );
    return;
  }

  try {
    const { id, ...rest } = validation.data;
    const destination = await updateDestination(id, {
      ...rest,
      heroMediaAssetId: rest.heroMediaAssetId ?? null,
      heroCtaText: rest.heroCtaText ?? null,
      canonicalUrl: rest.canonicalUrl ?? null,
      ogTitle: rest.ogTitle ?? null,
      ogDescription: rest.ogDescription ?? null,
      ogMediaAssetId: rest.ogMediaAssetId ?? null,
      primaryKeyword: rest.primaryKeyword ?? null,
      secondaryKeywords: rest.secondaryKeywords ?? null,
      thingsToDo: rest.thingsToDo.map((item) => ({
        title: item.title,
        description: item.description,
        imageMediaAssetId: item.imageMediaAssetId ?? null,
        imageAlt: item.imageAlt ?? "",
        sortOrder: item.sortOrder,
      })),
      experiences: rest.experiences.map((item) => ({
        title: item.title,
        description: item.description,
        imageMediaAssetId: item.imageMediaAssetId ?? null,
        imageAlt: item.imageAlt ?? "",
        sortOrder: item.sortOrder,
      })),
      culinaryItems: rest.culinaryItems.map((item) => ({
        title: item.title,
        description: item.description,
        imageMediaAssetId: item.imageMediaAssetId ?? null,
        imageAlt: item.imageAlt ?? "",
        sortOrder: item.sortOrder,
      })),
      airports: rest.airports.map((item) => ({
        airportName: item.airportName,
        airportCode: item.airportCode,
        description: item.description,
        distanceOrArea: item.distanceOrArea,
        airportLink: item.airportLink ?? null,
        sortOrder: item.sortOrder,
      })),
    });
    if (!destination) {
      sendError(response, 404, "not_found", "Destination not found");
      return;
    }
    sendSuccess(response, 200, { destination });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown";
    const code =
      typeof error === "object" && error !== null && "code" in error
        ? String(error.code)
        : "";
    if (message.includes("destinations_slug_key")) {
      sendError(response, 409, "conflict", "Slug already exists");
      return;
    }
    if (code === "23503") {
      sendError(response, 422, "invalid_input", "Media asset does not exist");
      return;
    }
    logger.error({ err: message, route: path }, "Destination update failed");
    sendError(response, 500, "internal_error", "Destination could not be updated");
  }
}
