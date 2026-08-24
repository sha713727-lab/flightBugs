export const flightSearchTripTypes = [
  { value: "round_trip", label: "Round trip" },
  { value: "one_way", label: "One way" },
  { value: "multi_city", label: "Multi-city" },
] as const;

export type FlightSearchTripType =
  (typeof flightSearchTripTypes)[number]["value"];

export function getTripTypeLabel(value: FlightSearchTripType): string {
  const match = flightSearchTripTypes.find((item) => item.value === value);
  return match?.label ?? "Round trip";
}

export function isRoundTrip(value: FlightSearchTripType): boolean {
  return value === "round_trip";
}

export function isMultiCity(value: FlightSearchTripType): boolean {
  return value === "multi_city";
}
