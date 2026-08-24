"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import {
  liveLandingCities,
  liveLandingCopy,
  liveLandingPath,
} from "@/constants/liveLandingContent";

export function LiveFilmstrip() {
  const frameRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const track = trackRef.current;

    if (!frame || !track) {
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

    void import("@/features/live-landing/live-gsap").then(({ gsap }) => {
      if (cancelled) {
        return;
      }

      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - frame.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: frame,
          start: "top 56px",
          end: () =>
            `+=${Math.max(track.scrollWidth - frame.clientWidth, frame.clientWidth)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

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
    <section aria-label={liveLandingCopy.filmstripEyebrow} className="bg-black">
      <div
        ref={frameRef}
        className="live-filmstrip-frame h-[calc(100svh-56px)]"
      >
        <div ref={trackRef} className="flex h-full will-change-transform">
          {liveLandingCities.map((city, index) => (
            <Link
              key={city.id}
              href={`${liveLandingPath}?to=${city.place.iata}#desk`}
              className="live-filmstrip-slide relative block h-full"
            >
              <Image
                src={city.image.src}
                alt={city.image.alt}
                fill
                loading="lazy"
                sizes="100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-14">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(liveLandingCities.length).padStart(2, "0")}
                </p>
                <h2 className="mt-3 text-[clamp(36px,12vw,80px)] font-bold leading-[0.95] tracking-[-0.04em] text-white">
                  {city.name}
                </h2>
                <p className="mt-3 text-[15px] text-white/90">{city.line}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
