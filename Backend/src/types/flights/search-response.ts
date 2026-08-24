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
