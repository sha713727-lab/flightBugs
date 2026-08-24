"use client";

import { useEffect, useRef } from "react";

import { CallPhoneButton } from "@/components/call-phone-button";
import { PosterVideo } from "@/components/poster-video";
import { marketingImages } from "@/constants/brandAssets";
import { liveLandingCopy } from "@/constants/liveLandingContent";
import { cn } from "@/utils/cn";

export function LiveOpening() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const { smartTravelerAircraftVideo, smartTravelerCabinVideo } = marketingImages;

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

    void import("@/features/live-landing/live-gsap").then(({ gsap, ScrollTrigger }) => {
      if (cancelled) {
        return;
      }

      const lineOne = section.querySelector("[data-live-line-one]");
      const lineTwo = section.querySelector("[data-live-line-two]");
      const rest = section.querySelector("[data-live-rest]");

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (lineOne && lineTwo) {
        intro.fromTo(
          [lineOne, lineTwo],
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 },
        );
      }

      if (rest) {
        intro.fromTo(
          rest,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.4",
        );
      }

      const tween = gsap.fromTo(
        media,
        { scale: 1.1 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 56px",
            end: "+=55%",
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        },
      );

      dispose = () => {
        intro.kill();
        tween.scrollTrigger?.kill();
        tween.kill();
        ScrollTrigger.refresh();
      };
    });

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black">
      <div className="relative min-h-[calc(100svh-56px)] overflow-hidden">
        <div
          ref={mediaRef}
          className="absolute inset-0 origin-center will-change-transform md:will-change-transform"
        >
          <PosterVideo
            poster={{
              src: smartTravelerCabinVideo.poster,
              alt: smartTravelerCabinVideo.alt,
            }}
            video={{
              src: smartTravelerAircraftVideo.src,
              alt: smartTravelerAircraftVideo.alt,
            }}
            className="absolute inset-0"
            imageSizes="100vw"
            priority
          />
        </div>
        <div className="live-opening-overlay absolute inset-0" aria-hidden="true" />

        <div className="relative z-10 flex min-h-[calc(100svh-56px)] flex-col justify-end pb-16 pt-20 md:justify-center md:pb-24">
          <div className="container-avion">
            <p
              className={cn(
                "live-fade-in text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90",
              )}
            >
              {liveLandingCopy.eyebrow}
            </p>
            <h1 className="mt-4 max-w-[16ch] text-[clamp(42px,8vw,88px)] font-bold leading-[0.98] tracking-[-0.045em] text-white">
              <span
                data-live-line-one
                className={cn("live-fade-in live-fade-in-delay-1 block")}
              >
                {liveLandingCopy.headingLineOne}
              </span>
              <span
                data-live-line-two
                className={cn("live-fade-in live-fade-in-delay-2 block")}
              >
                {liveLandingCopy.headingLineTwo}
              </span>
            </h1>
            <div data-live-rest className={cn("live-fade-in live-fade-in-delay-3")}>
              <p className="mt-5 max-w-md text-[15px] text-white/90">
                {liveLandingCopy.availability}
              </p>
              <CallPhoneButton
                size="lg"
                className="mt-8 rounded-[12px] bg-aviation-blue text-on-accent hover:bg-medium-blue"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
