"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { brandAssets } from "@/constants/brandAssets";
import { DEFAULT_LOCALE } from "@/constants/locales";
import { siteBrand } from "@/constants/siteBrand";
import { siteNavigation } from "@/constants/siteNavigation";
import { cn } from "@/utils/cn";

type SiteHeaderProps = {
  className?: string;
};

export function SiteHeader({ className }: SiteHeaderProps) {
  const { homeLogo } = brandAssets;
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-40",
        className,
      )}
    >
      <div className="pointer-events-auto xl:hidden">
        <div className="flex h-16 items-center justify-between bg-gradient-to-b from-black/70 to-transparent px-5">
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
              {siteNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-medium text-primary-text hover:bg-light-blue-gray hover:text-aviation-blue"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>

      <div className="container-avion pointer-events-auto hidden px-6 pt-6 xl:block">
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
            {siteNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-primary-text transition-colors duration-200 hover:text-aviation-blue"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
