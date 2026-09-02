"use client";

import {
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

import {
  type FlightSearchCabinClass,
  flightSearchCabinClasses,
  getCabinClassLabel,
} from "@/constants/flightSearchCabinClasses";
import {
  type FlightSearchPlace,
  formatPlaceLabel,
  formatPlaceOptionPrimary,
  formatPlaceOptionSecondary,
} from "@/constants/flightSearchPlaces";
import { suggestPlacesAction } from "@/server/actions/suggest-places";
import type { FlightPlaceSuggestion } from "@/types/flights/place-suggestions";
import { cn } from "@/utils/cn";

type FieldShellProps = {
  readonly label: string;
  readonly value: string;
  readonly isOpen: boolean;
  readonly onToggle: () => void;
  readonly menuId: string;
};

type DropdownMenuProps = {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly anchorRef: RefObject<HTMLElement | null>;
  readonly menuId: string;
  readonly className?: string;
  readonly children: ReactNode;
};

type AirportFieldProps = {
  readonly label: string;
  readonly value: FlightSearchPlace;
  readonly excludeIata?: string;
  readonly onSelect: (place: FlightSearchPlace) => void;
  readonly className?: string;
};

type DateFieldProps = {
  readonly label: string;
  readonly value: string;
  readonly min?: string;
  readonly onChange: (isoDate: string) => void;
  readonly className?: string;
};

type TravelerFieldProps = {
  readonly adults: number;
  readonly onChange: (adults: number) => void;
  readonly className?: string;
};

type CabinClassFieldProps = {
  readonly value: FlightSearchCabinClass;
  readonly onChange: (value: FlightSearchCabinClass) => void;
  readonly className?: string;
};

const travelerOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

const placeSearchDebounceMs = 300;

const dropdownFieldInputClassName =
  "flight-search-menu-input min-h-11 w-full rounded-[12px] border border-border px-3 text-sm font-semibold";

export function AirportSearchField({
  label,
  value,
  excludeIata,
  onSelect,
  className,
}: AirportFieldProps) {
  const menuId = useId();
  const inputId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ReadonlyArray<FlightPlaceSuggestion>>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const requestVersionRef = useRef(0);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setResults([]);
    setSearchError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  const canSearch = open && query.trim().length >= 2;

  useEffect(() => {
    if (!canSearch) {
      return;
    }

    const trimmed = query.trim();
    const version = requestVersionRef.current + 1;
    requestVersionRef.current = version;

    const timeout = window.setTimeout(() => {
      setLoading(true);
      setSearchError(null);

      void suggestPlacesAction(trimmed).then((result) => {
        if (requestVersionRef.current !== version) {
          return;
        }

        setLoading(false);

        if (!result.ok) {
          setResults([]);
          setSearchError(result.message);
          return;
        }

        setResults(
          result.data.places.filter(
            (place) => place.iata.toUpperCase() !== excludeIata?.toUpperCase(),
          ),
        );
      });
    }, placeSearchDebounceMs);

    return () => window.clearTimeout(timeout);
  }, [canSearch, excludeIata, query]);

  const visibleResults = canSearch ? results : [];
  const visibleLoading = canSearch ? loading : false;
  const visibleSearchError = canSearch ? searchError : null;

  return (
    <div ref={anchorRef} className={cn("relative min-w-0 flex-1", className)}>
      <FieldShell
        label={label}
        value={formatPlaceLabel(value)}
        isOpen={open}
        onToggle={() => setOpen((current) => !current)}
        menuId={menuId}
      />
      <DropdownMenu
        open={open}
        onClose={close}
        anchorRef={anchorRef}
        menuId={menuId}
        className="min-w-[280px]"
      >
        <div className="border-b border-border p-3">
          <label htmlFor={inputId} className="sr-only">
            Search {label}
          </label>
          <input
            ref={inputRef}
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="City, airport, or code"
            autoComplete="off"
            className={dropdownFieldInputClassName}
          />
          <p className="mt-2 text-xs text-secondary-text">
            Search airports and cities worldwide
          </p>
        </div>

        <div className="max-h-64 overflow-y-auto py-1">
          {query.trim().length < 2 ? (
            <p className="px-4 py-3 text-sm text-secondary-text">
              Type at least 2 characters to search.
            </p>
          ) : null}

          {visibleLoading ? (
            <p className="px-4 py-3 text-sm text-secondary-text">Searching...</p>
          ) : null}

          {!visibleLoading && visibleSearchError ? (
            <p className="px-4 py-3 text-sm text-secondary-text">
              {visibleSearchError}
            </p>
          ) : null}

          {!visibleLoading &&
          !visibleSearchError &&
          query.trim().length >= 2 &&
          visibleResults.length === 0 ? (
            <p className="px-4 py-3 text-sm text-secondary-text">
              No matching airports found.
            </p>
          ) : null}

          {!visibleLoading && !visibleSearchError && visibleResults.length > 0 ? (
            <ul role="listbox" aria-label={`${label} places`}>
              {visibleResults.map((place) => (
                <li key={`${place.kind}-${place.id}`}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={place.iata === value.iata}
                    onClick={() => {
                      onSelect(mapSuggestionToPlace(place));
                      close();
                    }}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors hover:bg-aviation-blue/10",
                      place.iata === value.iata
                        ? "bg-aviation-blue/15 font-semibold text-primary-text"
                        : "text-primary-text",
                    )}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm">
                        {formatPlaceOptionPrimary(mapSuggestionToPlace(place))}
                      </span>
                      <span className="block truncate text-xs text-secondary-text">
                        {formatPlaceOptionSecondary(mapSuggestionToPlace(place))}
                      </span>
                    </span>
                    <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.08em] text-aviation-blue/80">
                      {place.countryCode}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </DropdownMenu>
    </div>
  );
}

function mapSuggestionToPlace(
  suggestion: FlightPlaceSuggestion,
): FlightSearchPlace {
  return {
    id: suggestion.id,
    city: suggestion.city,
    iata: suggestion.iata,
    name: suggestion.name,
    countryCode: suggestion.countryCode,
    kind: suggestion.kind,
  };
}

export function DateSearchField({
  label,
  value,
  min,
  onChange,
  className,
}: DateFieldProps) {
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  return (
    <div ref={anchorRef} className={cn("relative min-w-0 flex-1", className)}>
      <FieldShell
        label={label}
        value={formatDisplayDate(value)}
        isOpen={open}
        onToggle={() => setOpen((current) => !current)}
        menuId={menuId}
      />
      <DropdownMenu
        open={open}
        onClose={close}
        anchorRef={anchorRef}
        menuId={menuId}
        className="min-w-[220px] p-3"
      >
        <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-[0.06em] text-aviation-blue/75">
          {label}
          <input
            ref={inputRef}
            type="date"
            value={value}
            min={min}
            onChange={(event) => {
              onChange(event.target.value);
              close();
            }}
            className={dropdownFieldInputClassName}
          />
        </label>
      </DropdownMenu>
    </div>
  );
}

export function TravelerSearchField({
  adults,
  onChange,
  className,
}: TravelerFieldProps) {
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  const label = adults === 1 ? "1 Adult" : `${adults} Adults`;

  return (
    <div ref={anchorRef} className={cn("relative min-w-0 flex-1", className)}>
      <FieldShell
        label="Traveler"
        value={label}
        isOpen={open}
        onToggle={() => setOpen((current) => !current)}
        menuId={menuId}
      />
      <DropdownMenu
        open={open}
        onClose={close}
        anchorRef={anchorRef}
        menuId={menuId}
        className="min-w-[180px] py-1"
      >
        <ul role="listbox" aria-label="Travelers">
          {travelerOptions.map((count) => (
            <li key={count}>
              <button
                type="button"
                role="option"
                aria-selected={count === adults}
                onClick={() => {
                  onChange(count);
                  close();
                }}
                className={cn(
                  "flex w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-aviation-blue/10",
                  count === adults
                    ? "bg-aviation-blue/15 font-semibold text-primary-text"
                    : "text-primary-text",
                )}
              >
                {count === 1 ? "1 Adult" : `${count} Adults`}
              </button>
            </li>
          ))}
        </ul>
      </DropdownMenu>
    </div>
  );
}

export function CabinClassSearchField({
  value,
  onChange,
  className,
}: CabinClassFieldProps) {
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);

  return (
    <div ref={anchorRef} className={cn("relative min-w-0 flex-1", className)}>
      <FieldShell
        label="Cabin"
        value={getCabinClassLabel(value)}
        isOpen={open}
        onToggle={() => setOpen((current) => !current)}
        menuId={menuId}
      />
      <DropdownMenu
        open={open}
        onClose={close}
        anchorRef={anchorRef}
        menuId={menuId}
        className="min-w-[200px] py-1"
      >
        <ul role="listbox" aria-label="Cabin class">
          {flightSearchCabinClasses.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onChange(option.value);
                  close();
                }}
                className={cn(
                  "flex w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-aviation-blue/10",
                  option.value === value
                    ? "bg-aviation-blue/15 font-semibold text-primary-text"
                    : "text-primary-text",
                )}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </DropdownMenu>
    </div>
  );
}

function DropdownMenu({
  open,
  onClose,
  anchorRef,
  menuId,
  className,
  children,
}: DropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const updatePosition = useCallback(() => {
    const anchor = anchorRef.current;
    const menu = menuRef.current;
    if (!anchor) {
      return;
    }

    const rect = anchor.getBoundingClientRect();
    const menuHeight = menu?.offsetHeight ?? 280;
    const spaceBelow = window.innerHeight - rect.bottom;
    const openDown = spaceBelow >= menuHeight || spaceBelow >= rect.top;

    setPosition({
      top: openDown ? rect.bottom + 8 : rect.top - menuHeight - 8,
      left: rect.left,
      width: Math.max(rect.width, 180),
    });
  }, [anchorRef]);

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition]);

  useLayoutEffect(() => {
    if (open) {
      updatePosition();
    }
  }, [open, children, updatePosition]);

  useDismissOnOutside([anchorRef, menuRef], open, onClose);

  if (!open || !mounted) {
    return null;
  }

  return createPortal(
    <div
      ref={menuRef}
      id={menuId}
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        minWidth: position.width,
        zIndex: 10000,
      }}
      className={cn("flight-search-menu", className)}
    >
      {children}
    </div>,
    document.body,
  );
}

function FieldShell({
  label,
  value,
  isOpen,
  onToggle,
  menuId,
}: FieldShellProps) {
  return (
    <button
      type="button"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-controls={isOpen ? menuId : undefined}
      onClick={onToggle}
      className="flex w-full flex-col justify-center gap-1 px-4 py-3.5 text-left transition-colors hover:bg-aviation-blue/5"
    >
      <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-aviation-blue/75 xl:text-[11px] xl:font-medium">
        {label}
      </span>
      <span className="flex w-full items-center justify-between gap-2">
        <span className="truncate text-sm font-semibold text-primary-text xl:text-[15px]">
          {value}
        </span>
        <ChevronDownIcon open={isOpen} />
      </span>
    </button>
  );
}

function useDismissOnOutside(
  refs: ReadonlyArray<RefObject<HTMLElement | null>>,
  isOpen: boolean,
  onDismiss: () => void,
): void {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      const isInside = refs.some((ref) => ref.current?.contains(target));
      if (!isInside) {
        onDismiss();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen, onDismiss, refs]);
}

function formatDisplayDate(isoDate: string): string {
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

function ChevronDownIcon({ open }: { readonly open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn(
        "shrink-0 text-aviation-blue/70 transition-transform",
        open && "rotate-180",
      )}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
