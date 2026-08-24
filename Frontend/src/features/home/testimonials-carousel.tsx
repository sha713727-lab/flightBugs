"use client";

import Image from "next/image";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useState,
} from "react";

import { testimonials } from "@/constants/homeContent";
import { cn } from "@/utils/cn";

const AUTO_MS = 5500;

function useVisibleCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const sm = window.matchMedia("(min-width: 640px)");
    const lg = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      if (lg.matches) {
        setCount(3);
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

export function TestimonialsCarousel() {
  const labelId = useId();
  const visibleCount = useVisibleCount();
  const pageCount = Math.max(1, Math.ceil(testimonials.length / visibleCount));
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const safePage = Math.min(page, pageCount - 1);
  const activeStart = safePage * visibleCount;
  const focusIndex = activeStart + Math.floor((visibleCount - 1) / 2);

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

  useEffect(() => {
    if (paused || pageCount <= 1) {
      return undefined;
    }
    const timer = window.setInterval(() => {
      setPage((current) => (current + 1) % pageCount);
    }, AUTO_MS);
    return () => {
      window.clearInterval(timer);
    };
  }, [paused, pageCount]);

  const focusTestimonial = (index: number) => {
    goTo(Math.floor(index / visibleCount));
  };

  return (
    <div
      className="mt-8"
      onMouseEnter={() => {
        setPaused(true);
      }}
      onMouseLeave={() => {
        setPaused(false);
      }}
      onFocusCapture={() => {
        setPaused(true);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
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
      <div className="flex items-end justify-start gap-2 overflow-x-auto px-1 pb-1 sm:justify-center sm:gap-2.5 sm:overflow-visible">
        {testimonials.map((item, index) => {
          const distance = Math.abs(index - focusIndex);
          const isActive = index >= activeStart && index < activeStart + visibleCount;
          const size =
            distance === 0
              ? "h-14 w-14"
              : distance === 1
                ? "h-12 w-12"
                : distance === 2
                  ? "h-11 w-11"
                  : "h-10 w-10";

          return (
            <button
              key={`avatar-${item.id}`}
              type="button"
              className={cn(
                "relative shrink-0 overflow-hidden rounded-full border-2 shadow-card transition duration-300",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aviation-blue",
                size,
                isActive
                  ? "border-aviation-blue ring-2 ring-aviation-blue/25"
                  : "border-white opacity-80 hover:opacity-100",
              )}
              aria-label={`Show testimonial from ${item.name}`}
              aria-controls={labelId}
              onClick={() => {
                focusTestimonial(index);
              }}
            >
              <Image
                src={item.imageSrc}
                alt=""
                fill
                sizes="56px"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>

      <div className="relative mt-10">
        <div className="overflow-hidden" id={labelId} aria-live="polite">
          <div
            className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${String(safePage * 100)}%)` }}
          >
            {Array.from({ length: pageCount }, (_, pageIndex) => {
              const start = pageIndex * visibleCount;
              const slice = testimonials.slice(start, start + visibleCount);

              return (
                <div
                  key={`page-${String(pageIndex)}`}
                  className="grid w-full min-w-full shrink-0 gap-5"
                  style={{
                    gridTemplateColumns: `repeat(${String(slice.length)}, minmax(0, 1fr))`,
                  }}
                >
                  {slice.map((item) => (
                    <TestimonialCard key={item.id} item={item} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <SliderButton label="Previous testimonials" onClick={goPrev}>
            <Chevron direction="left" />
          </SliderButton>

          <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial pages">
            {Array.from({ length: pageCount }, (_, index) => {
              const selected = index === safePage;
              return (
                <button
                  key={`dot-${String(index)}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-label={`Go to testimonials page ${String(index + 1)}`}
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

          <SliderButton label="Next testimonials" onClick={goNext}>
            <Chevron direction="right" />
          </SliderButton>
        </div>
      </div>
    </div>
  );
}

type TestimonialItem = (typeof testimonials)[number];

function TestimonialCard({ item }: { readonly item: TestimonialItem }) {
  return (
    <article className="testimonial-surface flex h-full min-h-[240px] flex-col rounded-[var(--radius-card)] p-6 text-white shadow-card transition duration-500 hover:-translate-y-1 hover:shadow-float">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/25">
          <Image
            src={item.imageSrc}
            alt={item.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-semibold">{item.name}</p>
          <p className="text-sm text-white/75">{item.role}</p>
        </div>
      </div>

      <p className="mt-5 flex-1 text-[15px] leading-relaxed text-white/95">
        {item.quote}
      </p>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-white/90">
          <PlaneMark />
          <span>{item.routeCode}</span>
        </div>
        <p
          className="text-[15px] tracking-[0.08em] text-[#F5C84C]"
          aria-label={`${String(item.rating)} out of 5 stars`}
        >
          {"★".repeat(item.rating)}
        </p>
      </div>
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

function PlaneMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
        fill="currentColor"
      />
    </svg>
  );
}
