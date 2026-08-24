"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { CallPhoneButton } from "@/components/call-phone-button";
import { brandAssets } from "@/constants/brandAssets";
import { siteBrand } from "@/constants/siteBrand";
import {
  type LandingThemeId,
  landingThemes,
  siteCompanyLinks,
  sitePageHref,
} from "@/constants/sitePages";

type SitePageHeaderProps = {
  readonly themeId: LandingThemeId;
};

export function SitePageHeader({ themeId }: SitePageHeaderProps) {
  const theme = landingThemes[themeId];
  const { siteLogo } = brandAssets;
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0a] text-white">
      <div className="container-avion flex h-16 items-center justify-between gap-4 md:h-[72px]">
        <Link
          href={theme.homeHref}
          className="inline-flex shrink-0 items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aviation-blue"
        >
          <Image
            src={siteLogo.src}
            alt={siteLogo.alt}
            width={siteLogo.width}
            height={siteLogo.height}
            className="h-10 w-10 object-contain md:h-11 md:w-11"
            priority
          />
          <span className="text-[15px] font-bold tracking-tight text-white">
            {siteBrand.chromeName}
          </span>
        </Link>

        <nav
          aria-label="Company"
          className="hidden items-center gap-1 lg:flex"
        >
          {siteCompanyLinks.map((item) => (
            <Link
              key={item.page}
              href={sitePageHref(item.page, themeId)}
              className="rounded-full px-3 py-2 text-sm font-medium text-white/90 transition-colors duration-200 hover:text-[#f5c400]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CallPhoneButton
            size="sm"
            className="rounded-full bg-[#f5c400] text-[#4a4a4a] hover:bg-[#e0b200] hover:text-[#4a4a4a]"
          />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="site-page-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="site-page-mobile-nav"
          aria-label="Mobile company"
          className="border-t border-white/10 bg-[#0a0a0a] px-5 py-3 lg:hidden"
        >
          <ul className="space-y-1">
            {siteCompanyLinks.map((item) => (
              <li key={item.page}>
                <Link
                  href={sitePageHref(item.page, themeId)}
                  onClick={() => setOpen(false)}
                  className="block rounded-[10px] px-3 py-2.5 text-sm font-medium text-white hover:bg-white/5 hover:text-[#f5c400]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
