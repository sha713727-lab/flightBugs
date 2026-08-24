export type FlightPlaceSuggestion = {
  readonly id: string;
  readonly iata: string;
  readonly city: string;
  readonly name: string;
  readonly countryCode: string;
  readonly kind: "airport" | "city";
};

export type FlightPlaceSuggestionsResponse = {
  readonly places: ReadonlyArray<FlightPlaceSuggestion>;
};
