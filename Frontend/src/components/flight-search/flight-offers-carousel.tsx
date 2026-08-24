"use client";

import { useEffect, useRef, useState } from "react";

import { FlightOfferRow } from "@/components/flight-search/flight-offer-row";
import type {
  FlightOfferSummary,
  FlightSearchContext,
} from "@/types/flights/search-response";
import { cn } from "@/utils/cn";

type FlightOffersCarouselProps = {
  readonly open: boolean;
  readonly offers: ReadonlyArray<FlightOfferSummary>;
  readonly searchContext: FlightSearchContext;
};

export function FlightOffersCarousel({
  open,
  offers,
  searchContext,
}: FlightOffersCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const offersSignature = offers.map((offer) => offer.id).join(":");
  const [trackedSignature, setTrackedSignature] = useState(offersSignature);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndex = offers.length - 1;
  const canGoPrevious = activeIndex > 0;
  const canGoNext = activeIndex < lastIndex;

  if (trackedSignature !== offersSignature) {
    setTrackedSignature(offersSignature);
    setActiveIndex(0);
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    scrollerRef.current?.scrollTo({ left: 0 });
  }, [open, offersSignature]);

  const goTo = (index: number) => {
    const nextIndex = Math.max(0, Math.min(lastIndex, index));
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    scroller.scrollTo({
      left: scroller.clientWidth * nextIndex,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    setActiveIndex(nextIndex);
  };

  return (
    <>
      <div
        ref={scrollerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Flight options"
        tabIndex={0}
        onScroll={(event) => {
          const scroller = event.currentTarget;
          if (scroller.clientWidth === 0) {
            return;
          }

          const nextIndex = Math.round(
            scroller.scrollLeft / scroller.clientWidth,
          );
          setActiveIndex(Math.max(0, Math.min(lastIndex, nextIndex)));
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            goTo(activeIndex + 1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            goTo(activeIndex - 1);
          }
        }}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] xl:hidden [&::-webkit-scrollbar]:hidden"
      >
        {offers.map((offer, index) => (
          <div
            key={offer.id}
            className="w-full shrink-0 snap-center"
            aria-hidden={index !== activeIndex}
            aria-label={`Option ${index + 1} of ${offers.length}`}
          >
            <FlightOfferRow
              offer={offer}
              context={searchContext}
              optionNumber={index + 1}
            />
          </div>
        ))}
      </div>

      {offers.length > 1 ? (
        <div className="flex items-center justify-center gap-4 pb-4 xl:hidden">
          <PagerButton
            label="Previous flight option"
            disabled={!canGoPrevious}
            onClick={() => {
              goTo(activeIndex - 1);
            }}
            direction="previous"
          />
          <p
            aria-live="polite"
            className="min-w-[4.5rem] text-center text-xs font-medium text-secondary-text"
          >
            {activeIndex + 1} of {offers.length}
          </p>
          <PagerButton
            label="Next flight option"
            disabled={!canGoNext}
            onClick={() => {
              goTo(activeIndex + 1);
            }}
            direction="next"
          />
        </div>
      ) : null}

      <section className="hidden divide-y divide-border/70 xl:block">
        {offers.map((offer, index) => (
          <FlightOfferRow
            key={offer.id}
            offer={offer}
            context={searchContext}
            optionNumber={index + 1}
          />
        ))}
      </section>
    </>
  );
}

function PagerButton({
  label,
  disabled,
  onClick,
  direction,
}: {
  readonly label: string;
  readonly disabled: boolean;
  readonly onClick: () => void;
  readonly direction: "previous" | "next";
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex size-10 items-center justify-center rounded-full border border-border text-primary-text transition-colors hover:border-aviation-blue/50",
        disabled && "cursor-not-allowed opacity-35",
      )}
    >
      <PagerIcon direction={direction} />
    </button>
  );
}

function PagerIcon({ direction }: { readonly direction: "previous" | "next" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d={direction === "previous" ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
