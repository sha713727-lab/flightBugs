import { Suspense } from "react";

import { CallPhoneButton } from "@/components/call-phone-button";
import { brandAssets } from "@/constants/brandAssets";
import {
  homeAvailabilityLine,
  homeFormTrustLine,
  homeHeroSupportLine,
  homeValueLine,
} from "@/constants/homeContent";
import { FlightSearchPanel } from "@/features/home/flight-search-panel";

export function HeroSection() {
  const { heroAircraftVideo, heroAircraftMobileVideo } = brandAssets;

  return (
    <section className="relative z-30 mb-8 w-full pb-8 xl:mb-20 xl:pb-0">
      <div className="relative flex h-svh flex-col overflow-hidden xl:h-auto xl:min-h-[720px] xl:overflow-visible">
        <video
          className="absolute inset-0 h-full w-full object-cover object-center md:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroAircraftMobileVideo.poster}
          aria-label={heroAircraftMobileVideo.alt}
        >
          <source src={heroAircraftMobileVideo.src} type="video/mp4" />
        </video>
        <video
          className="absolute inset-0 hidden h-full w-full object-cover object-center md:block"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroAircraftVideo.poster}
          aria-label={heroAircraftVideo.alt}
        >
          <source src={heroAircraftVideo.src} type="video/mp4" />
        </video>
        <div
          className="hero-overlay-mobile absolute inset-0 xl:hidden"
          aria-hidden="true"
        />
        <div className="hero-overlay absolute inset-0 hidden xl:block" aria-hidden="true" />
        <div
          className="absolute inset-0 hidden bg-dark-navy/75 xl:block"
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 pb-[15rem] pt-16 text-center sm:px-6 xl:h-auto xl:flex-1 xl:px-6 xl:pb-36 xl:pt-32">
          <p className="mb-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-aviation-blue xl:mb-6 xl:rounded-full xl:border xl:border-aviation-blue/50 xl:bg-dark-navy/70 xl:px-3.5 xl:py-1.5 xl:text-xs xl:backdrop-blur-md">
            <span className="xl:hidden">✦ 24/7 Personal Travel Service</span>
            <span className="hidden items-center gap-2 xl:inline-flex">
              <PlaneIcon />
              Independent Travel Agency
            </span>
          </p>

          <h1 className="text-hero-heading mx-auto max-w-4xl fade-up">
            International Flights
            <br />
            <span className="text-aviation-blue">Booked By Phone.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-white/70 xl:hidden">
            {homeHeroSupportLine}
          </p>
          <p className="mx-auto mt-6 hidden max-w-xl text-base leading-relaxed text-primary-text/90 xl:block">
            {homeValueLine}
          </p>

          <CallPhoneButton
            className="mt-6 min-h-[52px] w-[min(100%,280px)] !bg-aviation-blue font-bold !text-dark-navy shadow-[0_12px_32px_rgba(245,196,0,0.35)] hover:!bg-medium-blue hover:shadow-[0_16px_36px_rgba(245,196,0,0.45)] xl:mt-10 xl:w-auto xl:min-h-14 xl:px-10 xl:text-base"
            size="lg"
          />

          <p className="mt-5 hidden text-sm text-secondary-text xl:block">
            {homeAvailabilityLine} · Canada &amp; USA
          </p>
        </div>
      </div>

      <div
        id="search"
        className="container-avion relative z-50 -mt-[15rem] scroll-mt-28 pb-6 xl:pointer-events-none xl:absolute xl:inset-x-0 xl:bottom-0 xl:mt-0 xl:pb-0 xl:translate-y-1/2"
      >
        <div className="pointer-events-auto">
          <Suspense fallback={<SearchPanelFallback />}>
            <FlightSearchPanel />
          </Suspense>
        </div>
        <p className="mt-4 text-center text-xs text-white/60 xl:hidden">
          {homeFormTrustLine}
        </p>
      </div>
    </section>
  );
}

function SearchPanelFallback() {
  return (
    <div
      className="flight-search-panel min-h-[88px]"
      aria-hidden="true"
    />
  );
}

function PlaneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
        fill="currentColor"
      />
    </svg>
  );
}
