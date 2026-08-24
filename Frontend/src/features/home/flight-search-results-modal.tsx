"use client";

import { useEffect, useRef } from "react";

import { CallPhoneButton } from "@/components/call-phone-button";
import { FlightOffersCarousel } from "@/components/flight-search/flight-offers-carousel";
import { siteBrand } from "@/constants/siteBrand";
import type {
  FlightOfferSummary,
  FlightSearchContext,
} from "@/types/flights/search-response";

type FlightSearchResultsModalProps = {
  readonly open: boolean;
  readonly loading: boolean;
  readonly error: string | null;
  readonly offers: ReadonlyArray<FlightOfferSummary>;
  readonly searchContext: FlightSearchContext | null;
  readonly onClose: () => void;
};

export function FlightSearchResultsModal({
  open,
  loading,
  error,
  offers,
  searchContext,
  onClose,
}: FlightSearchResultsModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
      return;
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
      className="flight-results-dialog"
    >
      <div className="flex max-h-[min(88vh,860px)] flex-col">
        <header className="border-b border-border/70 px-6 py-5 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-aviation-blue">
                  {siteBrand.flightDesk}
                </p>
                {searchContext ? (
                  <h2 className="mt-1 text-2xl font-bold tracking-[-0.02em] text-primary-text">
                    {searchContext.originCity}{" "}
                    <span className="text-aviation-blue">→</span>{" "}
                    {searchContext.destinationCity}
                  </h2>
                ) : (
                  <h2 className="mt-1 text-2xl font-bold text-primary-text">
                    Flight options
                  </h2>
                )}
              </div>

              {searchContext ? (
                <SearchSummaryLine
                  context={searchContext}
                  offerCount={offers.length}
                />
              ) : null}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close search results"
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-secondary-text transition-colors hover:border-aviation-blue/50 hover:text-primary-text"
            >
              <CloseIcon />
            </button>
          </div>
        </header>

        <div className="overflow-y-auto px-6 sm:px-8 xl:overflow-y-auto">
          {loading ? (
            <div className="space-y-0 divide-y divide-border/70">
              <div className="py-6 xl:hidden">
                <div className="h-40 animate-pulse rounded-[12px] bg-soft-section/60" />
              </div>
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="hidden py-6 xl:block">
                  <div className="h-32 animate-pulse rounded-[12px] bg-soft-section/60" />
                </div>
              ))}
            </div>
          ) : null}

          {!loading && error ? (
            <div className="py-6 text-sm text-secondary-text">{error}</div>
          ) : null}

          {!loading && !error && offers.length === 0 ? (
            <div className="py-6 text-sm text-secondary-text">
              No flights matched your search. Adjust dates or cabin class, or
              call our travel desk for manual options.
            </div>
          ) : null}

          {!loading && !error && offers.length > 0 && searchContext ? (
            <FlightOffersCarousel
              open={open}
              offers={offers}
              searchContext={searchContext}
            />
          ) : null}
        </div>

        <footer className="border-t border-border/70 px-6 py-5 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-primary-text">
                You search, we ticket by phone.
              </p>
              <p className="text-sm text-secondary-text">
                {searchContext
                  ? `${searchContext.adults === 1 ? "1 adult" : `${searchContext.adults} adults`} · ${searchContext.cabinClassLabel} · ${searchContext.tripType} · Award-winning service · 24/7`
                  : "Award-winning service · 24/7. A specialist verifies live fares before ticketing."}
              </p>
            </div>
            <CallPhoneButton
              size="sm"
              className="shrink-0 bg-aviation-blue text-on-accent hover:bg-medium-blue"
            />
          </div>
        </footer>
      </div>
    </dialog>
  );
}

function SearchSummaryLine({
  context,
  offerCount,
}: {
  readonly context: FlightSearchContext;
  readonly offerCount: number;
}) {
  const dateRange = context.returnDate
    ? `${formatSummaryDate(context.departDate)} – ${formatSummaryDate(context.returnDate)}`
    : formatSummaryDate(context.departDate);

  const parts = [
    `${context.originCode} → ${context.destinationCode}`,
    dateRange,
    context.adults === 1 ? "1 Adult" : `${context.adults} Adults`,
    context.cabinClassLabel,
    context.tripType,
    offerCount > 0
      ? `${offerCount} ${offerCount === 1 ? "option" : "options"}`
      : null,
  ].filter((part): part is string => part !== null);

  return (
    <p className="text-sm leading-relaxed text-secondary-text">
      {parts.map((part, index) => (
        <span key={part}>
          {index > 0 ? (
            <span className="px-2 text-border" aria-hidden="true">
              |
            </span>
          ) : null}
          <span className="font-medium text-primary-text">{part}</span>
        </span>
      ))}
    </p>
  );
}

function formatSummaryDate(isoDate: string): string {
  const parsed = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return isoDate;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
