"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { brandAssets } from "@/constants/brandAssets";
import {
  exploreLandingCopy,
  exploreLandingPath,
  exploreProductTabs,
} from "@/constants/exploreLandingContent";
import { siteBrand } from "@/constants/siteBrand";
import { sitePageHref } from "@/constants/sitePages";
import { cn } from "@/utils/cn";

export function ExploreHeader() {
  const [open, setOpen] = useState(false);
  const { siteLogo } = brandAssets;

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--explore-border)] bg-[var(--explore-surface)]/90 backdrop-blur-[10px]">
      <div className="explore-container flex h-16 items-center justify-between gap-4">
        <Link
          href={exploreLandingPath}
          className="flex shrink-0 items-center gap-2.5"
        >
          <Image
            src={siteLogo.src}
            alt={siteLogo.alt}
            width={siteLogo.width}
            height={siteLogo.height}
            className="h-10 w-10 object-contain"
          />
          <span className="text-[15px] font-bold tracking-tight text-[var(--explore-text)]">
            {siteBrand.chromeName}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {exploreProductTabs.map((tab) => (
            <a
              key={tab.id}
              href={tab.id === "flights" ? "#search" : `#${tab.id}`}
              className={cn(
                "rounded-[10px] px-3 py-2 text-sm font-medium transition-colors",
                tab.id === "flights"
                  ? "bg-[var(--explore-primary-soft)] text-[var(--explore-primary)]"
                  : "text-[var(--explore-text-muted)] hover:text-[var(--explore-text)]",
              )}
            >
              {tab.label}
            </a>
          ))}
          <a
            href="#explore"
            className="rounded-[10px] px-3 py-2 text-sm font-medium text-[var(--explore-text-muted)] hover:text-[var(--explore-text)]"
          >
            {exploreLandingCopy.navExplore}
          </a>
          <a
            href="#ai"
            className="rounded-[10px] px-3 py-2 text-sm font-medium text-[var(--explore-text-muted)] hover:text-[var(--explore-text)]"
          >
            {exploreLandingCopy.navAi}
          </a>
          <Link
            href={sitePageHref("about", "explore")}
            className="rounded-[10px] px-3 py-2 text-sm font-medium text-[var(--explore-text-muted)] hover:text-[var(--explore-text)]"
          >
            About
          </Link>
          <Link
            href={sitePageHref("contact", "explore")}
            className="rounded-[10px] px-3 py-2 text-sm font-medium text-[var(--explore-text-muted)] hover:text-[var(--explore-text)]"
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-[12px] border border-[var(--explore-border)] text-[var(--explore-text)] lg:hidden"
          aria-expanded={open}
          aria-controls="explore-mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open ? (
        <nav
          id="explore-mobile-nav"
          aria-label="Mobile"
          className="border-t border-[var(--explore-border)] bg-[var(--explore-surface)] px-5 py-3 lg:hidden"
        >          <ul className="space-y-1">
            {[
              ...exploreProductTabs,
              { id: "explore", label: exploreLandingCopy.navExplore },
              { id: "ai", label: exploreLandingCopy.navAi },
            ].map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id === "flights" ? "search" : item.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-[10px] px-3 py-2.5 text-sm font-medium text-[var(--explore-text)] hover:bg-[var(--explore-primary-soft)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href={sitePageHref("about", "explore")}
                onClick={() => setOpen(false)}
                className="block rounded-[10px] px-3 py-2.5 text-sm font-medium text-[var(--explore-text)] hover:bg-[var(--explore-primary-soft)]"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href={sitePageHref("contact", "explore")}
                onClick={() => setOpen(false)}
                className="block rounded-[10px] px-3 py-2.5 text-sm font-medium text-[var(--explore-text)] hover:bg-[var(--explore-primary-soft)]"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}    </header>
  );
}
