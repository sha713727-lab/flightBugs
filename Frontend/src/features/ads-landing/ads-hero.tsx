"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Suspense, useEffect, useRef } from "react";

import { CallPhoneButton } from "@/components/call-phone-button";
import { adsLandingCopy } from "@/constants/adsLandingContent";
import { marketingImages } from "@/constants/brandAssets";
import { gsap } from "@/features/ads-landing/ads-gsap";
import { AdsSearchPanel } from "@/features/ads-landing/ads-search-panel";

export function AdsHero() {
  const mediaRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { thoughtfulAirportVideo, travelSuccess } = marketingImages;

  useEffect(() => {
    const media = mediaRef.current;
    if (!media || reduced) {
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

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced]);

  return (
    <section className="pb-10 pt-4 md:pb-14 md:pt-6">
      <div className="container-avion">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
          <div>
            <motion.p
              className="text-[11px] font-semibold uppercase tracking-[0.16em] text-aviation-blue"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              {adsLandingCopy.eyebrow}
            </motion.p>

            <motion.h1
              className="mt-4 max-w-[12ch] text-[clamp(44px,9vw,84px)] font-bold leading-[0.95] tracking-[-0.045em] text-primary-text"
              initial={reduced ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="block">{adsLandingCopy.headingLineOne}</span>
              <span className="block text-aviation-blue">
                {adsLandingCopy.headingLineTwo}
              </span>
            </motion.h1>

            <motion.p
              className="mt-5 max-w-md text-[17px] leading-relaxed text-secondary-text"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
            >
              {adsLandingCopy.sub}
            </motion.p>

            <motion.div
              className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26 }}
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
            </motion.div>

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

          <motion.div
            className="relative min-h-[420px] overflow-hidden rounded-[20px] md:min-h-[520px] lg:min-h-[640px]"
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              ref={mediaRef}
              className="absolute inset-0 origin-center will-change-transform"
            >
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={thoughtfulAirportVideo.poster}
                aria-label={thoughtfulAirportVideo.alt}
              >
                <source src={thoughtfulAirportVideo.src} type="video/mp4" />
              </video>
            </div>
            <div
              className="ads-hero-media-overlay absolute inset-0"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">
                {adsLandingCopy.spine}
              </p>
              <p className="mt-2 max-w-sm text-lg font-semibold text-white">
                Award-winning desk. Live fares. Tickets on the call.
              </p>
            </div>
          </motion.div>
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
