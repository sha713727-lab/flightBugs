"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  DestinationsMobileList,
  DestinationsNavMenu,
} from "@/components/destinations-nav-menu";
import { adsLandingPath } from "@/constants/adsLandingContent";
import { brandAssets } from "@/constants/brandAssets";
import { siteBrand } from "@/constants/siteBrand";
import { sitePageHref } from "@/constants/sitePages";
import type { DestinationNavItem } from "@/types/destinations";

type AdsHeaderProps = {
  readonly destinationNav: ReadonlyArray<DestinationNavItem>;
};

export function AdsHeader({ destinationNav }: AdsHeaderProps) {
  const { siteLogo } = brandAssets;
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-main-bg/95 backdrop-blur-[8px]">
      <div className="container-avion flex h-14 items-center justify-between gap-4">
        <Link href={adsLandingPath} className="flex shrink-0 items-center gap-2">
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

        <nav aria-label="Company" className="hidden items-center gap-1 sm:flex">
          <DestinationsNavMenu items={destinationNav} themeId="book" />
          <Link
            href={sitePageHref("about", "book")}
            className="rounded-[10px] px-3 py-2 text-sm font-medium text-secondary-text transition-colors hover:text-aviation-blue"
          >
            About
          </Link>
          <Link
            href={sitePageHref("contact", "book")}
            className="rounded-[10px] px-3 py-2 text-sm font-medium text-secondary-text transition-colors hover:text-aviation-blue"
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-[12px] border border-border text-primary-text sm:hidden"
          aria-expanded={open}
          aria-controls="book-mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open ? (
        <nav
          id="book-mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-main-bg px-5 py-3 sm:hidden"
        >
          <ul className="space-y-1">
            <DestinationsMobileList
              items={destinationNav}
              themeId="book"
              onNavigate={() => setOpen(false)}
            />
            <li>
              <Link
                href={sitePageHref("about", "book")}
                onClick={() => setOpen(false)}
                className="block rounded-[10px] px-3 py-2.5 text-sm font-medium text-primary-text hover:bg-soft-section"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href={sitePageHref("contact", "book")}
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
