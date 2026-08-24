import { suggestPlacesQuerySchema } from "../../../schemas/flights/suggest-places.js";
import type {
  FlightPlaceSuggestion,
  FlightPlaceSuggestionsResponse,
} from "../../../types/flights/place-suggestions.js";
import { env } from "../../config/env.js";

type DuffelAirport = {
  readonly id: string;
  readonly name: string;
  readonly iata_code?: string;
  readonly iata_country_code?: string;
  readonly city_name?: string;
};

type DuffelPlace = {
  readonly id: string;
  readonly type: "airport" | "city";
  readonly name: string;
  readonly iata_code?: string;
  readonly iata_country_code?: string;
  readonly city_name?: string;
  readonly airports?: ReadonlyArray<DuffelAirport>;
};

type DuffelSuggestionsResponse = {
  readonly data?: ReadonlyArray<DuffelPlace>;
  readonly errors?: ReadonlyArray<{
    readonly message?: string;
  }>;
};

export async function suggestPlacesWithDuffel(
  query: string,
): Promise<FlightPlaceSuggestionsResponse> {
  const validation = suggestPlacesQuerySchema.safeParse({ query });
  if (!validation.success) {
    throw new Error(validation.error.issues[0]?.message ?? "Invalid search query");
  }

  const url = new URL(`${env.DUFFEL_API_BASE_URL}/places/suggestions`);
  url.searchParams.set("query", validation.data.query);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${env.DUFFEL_API_TOKEN}`,
      "Duffel-Version": env.DUFFEL_API_VERSION,
    },
    cache: "no-store",
  });

  const payload = (await response.json()) as DuffelSuggestionsResponse;

  if (!response.ok) {
    const message = payload.errors?.[0]?.message ?? "Place search failed";
    throw new Error(message);
  }

  return {
    places: flattenDuffelPlaces(payload.data ?? []).slice(0, 12),
  };
}

function flattenDuffelPlaces(
  places: ReadonlyArray<DuffelPlace>,
): ReadonlyArray<FlightPlaceSuggestion> {
  const results: FlightPlaceSuggestion[] = [];
  const seen = new Set<string>();

  for (const place of places) {
    if (place.type === "airport") {
      appendPlace(results, seen, mapAirportPlace(place));
      continue;
    }

    if (place.type === "city") {
      appendPlace(results, seen, mapCityPlace(place));

      for (const airport of place.airports ?? []) {
        appendPlace(
          results,
          seen,
          mapNestedAirportPlace(airport, place.name),
        );
      }
    }
  }

  return results;
}

function mapAirportPlace(place: DuffelPlace): FlightPlaceSuggestion | null {
  if (!place.iata_code || !place.iata_country_code) {
    return null;
  }

  return {
    id: place.id,
    iata: place.iata_code,
    city: place.city_name ?? place.name,
    name: place.name,
    countryCode: place.iata_country_code,
    kind: "airport",
  };
}

function mapCityPlace(place: DuffelPlace): FlightPlaceSuggestion | null {
  if (!place.iata_code || !place.iata_country_code) {
    return null;
  }

  return {
    id: place.id,
    iata: place.iata_code,
    city: place.name,
    name: place.name,
    countryCode: place.iata_country_code,
    kind: "city",
  };
}

function mapNestedAirportPlace(
  airport: DuffelAirport,
  cityName: string,
): FlightPlaceSuggestion | null {
  if (!airport.iata_code || !airport.iata_country_code) {
    return null;
  }

  return {
    id: airport.id,
    iata: airport.iata_code,
    city: airport.city_name ?? cityName,
    name: airport.name,
    countryCode: airport.iata_country_code,
    kind: "airport",
  };
}

function appendPlace(
  results: FlightPlaceSuggestion[],
  seen: Set<string>,
  place: FlightPlaceSuggestion | null,
): void {
  if (!place) {
    return;
  }

  const key = `${place.kind}:${place.iata}`;
  if (seen.has(key)) {
    return;
  }

  seen.add(key);
  results.push(place);
}
