import type { FlightSearchCabinClass } from "@/constants/flightSearchCabinClasses";

export type FlightLegSummary = {
  readonly departureAt: string;
  readonly arrivalAt: string;
  readonly originCode: string;
  readonly originCity: string;
  readonly destinationCode: string;
  readonly destinationCity: string;
  readonly durationMinutes: number;
  readonly stops: number;
  readonly flightNumbers: ReadonlyArray<string>;
};

export type FlightOfferSummary = {
  readonly id: string;
  readonly airlineName: string;
  readonly cabinClass: string;
  readonly outbound: FlightLegSummary;
  readonly return: FlightLegSummary | null;
};

export type FlightSearchResponse = {
  readonly offerRequestId: string;
  readonly offers: ReadonlyArray<FlightOfferSummary>;
};

export type FlightSearchContext = {
  readonly originCity: string;
  readonly originCode: string;
  readonly destinationCity: string;
  readonly destinationCode: string;
  readonly departDate: string;
  readonly returnDate: string | null;
  readonly adults: number;
  readonly cabinClassLabel: string;
  readonly tripType: string;
};

export type FlightSearchInput = {
  readonly origin: string;
  readonly destination: string;
  readonly departDate: string;
  readonly returnDate?: string;
  readonly adults: number;
  readonly cabinClass: FlightSearchCabinClass;
  readonly tripType: "one_way" | "round_trip";
};

export type FlightSearchActionResult =
  | { readonly ok: true; readonly data: FlightSearchResponse }
  | { readonly ok: false; readonly message: string };

export type { FlightSearchCabinClass };
