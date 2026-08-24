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
  europeLandingDefaultFrom,
  europeLandingDefaultTo,
} from "@/constants/destinationLandingContent";
import {
  type FlightSearchCabinClass,
  getCabinClassLabel,
} from "@/constants/flightSearchCabinClasses";
import type { FlightSearchPlace } from "@/constants/flightSearchPlaces";
import {
  type FlightSearchTripType,
  flightSearchTripTypes,
  getTripTypeLabel,
  isMultiCity,
  isRoundTrip,
} from "@/constants/flightSearchTripTypes";
import { findDestinationPlaceByIata } from "@/constants/homeContent";
import { LandingResultsModal } from "@/features/destination-landing/landing-results-modal";
import { searchFlightsAction } from "@/server/actions/search-flights";
import type {
  FlightOfferSummary,
  FlightSearchContext,
} from "@/types/flights/search-response";
import { cn } from "@/utils/cn";
import { defaultFlightSearchDates } from "@/utils/default-flight-search-dates";

const defaultDates = defaultFlightSearchDates();

export function LandingSearchPanel() {
  const [tripType, setTripType] = useState<FlightSearchTripType>("round_trip");
  const [from, setFrom] = useState<FlightSearchPlace>(europeLandingDefaultFrom);
  const [to, setTo] = useState<FlightSearchPlace>(europeLandingDefaultTo);
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
  const [appliedDestination, setAppliedDestination] = useState<string | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const destinationCode = searchParams.get("to");

  if (destinationCode !== appliedDestination) {
    setAppliedDestination(destinationCode);
    if (destinationCode) {
      const place = findDestinationPlaceByIata(destinationCode);
      if (place) {
        setTo(place);
        setFrom((current) =>
          current.iata === place.iata ? europeLandingDefaultTo : current,
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
      <div className="destination-search-panel overflow-visible p-3 sm:p-5">
        <TripTypeTabs value={tripType} onChange={setTripType} />

        {isMultiCity(tripType) ? (
          <MultiCityPanel />
        ) : (
          <div className="flex flex-col">
            <div className="grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
              <AirportSearchField
                label="From"
                value={from}
                excludeIata={to.iata}
                onSelect={setFrom}
                className="min-w-0 w-full"
              />
              <div className="flex items-center justify-center py-1 md:px-1 md:py-0">
                <button
                  type="button"
                  onClick={swapLocations}
                  aria-label="Swap origin and destination"
                  className="flex size-10 shrink-0 rotate-90 items-center justify-center rounded-full border border-border bg-white text-primary-text transition-colors hover:border-aviation-blue/60 md:rotate-0"
                >
                  <SwapIcon />
                </button>
              </div>
              <AirportSearchField
                label="To"
                value={to}
                excludeIata={from.iata}
                onSelect={setTo}
                className="min-w-0 w-full"
              />
            </div>

            <div
              className={cn(
                "grid border-t border-border",
                isRoundTrip(tripType)
                  ? "grid-cols-2 divide-x divide-border"
                  : "grid-cols-1",
              )}
            >
              <DateSearchField
                label="Departure"
                value={departDate}
                min={todayIsoDate()}
                onChange={(isoDate) => {
                  setDepartDate(isoDate);
                  if (returnDate < isoDate) {
                    setReturnDate(isoDate);
                  }
                }}
                className="min-w-0 w-full"
              />
              {isRoundTrip(tripType) ? (
                <DateSearchField
                  label="Return"
                  value={returnDate}
                  min={departDate}
                  onChange={setReturnDate}
                  className="min-w-0 w-full"
                />
              ) : null}
            </div>

            <div className="grid grid-cols-2 divide-x divide-border border-t border-border">
              <CabinClassSearchField
                value={cabinClass}
                onChange={setCabinClass}
                className="min-w-0 w-full"
              />
              <TravelerSearchField
                adults={adults}
                onChange={setAdults}
                className="min-w-0 w-full"
              />
            </div>

            <div className="border-t border-border p-3">
              <button
                type="button"
                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[12px] bg-aviation-blue px-7 text-[15px] font-bold text-on-accent transition duration-200 hover:-translate-y-0.5 hover:bg-medium-blue disabled:translate-y-0"
                onClick={runSearch}
                disabled={isPending}
              >
                {isPending ? "Searching..." : "Search flights →"}
              </button>
            </div>
          </div>
        )}
      </div>

      <LandingResultsModal
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
  return (
    <div className="mb-4" role="tablist" aria-label="Trip type">
      <div className="flex flex-wrap gap-1">
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
                "min-h-11 rounded-[12px] px-4 text-sm font-semibold transition-colors",
                selected
                  ? "bg-aviation-blue text-on-accent"
                  : "bg-transparent text-secondary-text hover:text-primary-text",
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
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-aviation-blue/80">
            Multi-city travel
          </p>
          <p className="text-base font-semibold text-primary-text sm:text-lg">
            Complex itineraries are handled by our travel specialists
          </p>
          <p className="text-sm leading-relaxed text-secondary-text">
            You search, we ticket by phone. For three or more cities, stopovers,
            or open-jaw routes, call our desk — 24/7 — and a specialist will
            build and ticket the itinerary.
          </p>
        </div>
        <CallPhoneButton
          size="lg"
          className="shrink-0 rounded-[12px] bg-aviation-blue text-on-accent hover:bg-medium-blue"
        />
    </div>
  );
}

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
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
