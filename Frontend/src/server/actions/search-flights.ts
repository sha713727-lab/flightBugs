"use server";

import { postSignedBackend } from "@/lib/backend-request";
import { logger } from "@/lib/structured-logger";
import { flightSearchInputSchema } from "@/schemas/flights/search-flights";
import type {
  FlightSearchActionResult,
  FlightSearchResponse,
} from "@/types/flights/search-response";

export async function searchFlightsAction(
  input: unknown,
): Promise<FlightSearchActionResult> {
  const validation = flightSearchInputSchema.safeParse(input);

  if (!validation.success) {
    return {
      ok: false,
      message: "Please check your search details and try again.",
    };
  }

  const result = await postSignedBackend<FlightSearchResponse>(
    "/flights/search",
    validation.data,
  );

  if (!result.ok) {
    logger.warn(
      {
        status: result.status,
        route: "/flights/search",
      },
      "Flight search action failed",
    );
    return {
      ok: false,
      message:
        "We could not search flights right now. Please call our agent for help.",
    };
  }

  return { ok: true, data: result.data };
}
