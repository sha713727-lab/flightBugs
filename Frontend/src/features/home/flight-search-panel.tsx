"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

import { CallPhoneButton } from "@/components/call-phone-button";
import {
  AirportSearchField,
  CabinClassSearchField,
  DateSearchField,
  TravelerSearchField,
} from "@/components/flight-search/flight-search-fields";
import {
  type FlightSearchCabinClass,
  getCabinClassLabel,
} from "@/constants/flightSearchCabinClasses";
import {
  defaultFromPlace,
  defaultToPlace,
  type FlightSearchPlace,
} from "@/constants/flightSearchPlaces";
import {
  type FlightSearchTripType,
  flightSearchTripTypes,
  getTripTypeLabel,
  isMultiCity,
  isRoundTrip,
} from "@/constants/flightSearchTripTypes";
import { findDestinationPlaceByIata } from "@/constants/homeContent";
import { FlightSearchResultsModal } from "@/features/home/flight-search-results-modal";
import { searchFlightsAction } from "@/server/actions/search-flights";
import type {
  FlightOfferSummary,
  FlightSearchContext,
} from "@/types/flights/search-response";
import { cn } from "@/utils/cn";
import { defaultFlightSearchDates } from "@/utils/default-flight-search-dates";

const defaultFrom = defaultFromPlace;
const defaultTo = defaultToPlace;
const defaultDates = defaultFlightSearchDates();

