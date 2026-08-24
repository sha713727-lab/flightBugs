"use client";

import { useEffect, useRef } from "react";

import { CallPhoneButton } from "@/components/call-phone-button";
import { FlightOffersCarousel } from "@/components/flight-search/flight-offers-carousel";
import { exploreLandingCopy } from "@/constants/exploreLandingContent";
import type {
  FlightOfferSummary,
  FlightSearchContext,
} from "@/types/flights/search-response";

type ExploreResultsModalProps = {
  readonly open: boolean;
  readonly loading: boolean;
  readonly error: string | null;
  readonly offers: ReadonlyArray<FlightOfferSummary>;
  readonly searchContext: FlightSearchContext | null;
  readonly onClose: () => void;
};

export function ExploreResultsModal({
  open,
  loading,
  error,
  offers,
  searchContext,
  onClose,
}: ExploreResultsModalProps) {
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
      className="explore-results-dialog"
    >
      <div className="flex max-h-[min(88vh,860px)] flex-col">
        <header className="border-b border-[var(--explore-border)] px-6 py-5 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--explore-primary)]">
                  Live offers
                </p>
                {searchContext ? (
                  <h2 className="mt-1 text-2xl font-bold tracking-[-0.02em] text-[var(--explore-text)]">
                    {searchContext.originCity}{" "}
                    <span className="text-[var(--explore-primary)]">→</span>{" "}
                    {searchContext.destinationCity}
                  </h2>
                ) : (
                  <h2 className="mt-1 text-2xl font-bold text-[var(--explore-text)]">
                    Flight options
                  </h2>
                )}
              </div>
              {searchContext ? (
                <p className="text-sm text-[var(--explore-text-muted)]">
                  {searchContext.departDate}
                  {searchContext.returnDate
                    ? ` – ${searchContext.returnDate}`
                    : ""}{" "}
                  · {searchContext.adults}{" "}
                  {searchContext.adults === 1 ? "adult" : "adults"} ·{" "}
                  {searchContext.cabinClassLabel}
                  {!loading && !error
                    ? ` · ${offers.length} option${offers.length === 1 ? "" : "s"}`
                    : ""}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search results"
              className="flex size-10 shrink-0 items-center justify-center rounded-[12px] border border-[var(--explore-border)] text-[var(--explore-text-muted)] transition-colors hover:border-[var(--explore-primary)] hover:text-[var(--explore-text)]"
            >
              ✕
            </button>
          </div>
        </header>

        <div className="overflow-y-auto px-6 sm:px-8">
          {loading ? (
            <div className="space-y-4 py-8">
              <p className="text-sm font-medium text-[var(--explore-text)]">
                Searching travel sites…
              </p>
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="explore-skeleton h-28 rounded-[16px]"
                />
              ))}
            </div>
          ) : null}

          {!loading && error ? (
            <div className="py-10 text-center">
              <p className="text-[15px] text-[var(--explore-text)]">{error}</p>
              <div className="mt-6 flex justify-center">
                <CallPhoneButton
                  size="lg"
                  className="rounded-[12px] bg-[var(--explore-primary)] text-white hover:bg-[var(--explore-primary-hover)]"
                />
              </div>
            </div>
          ) : null}

          {!loading && !error && offers.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-[15px] text-[var(--explore-text)]">
                No flights found. Try different dates or call our desk.
              </p>
              <div className="mt-6 flex justify-center">
                <CallPhoneButton
                  size="lg"
                  className="rounded-[12px] bg-[var(--explore-primary)] text-white hover:bg-[var(--explore-primary-hover)]"
                />
              </div>
            </div>
          ) : null}

          {!loading && !error && offers.length > 0 && searchContext ? (
            <div className="py-6">
              <FlightOffersCarousel
                open={open}
                offers={offers}
                searchContext={searchContext}
              />
            </div>
          ) : null}
        </div>

        <footer className="border-t border-[var(--explore-border)] px-6 py-4 sm:px-8">
          <p className="mb-3 text-center text-sm text-[var(--explore-text-muted)]">
            {exploreLandingCopy.spine}
          </p>
          <CallPhoneButton
            size="lg"
            className="w-full rounded-[12px] bg-[var(--explore-primary)] text-white hover:bg-[var(--explore-primary-hover)]"
          />
        </footer>
      </div>
    </dialog>
  );
}
