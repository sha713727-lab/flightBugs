import { Suspense } from "react";

import { CallPhoneButton } from "@/components/call-phone-button";
import { brandAssets } from "@/constants/brandAssets";
import { europeLandingCopy } from "@/constants/destinationLandingContent";
import { LandingSearchPanel } from "@/features/destination-landing/landing-search-panel";

export function LandingHero() {
  const { destinationLandingHeroVideo, destinationLandingHeroMobileVideo } =
    brandAssets;

  return (
    <section className="relative">
      <div className="relative min-h-[720px] overflow-hidden md:min-h-[680px] xl:min-h-[760px]">
        <video
          className="absolute inset-0 h-full w-full object-cover object-center md:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={destinationLandingHeroMobileVideo.poster}
          aria-label={destinationLandingHeroMobileVideo.alt}
        >
          <source src={destinationLandingHeroMobileVideo.src} type="video/mp4" />
        </video>
        <video
          className="absolute inset-0 hidden h-full w-full object-cover object-center md:block"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={destinationLandingHeroVideo.poster}
          aria-label={destinationLandingHeroVideo.alt}
        >
          <source src={destinationLandingHeroVideo.src} type="video/mp4" />
        </video>
        <div className="destination-hero-overlay absolute inset-0" aria-hidden="true" />

        <div className="relative z-10 flex min-h-[720px] flex-col items-center justify-center px-5 pb-40 pt-16 text-center md:min-h-[680px] md:pb-36 xl:min-h-[760px] xl:pb-48 xl:pt-24">
          <p className="destination-hero-kicker text-[11px] font-semibold uppercase tracking-[0.16em]">
            {europeLandingCopy.eyebrow}
          </p>
          <h1 className="mt-4 max-w-[600px] text-[clamp(48px,8vw,76px)] font-bold leading-[1.02] tracking-[-0.04em] text-white">
            {europeLandingCopy.headingLineOne}
            <br />
            {europeLandingCopy.headingLineTwo}
          </h1>
          <p className="destination-hero-kicker mx-auto mt-5 max-w-[480px] text-[15px] leading-relaxed">
            {europeLandingCopy.heroSupport}
          </p>
          <CallPhoneButton
            className="mt-8 min-h-[52px] w-[min(100%,280px)] rounded-[12px] font-bold text-on-accent"
            size="lg"
          />
        </div>
      </div>

      <div
        id="search"
        className="container-avion relative z-20 -mt-28 scroll-mt-28 pb-6 md:-mt-24 xl:-mt-28"
      >
        <Suspense fallback={<div className="destination-search-panel min-h-[88px]" />}>
          <LandingSearchPanel />
        </Suspense>
      </div>
    </section>
  );
}
