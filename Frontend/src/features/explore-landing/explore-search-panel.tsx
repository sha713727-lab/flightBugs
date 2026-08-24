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
  exploreDefaultFrom,
  exploreDefaultTo,
  exploreLandingCopy,
} from "@/constants/exploreLandingContent";
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
import { ExploreResultsModal } from "@/features/explore-landing/explore-results-modal";
import { searchFlightsAction } from "@/server/actions/search-flights";
import type {
  FlightOfferSummary,
  FlightSearchContext,
} from "@/types/flights/search-response";
import { cn } from "@/utils/cn";
import { defaultFlightSearchDates } from "@/utils/default-flight-search-dates";

const defaultDates = defaultFlightSearchDates();

export function ExploreSearchPanel() {
  const [tripType, setTripType] = useState<FlightSearchTripType>("round_trip");
  const [from, setFrom] = useState<FlightSearchPlace>(exploreDefaultFrom);
  const [to, setTo] = useState<FlightSearchPlace>(exploreDefaultTo);
  const [departDate, setDepartDate] = useState(defaultDates.departDate);
  const [returnDate, setReturnDate] = useState(defaultDates.returnDate);
  const [adults, setAdults] = useState(1);
  const [cabinClass, setCabinClass] =
    useState<FlightSearchCabinClass>("economy");
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
          current.iata === place.iata ? exploreDefaultTo : current,
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
          tripType: includesReturn
            ? ("round_trip" as const)
            : ("one_way" as const),
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
          "We could not search flights right now. Please call our desk for help.",
        );
      }
    });
  }, [adults, cabinClass, departDate, from, returnDate, to, tripType]);

  return (
    <>
      <div className="explore-search-panel overflow-visible p-3 sm:p-5">
        <div className="mb-4" role="tablist" aria-label="Trip type">
          <div className="flex flex-wrap gap-1">
            {flightSearchTripTypes.map((option) => {
              const selected = tripType === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setTripType(option.value)}
                  className={cn(
                    "min-h-11 rounded-[12px] px-4 text-sm font-semibold transition-colors",
                    selected
                      ? "bg-[var(--explore-primary)] text-white"
                      : "bg-transparent text-[var(--explore-text-muted)] hover:text-[var(--explore-text)]",
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {isMultiCity(tripType) ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="text-base font-semibold text-[var(--explore-text)] sm:text-lg">
                Complex itineraries are handled by specialists
              </p>
              <p className="text-sm leading-relaxed text-[var(--explore-text-muted)]">
                For three or more cities, call our desk — 24/7 — and a specialist
                will build and ticket the itinerary.
              </p>
            </div>
            <CallPhoneButton
              size="lg"
              className="shrink-0 rounded-[12px] bg-[var(--explore-primary)] text-white hover:bg-[var(--explore-primary-hover)]"
            />
          </div>
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
                  className="flex size-10 shrink-0 rotate-90 items-center justify-center rounded-full border border-[var(--explore-border)] bg-white text-[var(--explore-text)] transition-colors hover:border-[var(--explore-primary)] md:rotate-0"
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
                "grid border-t border-[var(--explore-border)]",
                isRoundTrip(tripType)
                  ? "grid-cols-2 divide-x divide-[var(--explore-border)]"
                  : "grid-cols-1",
              )}
            >
              <DateSearchField
                label="Departure"
                value={departDate}
                min={new Date().toISOString().slice(0, 10)}
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

            <div className="grid grid-cols-2 divide-x divide-[var(--explore-border)] border-t border-[var(--explore-border)]">
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

            <div className="border-t border-[var(--explore-border)] p-3">
              <button
                type="button"
                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[12px] bg-[var(--explore-primary)] px-7 text-[15px] font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--explore-primary-hover)] disabled:translate-y-0"
                onClick={runSearch}
                disabled={isPending}
              >
                {isPending ? "Searching..." : exploreLandingCopy.searchCta}
              </button>
            </div>
          </div>
        )}
      </div>

      <ExploreResultsModal
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
