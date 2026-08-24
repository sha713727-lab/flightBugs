"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { CallPhoneButton } from "@/components/call-phone-button";
import { SitePageFooter } from "@/components/site-page-footer";
import { adsLandingCopy, adsLandingPath } from "@/constants/adsLandingContent";
import { marketingImages } from "@/constants/brandAssets";
import { PosterVideo } from "@/components/poster-video";
import { AdsReveal } from "@/features/ads-landing/ads-reveal";

export function AdsClose() {
  const mediaRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { dealsVideo } = marketingImages;

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    if (!section || !media) {
      return;
    }

    if (window.matchMedia("(max-width: 767px)").matches) {
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
        { scale: 1.12 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
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
    <>
      <section ref={sectionRef} className="relative overflow-hidden">
        <div className="relative min-h-[520px] md:min-h-[640px]">
          <div
            ref={mediaRef}
            className="absolute inset-0 origin-center will-change-transform"
          >
            <PosterVideo
              poster={{
                src: dealsVideo.poster,
                alt: dealsVideo.alt,
              }}
              video={{
                src: dealsVideo.src,
                alt: dealsVideo.alt,
              }}
              className="absolute inset-0"
              imageSizes="100vw"
            />
          </div>
          <div className="ads-close-overlay absolute inset-0" aria-hidden="true" />

          <div className="relative z-10 flex min-h-[520px] items-end pb-16 pt-24 md:min-h-[640px] md:pb-20">
            <div className="container-avion">
              <AdsReveal>
                <h2 className="max-w-2xl text-[clamp(36px,6vw,64px)] font-bold leading-[1.05] tracking-[-0.04em] text-white">
                  {adsLandingCopy.closeHeading}
                </h2>
                <p className="mt-5 max-w-lg text-[17px] text-white/90">
                  {adsLandingCopy.closeBody}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <CallPhoneButton
                    size="lg"
                    className="ads-call-pulse rounded-[12px] bg-aviation-blue text-on-accent hover:bg-medium-blue"
                  />
                  <Link
                    href={`${adsLandingPath}#search`}
                    className="inline-flex min-h-12 items-center justify-center rounded-[12px] border border-white/35 bg-white/10 px-6 text-[15px] font-semibold text-white backdrop-blur-sm hover:bg-white/20 sm:min-h-14"
                  >
                    {adsLandingCopy.searchCta}
                  </Link>
                </div>
              </AdsReveal>
            </div>
          </div>
        </div>
      </section>

      <SitePageFooter themeId="book" />
    </>
  );
}
