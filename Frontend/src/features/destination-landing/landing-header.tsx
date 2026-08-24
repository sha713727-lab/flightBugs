"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { brandAssets } from "@/constants/brandAssets";
import {
  europeLandingCopy,
  europeLandingNav,
  europeLandingPath,
} from "@/constants/destinationLandingContent";
import { siteBrand } from "@/constants/siteBrand";
import { cn } from "@/utils/cn";

export function LandingHeader() {
  const { siteLogo } = brandAssets;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40">
      <div className="hidden h-10 items-center bg-dark-navy px-6 text-[12px] text-white/80 lg:flex">
        <p>✈ {europeLandingCopy.announcement}</p>
      </div>
      <p className="bg-dark-navy px-5 py-2 text-center text-[12px] text-white/80 lg:hidden">
        ✈ {europeLandingCopy.announcement}
      </p>

      <div
        className={cn(
          "border-b bg-white transition-[border-color,box-shadow] duration-[250ms] ease-out",
          scrolled ? "border-border" : "border-transparent",
        )}
      >
        <div
          className={cn(
            "container-avion flex items-center justify-between gap-4 transition-[height] duration-[250ms] ease-out",
            scrolled ? "h-14 lg:h-16" : "h-16 lg:h-[72px]",
          )}
        >
          <Link href={europeLandingPath} className="flex shrink-0 items-center gap-2">
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

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            {europeLandingNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[10px] px-3 py-2 text-sm font-medium text-primary-text transition-colors duration-200 hover:text-aviation-blue"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-[12px] border border-border text-primary-text lg:hidden"
              aria-expanded={open}
              aria-controls="destination-mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span aria-hidden="true">{open ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {open ? (
          <nav
            id="destination-mobile-nav"
            aria-label="Mobile"
            className="border-t border-border bg-white px-5 py-3 lg:hidden"
          >
            <ul className="space-y-1">
              {europeLandingNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-[10px] px-3 py-2.5 text-sm font-medium text-primary-text hover:bg-soft-section"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
