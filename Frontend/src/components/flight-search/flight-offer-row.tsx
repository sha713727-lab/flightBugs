"use client";

import type {
  FlightLegSummary,
  FlightOfferSummary,
  FlightSearchContext,
} from "@/types/flights/search-response";
import { cn } from "@/utils/cn";

type FlightOfferRowProps = {
  readonly offer: FlightOfferSummary;
  readonly context: FlightSearchContext;
  readonly optionNumber: number;
};

export function FlightOfferRow({
  offer,
  context,
  optionNumber,
}: FlightOfferRowProps) {
  const reference = offer.id.slice(-8).toUpperCase();

  return (
    <article className="py-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-aviation-blue/12 text-sm font-bold text-aviation-blue">
            {offer.airlineName.slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-aviation-blue/80">
              Option {optionNumber} · Ref {reference}
            </p>
            <p className="text-lg font-bold text-primary-text">
              {offer.airlineName}
            </p>
          </div>
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.08em] text-secondary-text">
          {formatStops(offer.outbound.stops)}
        </p>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <FlightLegRow label="Outbound" leg={offer.outbound} />
        {offer.return ? (
          <FlightLegRow label="Return" leg={offer.return} />
        ) : context.returnDate ? (
          <p className="flex items-center text-sm text-secondary-text lg:col-span-1">
            Return segment confirmed when you call our travel desk.
          </p>
        ) : null}
      </div>
    </article>
  );
}

function FlightLegRow({
  label,
  leg,
}: {
  readonly label: string;
  readonly leg: FlightLegSummary;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-aviation-blue">
          {label}
        </p>
        <p className="text-xs text-secondary-text">
          {formatDuration(leg.durationMinutes)} · {leg.flightNumbers.join(", ")}
        </p>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <Endpoint
          time={leg.departureAt}
          city={leg.originCity}
          code={leg.originCode}
          align="start"
        />
        <div className="flex flex-col items-center gap-1 px-1">
          <PlaneIcon />
          <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-secondary-text">
            {formatDuration(leg.durationMinutes)}
          </span>
        </div>
        <Endpoint
          time={leg.arrivalAt}
          city={leg.destinationCity}
          code={leg.destinationCode}
          align="end"
        />
      </div>
    </div>
  );
}

function Endpoint({
  time,
  city,
  code,
  align,
}: {
  readonly time: string;
  readonly city: string;
  readonly code: string;
  readonly align: "start" | "end";
}) {
  return (
    <div className={cn("min-w-0", align === "end" && "text-right")}>
      <p className="text-xl font-bold text-primary-text">{formatTime(time)}</p>
      <p className="mt-0.5 text-sm font-semibold text-primary-text">
        {city} ({code})
      </p>
      <p className="text-xs text-secondary-text">{formatDate(time)}</p>
    </div>
  );
}

function formatStops(stops: number): string {
  return stops === 0 ? "Nonstop" : `${stops} stop${stops > 1 ? "s" : ""}`;
}

function formatDuration(minutes: number): string {
  if (minutes <= 0) {
    return "TBC";
  }

  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;

  if (hours === 0) {
    return `${remainder}m`;
  }

  if (remainder === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainder}m`;
}

function formatTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "--:--";
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

function PlaneIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="text-aviation-blue/80"
    >
      <path
        d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
        fill="currentColor"
      />
    </svg>
  );
}