export function FlightSearchPanel() {
  const [tripType, setTripType] = useState<FlightSearchTripType>("round_trip");
  const [from, setFrom] = useState<FlightSearchPlace>(defaultFrom);
  const [to, setTo] = useState<FlightSearchPlace>(defaultTo);
  const [departDate, setDepartDate] = useState(defaultDates.departDate);
  const [returnDate, setReturnDate] = useState(defaultDates.returnDate);
  const [adults, setAdults] = useState(1);
  const [cabinClass, setCabinClass] = useState<FlightSearchCabinClass>("economy");
  const [searchContext, setSearchContext] = useState<FlightSearchContext | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [offers, setOffers] = useState<ReadonlyArray<FlightOfferSummary>>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const destinationCode = searchParams.get("to");
  const [appliedDestination, setAppliedDestination] = useState<string | null>(
    null,
  );

  if (destinationCode !== appliedDestination) {
    setAppliedDestination(destinationCode);
    if (destinationCode) {
      const place = findDestinationPlaceByIata(destinationCode);
      if (place) {
        setTo(place);
        setFrom((current) =>
          current.iata === place.iata ? defaultToPlace : current,
        );
      }
    }
  }

  const swapLocations = useCallback(() => {
    setFrom(to);
    setTo(from);
  }, [from, to]);

  const runSearch = useCallback(() => {
    if (from.iata === to.iata) {
      setModalOpen(true);
      setSearchError("Origin and destination must be different.");
      setOffers([]);
      return;
    }

    const includesReturn = isRoundTrip(tripType);
    const contextReturnDate = includesReturn ? returnDate : null;

    setModalOpen(true);
    setSearchError(null);
    setOffers([]);
    setSearchContext({
      originCity: from.city,
      originCode: from.iata,
      destinationCity: to.city,
      destinationCode: to.iata,
      departDate,
      returnDate: contextReturnDate,
      adults,
      cabinClassLabel: getCabinClassLabel(cabinClass),
      tripType: getTripTypeLabel(tripType),
    });

    startTransition(async () => {
      try {
        const payload = {
          origin: from.iata,
          destination: to.iata,
          departDate,
          adults,
          cabinClass,
          tripType: includesReturn ? ("round_trip" as const) : ("one_way" as const),
          ...(includesReturn ? { returnDate } : {}),
        };

        const result = await searchFlightsAction(payload);

        if (!result.ok) {
          setSearchError(result.message);
          return;
        }

        setOffers(result.data.offers);
      } catch {
        setSearchError(
          "We could not search flights right now. Please call our agent for help.",
        );
      }
    });
  }, [adults, cabinClass, departDate, from, returnDate, to, tripType]);

  return (
    <>
      <TripTypeTabs value={tripType} onChange={setTripType} />

      {isMultiCity(tripType) ? (
        <MultiCityPanel />
      ) : (
        <div className="flight-search-panel overflow-visible">
          <div className="flex flex-col xl:flex-row xl:items-stretch">
            <div className="relative flex flex-col divide-y divide-border xl:min-w-0 xl:flex-1 xl:flex-row xl:divide-y-0">
              <AirportSearchField
                label="From"
                value={from}
                excludeIata={to.iata}
                onSelect={setFrom}
                className="min-w-0 w-full pb-4 xl:flex-1 xl:pb-0"
              />
              <FieldSeparator />
              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 xl:static xl:flex xl:translate-x-0 xl:translate-y-0 xl:items-center xl:px-2">
                <button
                  type="button"
                  onClick={swapLocations}
                  aria-label="Swap origin and destination"
                  className="flex size-9 shrink-0 rotate-90 items-center justify-center rounded-full border border-aviation-blue/35 bg-dark-navy text-aviation-blue transition-colors hover:border-aviation-blue/60 hover:bg-aviation-blue/10 xl:size-10 xl:rotate-0"
                >
                  <SwapIcon />
                </button>
              </div>
              <FieldSeparator />
              <AirportSearchField
                label="To"
                value={to}
                excludeIata={from.iata}
                onSelect={setTo}
                className="min-w-0 w-full pt-4 xl:flex-1 xl:pt-0"
              />
            </div>

            <div
              className={cn(
                "grid border-t border-border xl:contents xl:border-t-0",
                isRoundTrip(tripType)
                  ? "grid-cols-2 divide-x divide-border"
                  : "grid-cols-1",
              )}
            >
              <FieldSeparator />
              <DateSearchField
                label="Depart"
                value={departDate}
                min={todayIsoDate()}
                onChange={(isoDate) => {
                  setDepartDate(isoDate);
                  if (returnDate < isoDate) {
                    setReturnDate(isoDate);
                  }
                }}
                className="min-w-0 w-full xl:flex-1"
              />
              {isRoundTrip(tripType) ? (
                <>
                  <FieldSeparator />
                  <DateSearchField
                    label="Return"
                    value={returnDate}
                    min={departDate}
                    onChange={setReturnDate}
                    className="min-w-0 w-full xl:flex-1"
                  />
                </>
              ) : null}
            </div>

            <div className="grid grid-cols-2 divide-x divide-border border-t border-border xl:contents xl:border-t-0">
              <FieldSeparator />
              <CabinClassSearchField
                value={cabinClass}
                onChange={setCabinClass}
                className="min-w-0 w-full xl:flex-1"
              />
              <FieldSeparator />
              <TravelerSearchField
                adults={adults}
                onChange={setAdults}
                className="min-w-0 w-full xl:flex-1"
              />
            </div>

            <div className="p-3 xl:flex xl:items-center xl:border-t-0 xl:p-3">
              <button
                type="button"
                className="flight-search-submit w-full font-bold xl:w-auto xl:font-semibold"
                onClick={runSearch}
                disabled={isPending}
              >
                {isPending ? "Searching..." : (
                  <>
                    <span className="xl:hidden">Search Flights</span>
                    <span className="hidden xl:inline">Search</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <FlightSearchResultsModal
        open={modalOpen}
        loading={isPending}
        error={searchError}
        offers={offers}
        searchContext={searchContext}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

function TripTypeTabs({
  value,
  onChange,
}: {
  readonly value: FlightSearchTripType;
  readonly onChange: (value: FlightSearchTripType) => void;
}) {
  const compactTypes = flightSearchTripTypes.filter(
    (option) => option.value !== "multi_city",
  );

  return (
    <div className="pointer-events-auto mb-4 xl:mb-3">
      <div
        className="grid grid-cols-2 gap-2 xl:hidden"
        role="tablist"
        aria-label="Trip type"
      >
        {compactTypes.map((option) => {
          const selected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onChange(option.value)}
              className={cn(
                "h-[42px] rounded-full border text-sm font-semibold transition-colors",
                selected
                  ? "border-aviation-blue bg-aviation-blue text-dark-navy"
                  : "border-white/15 bg-transparent text-white/70 hover:border-aviation-blue/40 hover:text-primary-text",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className={cn(
          "mt-2 w-full text-center text-sm xl:hidden",
          value === "multi_city"
            ? "font-semibold text-aviation-blue"
            : "text-white/60 hover:text-primary-text",
        )}
        onClick={() => {
          onChange("multi_city");
        }}
      >
        Multi-city →
      </button>

      <div
        className="hidden flex-wrap gap-2 xl:flex"
        role="tablist"
        aria-label="Trip type"
      >
        {flightSearchTripTypes.map((option) => {
          const selected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onChange(option.value)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                selected
                  ? "border-aviation-blue bg-aviation-blue text-on-accent"
                  : "border-border bg-[rgba(10,10,10,0.88)] text-secondary-text hover:border-aviation-blue/40 hover:text-primary-text",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MultiCityPanel() {
  return (
    <div className="flight-search-panel px-5 py-5 sm:px-6 sm:py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-aviation-blue/75">
            Multi-city travel
          </p>
          <p className="text-base font-semibold text-primary-text sm:text-lg">
            Complex itineraries are handled by our travel specialists
          </p>
          <p className="text-sm leading-relaxed text-secondary-text">
            You search, we ticket by phone. For three or more cities, stopovers,
            or open-jaw routes, call our award-winning desk — 24/7 — and a
            specialist will build and ticket the itinerary.
          </p>
        </div>
        <CallPhoneButton
          size="lg"
          className="shrink-0 bg-aviation-blue text-on-accent hover:bg-medium-blue"
        />
      </div>
    </div>
  );
}

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function FieldSeparator() {
  return (
    <div className="flight-search-field-separator my-4 hidden xl:block" aria-hidden="true" />
  );
}

function SwapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M12.5 3.5h-8M12.5 3.5 10 1M12.5 3.5 10 6M5.5 14.5h8M5.5 14.5 8 12M5.5 14.5 8 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
