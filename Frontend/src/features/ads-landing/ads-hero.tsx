"use client";

import Image from "next/image";
import { Suspense, useEffect, useRef } from "react";

import { CallPhoneButton } from "@/components/call-phone-button";
import { adsLandingCopy } from "@/constants/adsLandingContent";
import { marketingImages } from "@/constants/brandAssets";
import { AdsPosterVideo } from "@/features/ads-landing/ads-poster-video";
import { AdsSearchPanel } from "@/features/ads-landing/ads-search-panel";
import { cn } from "@/utils/cn";

export function AdsHero() {
  const mediaRef = useRef<HTMLDivElement>(null);
  const { thoughtfulAirportVideo, travelSuccess } = marketingImages;

  useEffect(() => {
    const media = mediaRef.current;
    if (!media || window.matchMedia("(max-width: 767px)").matches) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cancelled = false;
    let dispose: (() => void) | undefined;

    void import("@/features/ads-landing/ads-gsap").then(({ gsap }) => {
      if (cancelled) {
        return;
      }

      const tween = gsap.fromTo(
        media,
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: media,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      dispose = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <section className="pb-10 pt-4 md:pb-14 md:pt-6">
      <div className="container-avion">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
          <div>
            <p
              className={cn(
                "ads-fade-in text-[11px] font-semibold uppercase tracking-[0.16em] text-aviation-blue",
              )}
            >
              {adsLandingCopy.eyebrow}
            </p>

            <h1
              className={cn(
                "ads-fade-in ads-fade-in-delay-1 mt-4 max-w-[12ch] text-[clamp(44px,9vw,84px)] font-bold leading-[0.95] tracking-[-0.045em] text-primary-text",
              )}
            >
              <span className="block">{adsLandingCopy.headingLineOne}</span>
              <span className="block text-aviation-blue">
                {adsLandingCopy.headingLineTwo}
              </span>
            </h1>

            <p
              className={cn(
                "ads-fade-in ads-fade-in-delay-2 mt-5 max-w-md text-[17px] leading-relaxed text-secondary-text",
              )}
            >
              {adsLandingCopy.sub}
            </p>

            <div
              className={cn(
                "ads-fade-in ads-fade-in-delay-3 mt-7 flex flex-col gap-4 sm:flex-row sm:items-center",
              )}
            >
              <CallPhoneButton
                size="lg"
                className="ads-call-pulse w-full rounded-[12px] bg-aviation-blue text-on-accent hover:bg-medium-blue sm:w-auto"
              />
              <div className="flex items-center gap-3">
                <Image
                  src={travelSuccess.src}
                  alt={travelSuccess.alt}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <p className="text-sm font-medium text-secondary-text">
                  Real specialist · {adsLandingCopy.trustHours}
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm font-medium text-primary-text">
              {adsLandingCopy.trustHours}
              <span className="px-2 text-border" aria-hidden="true">
                ·
              </span>
              {adsLandingCopy.trustCheckout}
              <span className="px-2 text-border" aria-hidden="true">
                ·
              </span>
              {adsLandingCopy.trustRegion}
            </p>
          </div>

          <div
            className={cn(
              "ads-fade-in ads-fade-in-delay-2 relative min-h-[420px] overflow-hidden rounded-[20px] md:min-h-[520px] lg:min-h-[640px]",
            )}
          >
            <div
              ref={mediaRef}
              className="absolute inset-0 origin-center will-change-transform"
            >
              <AdsPosterVideo
                poster={{
                  src: thoughtfulAirportVideo.poster,
                  alt: thoughtfulAirportVideo.alt,
                }}
                video={{
                  src: thoughtfulAirportVideo.src,
                  alt: thoughtfulAirportVideo.alt,
                }}
                className="absolute inset-0"
                imageSizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div
              className="ads-hero-media-overlay absolute inset-0"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90">
                {adsLandingCopy.spine}
              </p>
              <p className="mt-2 max-w-sm text-lg font-semibold text-white">
                Award-winning desk. Live fares. Tickets on the call.
              </p>
            </div>
          </div>
        </div>

        <div id="search" className="mt-10 scroll-mt-24 md:mt-12">
          <p className="mb-3 text-sm text-secondary-text">
            {adsLandingCopy.searchHint}
          </p>
          <Suspense fallback={<div className="ads-search-panel min-h-[88px]" />}>
            <AdsSearchPanel />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
