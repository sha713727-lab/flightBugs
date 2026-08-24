export const flightSearchCabinClasses = [
  { value: "economy", label: "Economy" },
  { value: "premium_economy", label: "Premium Economy" },
  { value: "business", label: "Business" },
  { value: "first", label: "First" },
] as const;

export type FlightSearchCabinClass =
  (typeof flightSearchCabinClasses)[number]["value"];

export function getCabinClassLabel(value: FlightSearchCabinClass): string {
  const match = flightSearchCabinClasses.find((item) => item.value === value);
  return match?.label ?? "Economy";
}
