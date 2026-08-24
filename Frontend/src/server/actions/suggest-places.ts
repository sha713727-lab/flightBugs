"use server";

import { buildSuggestPlacesPath } from "@/constants/flightSearchPlaces";
import { getSignedBackend } from "@/lib/backend-request";
import { logger } from "@/lib/structured-logger";
import { suggestPlacesQuerySchema } from "@/schemas/flights/suggest-places";
import type {
  FlightPlaceSuggestionsActionResult,
  FlightPlaceSuggestionsResponse,
} from "@/types/flights/place-suggestions";

export async function suggestPlacesAction(
  query: unknown,
): Promise<FlightPlaceSuggestionsActionResult> {
  const validation = suggestPlacesQuerySchema.safeParse({ query });

  if (!validation.success) {
    return {
      ok: false,
      message: "Enter at least 2 characters to search airports worldwide.",
    };
  }

  const path = buildSuggestPlacesPath(validation.data.query);
  const result = await getSignedBackend<FlightPlaceSuggestionsResponse>(path);

  if (!result.ok) {
    logger.warn(
      {
        status: result.status,
        route: "/flights/places/suggestions",
      },
      "Place suggest action failed",
    );
    return {
      ok: false,
      message: "Airport search is unavailable right now. Please try again.",
    };
  }

  return { ok: true, data: result.data };
}
