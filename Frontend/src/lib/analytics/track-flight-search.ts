import { pushMarketingEvent } from "@/lib/analytics/push-marketing-event";

type FlightSearchTrackInput = {
  readonly origin: string;
  readonly destination: string;
  readonly tripType: string;
  readonly cabinClass: string;
  readonly adults: number;
  readonly pagePath?: string;
};

export function trackFlightSearch(input: FlightSearchTrackInput): void {
  pushMarketingEvent({
    event: "flight_search",
    search_origin: input.origin,
    search_destination: input.destination,
    trip_type: input.tripType,
    cabin_class: input.cabinClass,
    adults: input.adults,
    page_path:
      input.pagePath ??
      (typeof window !== "undefined" ? window.location.pathname : undefined),
  });
}
