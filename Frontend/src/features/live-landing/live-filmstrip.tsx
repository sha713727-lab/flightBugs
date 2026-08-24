"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import {
  liveLandingCities,
  liveLandingCopy,
  liveLandingPath,
} from "@/constants/liveLandingContent";
import { gsap } from "@/features/live-landing/live-gsap";

export function LiveFilmstrip() {
  const frameRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const track = trackRef.current;
    if (!frame || !track) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
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

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => {
      mm.revert();
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
                sizes="100vw"
                className="object-cover"
                priority={index === 0}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-14">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(liveLandingCities.length).padStart(2, "0")}
                </p>
                <h2 className="mt-3 text-[clamp(36px,12vw,80px)] font-bold leading-[0.95] tracking-[-0.04em] text-white">
                  {city.name}
                </h2>
                <p className="mt-3 text-[15px] text-white/80">{city.line}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
