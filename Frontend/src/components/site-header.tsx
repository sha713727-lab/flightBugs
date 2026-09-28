"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  DestinationsMobileList,
  DestinationsNavMenu,
} from "@/components/destinations-nav-menu";
import { brandAssets } from "@/constants/brandAssets";
import { DEFAULT_LOCALE } from "@/constants/locales";
import { siteBrand } from "@/constants/siteBrand";
import { siteNavigation } from "@/constants/siteNavigation";
import type { DestinationNavItem } from "@/types/destinations";
import { cn } from "@/utils/cn";

type SiteHeaderProps = {
  className?: string;
  readonly destinationNav: ReadonlyArray<DestinationNavItem>;
  readonly placement?: "overlay" | "bar";
};

export function SiteHeader({
  className,
  destinationNav,
  placement = "overlay",
}: SiteHeaderProps) {
  const { homeLogo } = brandAssets;
  const [open, setOpen] = useState(false);
  const isBar = placement === "bar";

  return (
    <header
      className={cn(
        isBar
          ? "sticky top-0 z-40 bg-[var(--header-pill-bg)] shadow-[var(--shadow-header)] backdrop-blur-[16px]"
          : "pointer-events-none absolute inset-x-0 top-0 z-40",
        className,
      )}
    >
      <div className={cn(isBar ? "" : "pointer-events-auto", "xl:hidden")}>
        <div
          className={cn(
            "flex h-16 items-center justify-between px-5",
            isBar
              ? ""
              : "bg-gradient-to-b from-black/70 to-transparent",
          )}
        >
          <Link
            href={`/${DEFAULT_LOCALE}`}
            className="flex shrink-0 items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aviation-blue"
          >
            <Image
              src={homeLogo.src}
              alt={homeLogo.alt}
              width={homeLogo.width}
              height={homeLogo.height}
              priority
              className="h-12 w-12 object-contain"
            />
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 text-primary-text"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
        </div>
        {open ? (
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="mx-5 rounded-[var(--radius-lg)] border border-border bg-soft-section p-3 shadow-float"
          >
            <ul className="space-y-1">
              {siteNavigation.map((item) =>
                item.kind === "destinations" ? (
                  <DestinationsMobileList
                    key={item.href}
                    items={destinationNav}
                    themeId="home"
                    onNavigate={() => setOpen(false)}
                    linkClassName="rounded-[var(--radius-sm)] py-2 hover:bg-light-blue-gray hover:text-aviation-blue"
                  />
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium text-primary-text hover:bg-light-blue-gray hover:text-aviation-blue"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
        ) : null}
      </div>

      <div
        className={cn(
          "container-avion hidden px-6 xl:block",
          isBar ? "py-2" : "pointer-events-auto pt-6",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between gap-3 rounded-full px-4 py-2",
            "bg-[var(--header-pill-bg)] shadow-[var(--shadow-header)]",
            "backdrop-blur-[16px]",
          )}
        >
          <Link
            href={`/${DEFAULT_LOCALE}`}
            className="flex shrink-0 items-center gap-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aviation-blue"
          >
            <Image
              src={homeLogo.src}
              alt={homeLogo.alt}
              width={homeLogo.width}
              height={homeLogo.height}
              priority
              className="h-14 w-14 object-contain"
            />
            <span className="text-[15px] font-bold tracking-tight text-primary-text">
              {siteBrand.chromeName}
            </span>
          </Link>

          <nav aria-label="Primary" className="flex items-center gap-0.5">
            {siteNavigation.map((item) =>
              item.kind === "destinations" ? (
                <DestinationsNavMenu
                  key={item.href}
                  items={destinationNav}
                  themeId="home"
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-primary-text transition-colors duration-200 hover:text-aviation-blue"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
