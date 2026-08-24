import type { FlightSearchRequest } from "../../../schemas/flights/search-flights.js";
import type {
  FlightLegSummary,
  FlightOfferSummary,
  FlightSearchResponse,
} from "../../../types/flights/search-response.js";
import { env } from "../../config/env.js";

type DuffelPlace = {
  readonly iata_code?: string;
  readonly city_name?: string;
  readonly name?: string;
};

type DuffelCarrier = {
  readonly name: string;
  readonly iata_code?: string;
};

type DuffelSegment = {
  readonly departing_at: string;
  readonly arriving_at: string;
  readonly duration?: string;
  readonly origin?: DuffelPlace;
  readonly destination?: DuffelPlace;
  readonly operating_carrier?: DuffelCarrier;
  readonly marketing_carrier?: DuffelCarrier;
  readonly flight_number?: string;
};

type DuffelSlice = {
  readonly segments: ReadonlyArray<DuffelSegment>;
};

type DuffelOffer = {
  readonly id: string;
  readonly cabin_class?: string;
  readonly slices: ReadonlyArray<DuffelSlice>;
  readonly owner?: DuffelCarrier;
};

type DuffelOfferRequestResponse = {
  readonly data: {
    readonly id: string;
    readonly offers?: ReadonlyArray<DuffelOffer>;
  };
};

type DuffelErrorResponse = {
  readonly errors?: ReadonlyArray<{
    readonly code?: string;
    readonly message?: string;
  }>;
};

const duffelTestAirlineIata = "ZZ";

export async function searchFlightsWithDuffel(
  input: FlightSearchRequest,
): Promise<FlightSearchResponse> {
  const slices = [
    {
      origin: input.origin,
      destination: input.destination,
      departure_date: input.departDate,
    },
  ];

  if (input.returnDate) {
    slices.push({
      origin: input.destination,
      destination: input.origin,
      departure_date: input.returnDate,
    });
  }

  const passengers = Array.from({ length: input.adults }, () => ({
    type: "adult" as const,
  }));

  const url = new URL(`${env.DUFFEL_API_BASE_URL}/air/offer_requests`);
  url.searchParams.set("return_offers", "true");
  url.searchParams.set("supplier_timeout", String(env.DUFFEL_SUPPLIER_TIMEOUT_MS));

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.DUFFEL_API_TOKEN}`,
      "Duffel-Version": env.DUFFEL_API_VERSION,
    },
    body: JSON.stringify({
      data: {
        slices,
        passengers,
        cabin_class: input.cabinClass,
      },
    }),
    cache: "no-store",
  });

  const payload = (await response.json()) as
    | DuffelOfferRequestResponse
    | DuffelErrorResponse;

  if (!response.ok) {
    const message =
      "errors" in payload && payload.errors?.[0]?.message
        ? payload.errors[0].message
        : "Flight search failed";
    throw new Error(message);
  }

  if (!("data" in payload)) {
    throw new Error("Flight search failed");
  }

  const offers = payload.data.offers ?? [];
  const bookableOffers = offers.filter(
    (offer) => offer.owner?.iata_code !== duffelTestAirlineIata,
  );

  return {
    offerRequestId: payload.data.id,
    offers: bookableOffers.slice(0, 20).map(mapOffer),
  };
}

function mapOffer(offer: DuffelOffer): FlightOfferSummary {
  const outboundSlice = offer.slices[0];
  const returnSlice = offer.slices[1];
  const outboundSegments = outboundSlice?.segments ?? [];
  const returnSegments = returnSlice?.segments ?? [];

  return {
    id: offer.id,
    airlineName: resolveOfferAirlineName(offer, outboundSegments),
    cabinClass: formatCabinClass(offer.cabin_class),
    outbound: mapLeg(outboundSegments),
    return: returnSegments.length > 0 ? mapLeg(returnSegments) : null,
  };
}

function resolveOfferAirlineName(
  offer: DuffelOffer,
  outboundSegments: ReadonlyArray<DuffelSegment>,
): string {
  const ownerName = offer.owner?.name?.trim();
  if (ownerName) {
    return ownerName;
  }

  const firstOutbound = outboundSegments[0];
  const marketingName = firstOutbound?.marketing_carrier?.name?.trim();
  if (marketingName) {
    return marketingName;
  }

  const operatingName = firstOutbound?.operating_carrier?.name?.trim();
  if (operatingName) {
    return operatingName;
  }

  return "Airline";
}

function mapLeg(segments: ReadonlyArray<DuffelSegment>): FlightLegSummary {
  const first = segments[0];
  const last = segments[segments.length - 1];

  return {
    departureAt: first?.departing_at ?? "",
    arrivalAt: last?.arriving_at ?? "",
    originCode: first?.origin?.iata_code ?? "---",
    originCity: placeCity(first?.origin),
    destinationCode: last?.destination?.iata_code ?? "---",
    destinationCity: placeCity(last?.destination),
    durationMinutes: sumLegDurationMinutes(segments),
    stops: Math.max(0, segments.length - 1),
    flightNumbers: segments.map(formatFlightNumber),
  };
}

function placeCity(place: DuffelPlace | undefined): string {
  if (place?.city_name) {
    return place.city_name;
  }

  if (place?.name) {
    return place.name;
  }

  return place?.iata_code ?? "---";
}

function sumLegDurationMinutes(segments: ReadonlyArray<DuffelSegment>): number {
  let total = 0;

  for (const segment of segments) {
    if (segment.duration) {
      total += parseIsoDurationMinutes(segment.duration);
      continue;
    }

    if (segment.departing_at && segment.arriving_at) {
      total += Math.max(
        0,
        Math.round(
          (new Date(segment.arriving_at).getTime() -
            new Date(segment.departing_at).getTime()) /
            60_000,
        ),
      );
    }
  }

  return total;
}

function parseIsoDurationMinutes(duration: string): number {
  const hours = /(\d+)H/.exec(duration)?.[1];
  const minutes = /(\d+)M/.exec(duration)?.[1];
  return (
    (hours ? Number.parseInt(hours, 10) : 0) * 60 +
    (minutes ? Number.parseInt(minutes, 10) : 0)
  );
}

function formatFlightNumber(segment: DuffelSegment): string {
  const carrier =
    segment.marketing_carrier?.iata_code ??
    segment.operating_carrier?.iata_code ??
    "";
  const number = segment.flight_number ?? "";
  return `${carrier}${number}`.trim() || "Flight";
}

function formatCabinClass(value: string | undefined): string {
  switch (value) {
    case "premium_economy":
      return "Premium Economy";
    case "business":
      return "Business";
    case "first":
      return "First";
    default:
      return "Economy";
  }
}
