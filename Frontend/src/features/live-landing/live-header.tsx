"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  DestinationsMobileList,
  DestinationsNavMenu,
} from "@/components/destinations-nav-menu";
import { brandAssets } from "@/constants/brandAssets";
import {
  liveLandingCopy,
  liveLandingPath,
} from "@/constants/liveLandingContent";
import { siteBrand } from "@/constants/siteBrand";
import { sitePageHref } from "@/constants/sitePages";
import type { DestinationNavItem } from "@/types/destinations";

type LiveHeaderProps = {
  readonly destinationNav: ReadonlyArray<DestinationNavItem>;
};

export function LiveHeader({ destinationNav }: LiveHeaderProps) {
  const { siteLogo } = brandAssets;
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white">
      <div className="container-avion flex h-14 items-center justify-between gap-4">
        <Link href={liveLandingPath} className="flex shrink-0 items-center gap-2">
          <Image
            src={siteLogo.src}
            alt={siteLogo.alt}
            width={siteLogo.width}
            height={siteLogo.height}
            className="h-10 w-10 object-contain"
          />
          <span className="text-[15px] font-bold tracking-tight text-primary-text">
            {siteBrand.chromeName}
          </span>
        </Link>

        <nav aria-label="Company" className="hidden items-center gap-1 md:flex">
          <DestinationsNavMenu items={destinationNav} themeId="live" />
          <Link
            href={sitePageHref("about", "live")}
            className="rounded-[10px] px-3 py-2 text-sm font-medium text-secondary-text transition-colors hover:text-aviation-blue"
          >
            About
          </Link>
          <Link
            href={sitePageHref("contact", "live")}
            className="rounded-[10px] px-3 py-2 text-sm font-medium text-secondary-text transition-colors hover:text-aviation-blue"
          >
            Contact
          </Link>
        </nav>

        <p className="hidden items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-secondary-text sm:flex md:hidden lg:flex">
          <span
            className="live-live-dot size-1.5 rounded-full bg-aviation-blue"
            aria-hidden="true"
          />
          {liveLandingCopy.badge}
        </p>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-[12px] border border-border text-primary-text md:hidden"
          aria-expanded={open}
          aria-controls="live-mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open ? (
        <nav
          id="live-mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-white px-5 py-3 md:hidden"
        >
          <ul className="space-y-1">
            <DestinationsMobileList
              items={destinationNav}
              themeId="live"
              onNavigate={() => setOpen(false)}
            />
            <li>
              <Link
                href={sitePageHref("about", "live")}
                onClick={() => setOpen(false)}
                className="block rounded-[10px] px-3 py-2.5 text-sm font-medium text-primary-text hover:bg-soft-section"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href={sitePageHref("contact", "live")}
                onClick={() => setOpen(false)}
                className="block rounded-[10px] px-3 py-2.5 text-sm font-medium text-primary-text hover:bg-soft-section"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
