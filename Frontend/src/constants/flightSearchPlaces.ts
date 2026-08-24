export type FlightSearchPlace = {
  readonly id: string;
  readonly city: string;
  readonly iata: string;
  readonly name: string;
  readonly countryCode: string;
  readonly kind: "airport" | "city";
};

export const defaultFromPlace: FlightSearchPlace = {
  id: "arp_yul_ca",
  city: "Montreal",
  iata: "YUL",
  name: "Montreal-Trudeau International Airport",
  countryCode: "CA",
  kind: "airport",
};

export const defaultToPlace: FlightSearchPlace = {
  id: "arp_lhr_gb",
  city: "London",
  iata: "LHR",
  name: "Heathrow",
  countryCode: "GB",
  kind: "airport",
};

export function formatPlaceLabel(place: FlightSearchPlace): string {
  return `${place.city} (${place.iata})`;
}

export function formatPlaceOptionPrimary(place: FlightSearchPlace): string {
  if (place.kind === "city") {
    return `${place.city} — All airports`;
  }

  return place.city;
}

export function formatPlaceOptionSecondary(place: FlightSearchPlace): string {
  if (place.kind === "city") {
    return place.iata;
  }

  return `${place.name} · ${place.iata}`;
}

export function buildSuggestPlacesPath(query: string): string {
  return `/flights/places/suggestions?query=${encodeURIComponent(query)}`;
}
