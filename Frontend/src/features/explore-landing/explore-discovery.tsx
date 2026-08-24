"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import {
  exploreCheapFlights,
  exploreLandingCopy,
  exploreLandingPath,
  exploreMoods,
  exploreRoutes,
  exploreTrending,
} from "@/constants/exploreLandingContent";
import { ExploreReveal } from "@/features/explore-landing/explore-reveal";

export function ExploreTrending() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (window.matchMedia("(max-width: 767px)").matches) {
      return;
    }

    let cancelled = false;
    let dispose: (() => void) | undefined;

    void import("@/features/explore-landing/explore-gsap").then(
      ({ gsap, ScrollTrigger }) => {
        if (cancelled) {
          return;
        }

        const tween = gsap.fromTo(
          track.querySelectorAll("[data-card]"),
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: track,
              start: "top 85%",
            },
          },
        );

        dispose = () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          ScrollTrigger.refresh();
        };
      },
    );

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <section id="explore" className="explore-section scroll-mt-24">
      <div className="explore-container">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--explore-primary)]">
          {exploreLandingCopy.trendingEyebrow}
        </p>
        <h2 className="mt-3 text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.03em] text-[var(--explore-text)]">
          {exploreLandingCopy.trendingHeading}
        </h2>

        <div
          ref={trackRef}
          className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible"
        >
          {exploreTrending.map((item) => (
            <Link
              key={item.id}
              href={`${exploreLandingPath}?to=${item.place.iata}#search`}
              data-card
              className="group relative min-w-[240px] snap-start overflow-hidden rounded-[20px] md:min-w-0"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 70vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-xl font-bold text-white">{item.name}</h3>
                  <p className="mt-1 text-sm text-white/90">{item.fromPrice}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExploreMoods() {
  return (
    <section
      id="stays"
      className="explore-section scroll-mt-24 bg-[var(--explore-surface)]"
    >
      <div className="explore-container">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--explore-primary)]">
          {exploreLandingCopy.moodEyebrow}
        </p>
        <h2 className="mt-3 text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.03em] text-[var(--explore-text)]">
          {exploreLandingCopy.moodHeading}
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exploreMoods.map((mood, index) => (
            <ExploreReveal key={mood.id} delay={Math.min(index * 0.05, 0.25)}>
              <a
                href={`${exploreLandingPath}#search`}
                className="group relative block min-h-[200px] overflow-hidden rounded-[20px]"
              >
                <Image
                  src={mood.image.src}
                  alt={mood.image.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/45" />
                <h3 className="absolute inset-x-0 bottom-0 p-5 text-xl font-bold text-white">
                  {mood.title}
                </h3>
              </a>
            </ExploreReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExplorePrices() {
  return (
    <section className="explore-section">
      <div className="explore-container">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--explore-primary)]">
          {exploreLandingCopy.priceEyebrow}
        </p>
        <h2 className="mt-3 text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.03em] text-[var(--explore-text)]">
          {exploreLandingCopy.priceHeading}
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exploreCheapFlights.map((item, index) => (
            <ExploreReveal key={item.code} delay={Math.min(index * 0.04, 0.2)}>
              <Link
                href={`${exploreLandingPath}?to=${item.code}#search`}
                className="group flex overflow-hidden rounded-[16px] border border-[var(--explore-border)] bg-[var(--explore-surface)] transition-all hover:-translate-y-0.5 hover:border-[var(--explore-primary)] hover:shadow-[var(--explore-shadow-md)]"
              >
                <div className="relative h-[88px] w-[96px] shrink-0 sm:h-[104px] sm:w-[112px]">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    loading="lazy"
                    sizes="112px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-3 sm:px-5">
                  <p className="text-lg font-semibold text-[var(--explore-text)]">
                    {item.city}
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--explore-text-muted)]">
                    {item.code}
                  </p>
                </div>
              </Link>
            </ExploreReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExploreRoutes() {
  return (
    <section
      id="packages"
      className="explore-section scroll-mt-24 bg-[var(--explore-surface)]"
    >
      <div className="explore-container">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--explore-primary)]">
          {exploreLandingCopy.routesEyebrow}
        </p>
        <h2 className="mt-3 text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.03em] text-[var(--explore-text)]">
          {exploreLandingCopy.routesHeading}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {exploreRoutes.map((route) => (
            <Link
              key={route.id}
              href={`${exploreLandingPath}?to=${route.toCode}#search`}
              className="rounded-[20px] border border-[var(--explore-border)] bg-[var(--explore-bg)] p-6 transition-all hover:-translate-y-0.5 hover:shadow-[var(--explore-shadow-md)]"
            >
              <p className="text-xl font-bold tracking-[-0.02em] text-[var(--explore-text)]">
                {route.from}{" "}
                <span className="text-[var(--explore-primary)]">→</span>{" "}
                {route.to}
              </p>
              <p className="mt-2 text-sm text-[var(--explore-text-muted)]">
                {route.fromCode} – {route.toCode} · {route.duration}
              </p>
              <div className="mt-5 flex justify-end">
                <span className="text-sm font-semibold text-[var(--explore-text)]">
                  Search →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
