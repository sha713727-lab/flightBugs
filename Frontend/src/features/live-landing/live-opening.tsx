"use client";

import { useEffect, useRef } from "react";

import { CallPhoneButton } from "@/components/call-phone-button";
import { marketingImages } from "@/constants/brandAssets";
import { liveLandingCopy } from "@/constants/liveLandingContent";
import { gsap, ScrollTrigger } from "@/features/live-landing/live-gsap";

export function LiveOpening() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const lineOneRef = useRef<HTMLSpanElement>(null);
  const lineTwoRef = useRef<HTMLSpanElement>(null);
  const restRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    const lineOne = lineOneRef.current;
    const lineTwo = lineTwoRef.current;
    const rest = restRef.current;

    if (!section || !media || !lineOne || !lineTwo || !rest) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.fromTo(
        [lineOne, lineTwo],
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 },
      );
      intro.fromTo(
        rest,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.4",
      );

      const tween = gsap.fromTo(
        media,
        { scale: 1.1 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 56px",
            end: () => (window.innerWidth < 768 ? "+=45%" : "+=55%"),
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        },
      );

      return () => {
        intro.kill();
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => {
      mm.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  const { smartTravelerAircraftVideo, smartTravelerCabinVideo } = marketingImages;

  return (
    <section ref={sectionRef} className="relative bg-black">
      <div className="relative min-h-[calc(100svh-56px)] overflow-hidden">
        <div ref={mediaRef} className="absolute inset-0 origin-center will-change-transform">
          <video
            className="absolute inset-0 h-full w-full object-cover object-center md:hidden"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={smartTravelerCabinVideo.poster}
            aria-label={smartTravelerCabinVideo.alt}
          >
            <source src={smartTravelerCabinVideo.src} type="video/mp4" />
          </video>
          <video
            className="absolute inset-0 hidden h-full w-full object-cover object-center md:block"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={smartTravelerAircraftVideo.poster}
            aria-label={smartTravelerAircraftVideo.alt}
          >
            <source src={smartTravelerAircraftVideo.src} type="video/mp4" />
          </video>
        </div>
        <div className="live-opening-overlay absolute inset-0" aria-hidden="true" />

        <div className="relative z-10 flex min-h-[calc(100svh-56px)] flex-col justify-end pb-16 pt-20 md:justify-center md:pb-24">
          <div className="container-avion">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
              {liveLandingCopy.eyebrow}
            </p>
            <h1 className="mt-4 max-w-[16ch] text-[clamp(42px,8vw,88px)] font-bold leading-[0.98] tracking-[-0.045em] text-white">
              <span ref={lineOneRef} className="block">
                {liveLandingCopy.headingLineOne}
              </span>
              <span ref={lineTwoRef} className="block">
                {liveLandingCopy.headingLineTwo}
              </span>
            </h1>
            <div ref={restRef}>
              <p className="mt-5 max-w-md text-[15px] text-white/80">
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
