import Image from "next/image";
import Link from "next/link";

import { brandAssets } from "@/constants/brandAssets";
import {
  liveLandingCopy,
  liveLandingPath,
} from "@/constants/liveLandingContent";
import { siteBrand } from "@/constants/siteBrand";
import { sitePageHref } from "@/constants/sitePages";

export function LiveHeader() {
  const { siteLogo } = brandAssets;

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
      </div>
    </header>
  );
}
