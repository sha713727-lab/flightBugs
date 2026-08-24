"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { adsLandingCopy, adsLandingReasons } from "@/constants/adsLandingContent";
import { marketingImages } from "@/constants/brandAssets";
import { AdsReveal } from "@/features/ads-landing/ads-reveal";

export function AdsWhy() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { cabin, airportExperience } = marketingImages;

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) {
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
        image,
        { yPercent: -8 },
        {
          yPercent: 8,
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
    <section ref={sectionRef} className="overflow-hidden py-16 md:py-24">
      <div className="container-avion grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <AdsReveal>
          <h2 className="max-w-lg text-[clamp(36px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.04em] text-primary-text">
            {adsLandingCopy.whyHeading}
          </h2>
          <ul className="mt-10 space-y-8">
            {adsLandingReasons.map((reason) => (
              <li key={reason.title}>
                <h3 className="text-xl font-semibold text-primary-text">
                  {reason.title}
                </h3>
                <p className="mt-2 text-[16px] leading-relaxed text-secondary-text">
                  {reason.body}
                </p>
              </li>
            ))}
          </ul>
        </AdsReveal>

        <AdsReveal delay={0.12} className="grid gap-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]">
            <div ref={imageRef} className="absolute inset-[-12%] will-change-transform">
              <Image
                src={airportExperience.src}
                alt={airportExperience.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[24px]">
            <Image
              src={cabin.src}
              alt={cabin.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              className="object-cover"
            />
          </div>
        </AdsReveal>
      </div>
    </section>
  );
}
