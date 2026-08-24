"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type ReactNode,
  type TouchEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { destinationImages } from "@/constants/brandAssets";
import { destinations } from "@/constants/homeContent";
import { DEFAULT_LOCALE } from "@/constants/locales";
import { cn } from "@/utils/cn";

const swipeThresholdPx = 40;

function useVisibleCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const sm = window.matchMedia("(min-width: 640px)");
    const lg = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      if (lg.matches) {
        setCount(4);
        return;
      }
      if (sm.matches) {
        setCount(2);
        return;
      }
      setCount(1);
    };

    update();
    sm.addEventListener("change", update);
    lg.addEventListener("change", update);
    return () => {
      sm.removeEventListener("change", update);
      lg.removeEventListener("change", update);
    };
  }, []);

  return count;
}

export function PopularDestinationsSlider() {
  const labelId = useId();
  const visibleCount = useVisibleCount();
  const pageCount = Math.max(1, Math.ceil(destinations.length / visibleCount));
  const [page, setPage] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const safePage = Math.min(page, pageCount - 1);

  const goTo = useCallback(
    (next: number) => {
      setPage(((next % pageCount) + pageCount) % pageCount);
    },
    [pageCount],
  );

  const goPrev = useCallback(() => {
    goTo(safePage - 1);
  }, [goTo, safePage]);

  const goNext = useCallback(() => {
    goTo(safePage + 1);
  }, [goTo, safePage]);

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartX.current;
    const end = event.changedTouches[0]?.clientX;
    touchStartX.current = null;

    if (start === null || end === undefined) {
      return;
    }

    const delta = end - start;
    if (delta > swipeThresholdPx) {
      goPrev();
      return;
    }
    if (delta < -swipeThresholdPx) {
      goNext();
    }
  };

  return (
    <div
      className="mt-10"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goPrev();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goNext();
        }
      }}
    >
      <p id={labelId} className="sr-only">
        Popular destinations, {visibleCount} at a time
      </p>

      <div className="relative">
        <div
          className="overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${String(safePage * 100)}%)` }}
          >
            {Array.from({ length: pageCount }, (_, pageIndex) => {
              const start = pageIndex * visibleCount;
              const slice = destinations.slice(start, start + visibleCount);

              return (
                <div
                  key={`page-${String(pageIndex)}`}
                  className="grid w-full min-w-full shrink-0 gap-4 px-0.5 sm:gap-5"
                  style={{
                    gridTemplateColumns: `repeat(${String(slice.length)}, minmax(0, 1fr))`,
                  }}
                >
                  {slice.map((item) => (
                    <DestinationCard
                      key={item.id}
                      item={item}
                      sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1023px) calc(50vw - 2rem), calc(25vw - 1.5rem)"
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <SliderButton label="Previous destinations" onClick={goPrev}>
          <Chevron direction="left" />
        </SliderButton>

        <div
          className="flex max-w-[min(100%,16rem)] flex-wrap items-center justify-center gap-2 sm:max-w-none"
          role="tablist"
          aria-label="Destination pages"
        >
          {Array.from({ length: pageCount }, (_, index) => {
            const selected = index === safePage;
            return (
              <button
                key={`dot-${String(index)}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={`Go to destinations page ${String(index + 1)}`}
                className={cn(
                  "h-2.5 rounded-full transition duration-300",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aviation-blue",
                  selected
                    ? "w-8 bg-aviation-blue"
                    : "w-2.5 bg-border hover:bg-medium-blue/50",
                )}
                onClick={() => {
                  goTo(index);
                }}
              />
            );
          })}
        </div>

        <SliderButton label="Next destinations" onClick={goNext}>
          <Chevron direction="right" />
        </SliderButton>
      </div>
    </div>
  );
}

type DestinationItem = (typeof destinations)[number];

function DestinationCard({
  item,
  sizes,
}: {
  readonly item: DestinationItem;
  readonly sizes: string;
}) {
  const image = destinationImages[item.imageKey];
  const href = `/${DEFAULT_LOCALE}?to=${item.place.iata}#search`;

  return (
    <article>
      <Link
        href={href}
        className="group relative block aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] shadow-card transition duration-500 hover:-translate-y-[6px] hover:shadow-float"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-dark-navy/90 via-dark-navy/35 to-transparent"
          aria-hidden="true"
        />
        <h3 className="absolute bottom-4 left-4 text-lg font-semibold text-white">
          {item.name}
        </h3>
      </Link>
    </article>
  );
}

function SliderButton({
  label,
  onClick,
  children,
}: {
  readonly label: string;
  readonly onClick: () => void;
  readonly children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full",
        "border border-border bg-main-bg text-aviation-blue shadow-card",
        "transition duration-300 hover:-translate-y-0.5 hover:border-aviation-blue hover:shadow-float",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aviation-blue",
      )}
    >
      {children}
    </button>
  );
}

function Chevron({ direction }: { readonly direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
