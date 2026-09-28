"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  destinationIndexPath,
  destinationSlugPath,
} from "@/constants/destinationPaths";
import type { LandingThemeId } from "@/constants/sitePages";
import type { DestinationNavItem } from "@/types/destinations";
import { cn } from "@/utils/cn";

type DestinationsNavMenuProps = {
  readonly items: ReadonlyArray<DestinationNavItem>;
  readonly themeId: LandingThemeId;
  readonly className?: string;
  readonly linkClassName?: string;
  readonly panelClassName?: string;
  readonly variant?: "light" | "dark";
};

const PANEL_MS = 180;

export function DestinationsNavMenu({
  items,
  themeId,
  className,
  linkClassName,
  panelClassName,
  variant = "light",
}: DestinationsNavMenuProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const leaveTimer = useRef<number | null>(null);
  const indexHref = destinationIndexPath(themeId);

  useEffect(() => {
    function onKey(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        setVisible(false);
        if (leaveTimer.current !== null) {
          window.clearTimeout(leaveTimer.current);
        }
        leaveTimer.current = window.setTimeout(() => {
          setOpen(false);
        }, PANEL_MS);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (leaveTimer.current !== null) {
        window.clearTimeout(leaveTimer.current);
      }
    };
  }, []);

  function clearLeaveTimer(): void {
    if (leaveTimer.current !== null) {
      window.clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  }

  function show(): void {
    clearLeaveTimer();
    setOpen(true);
    window.requestAnimationFrame(() => {
      setVisible(true);
    });
  }

  function hide(): void {
    setVisible(false);
    clearLeaveTimer();
    leaveTimer.current = window.setTimeout(() => {
      setOpen(false);
    }, PANEL_MS);
  }

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <button
        type="button"
        className={cn(
          "rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200",
          variant === "light"
            ? "text-primary-text hover:text-aviation-blue"
            : "text-white/90 hover:text-white",
          linkClassName,
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => {
          if (open) {
            hide();
          } else {
            show();
          }
        }}
      >
        Destinations
      </button>
      {open ? (
        <div
          role="menu"
          className={cn(
            "absolute left-0 top-full z-50 min-w-[220px] pt-2 transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none",
            visible
              ? "translate-y-0 opacity-100"
              : "-translate-y-1 opacity-0",
            panelClassName,
          )}
        >
          <ul className="rounded-[var(--radius-lg)] border border-border bg-soft-section p-2 shadow-float">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  role="menuitem"
                  href={destinationSlugPath(themeId, item.slug)}
                  className="block rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium text-primary-text hover:bg-light-blue-gray hover:text-aviation-blue"
                  onClick={hide}
                >
                  {item.destinationName}
                </Link>
              </li>
            ))}
            <li>
              <Link
                role="menuitem"
                href={indexHref}
                className="block rounded-[var(--radius-sm)] px-3 py-2 text-sm font-semibold text-aviation-blue hover:bg-light-blue-gray"
                onClick={hide}
              >
                View all destinations
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}

type DestinationsMobileListProps = {
  readonly items: ReadonlyArray<DestinationNavItem>;
  readonly themeId: LandingThemeId;
  readonly onNavigate: () => void;
  readonly linkClassName?: string;
};

export function DestinationsMobileList({
  items,
  themeId,
  onNavigate,
  linkClassName,
}: DestinationsMobileListProps) {
  return (
    <li>
      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-secondary-text">
        Destinations
      </p>
      <ul className="space-y-1 pb-2">
        {items.map((destination) => (
          <li key={destination.id}>
            <Link
              href={destinationSlugPath(themeId, destination.slug)}
              onClick={onNavigate}
              className={cn(
                "block rounded-[10px] px-3 py-2.5 text-sm font-medium text-primary-text hover:bg-soft-section",
                linkClassName,
              )}
            >
              {destination.destinationName}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href={destinationIndexPath(themeId)}
            onClick={onNavigate}
            className={cn(
              "block rounded-[10px] px-3 py-2.5 text-sm font-semibold text-aviation-blue hover:bg-soft-section",
              linkClassName,
            )}
          >
            View all destinations
          </Link>
        </li>
      </ul>
    </li>
  );
}
