"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { adsLandingPath } from "@/constants/adsLandingContent";
import { brandAssets } from "@/constants/brandAssets";
import { siteBrand } from "@/constants/siteBrand";
import { sitePageHref } from "@/constants/sitePages";

export function AdsHeader() {
  const { siteLogo } = brandAssets;

  useEffect(() => {
    document.documentElement.classList.add("ads-landing-active");

    return () => {
      document.documentElement.classList.remove("ads-landing-active");
    };
  }, []);

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
      </div>
    </header>
  );
}
