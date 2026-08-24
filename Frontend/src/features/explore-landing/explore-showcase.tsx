"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { CallPhoneButton } from "@/components/call-phone-button";
import { PartnersMarquee } from "@/components/partners-marquee";
import { SitePageFooter } from "@/components/site-page-footer";
import {
  exploreCompareSamples,
  exploreGallery,
  exploreLandingCopy,
} from "@/constants/exploreLandingContent";
import { supportPhone } from "@/constants/supportContact";
import { ExploreReveal } from "@/features/explore-landing/explore-reveal";
import { cn } from "@/utils/cn";

export function ExploreGallery() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) {
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
          grid.querySelectorAll("[data-gallery-item]"),
          { y: 40, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.07,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: grid,
              start: "top 80%",
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
    <section className="explore-section">
      <div className="explore-container">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--explore-primary)]">
          {exploreLandingCopy.galleryEyebrow}
        </p>
        <h2 className="mt-3 text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.03em] text-[var(--explore-text)]">
          {exploreLandingCopy.galleryHeading}
        </h2>

        <div
          ref={gridRef}
          className="mt-8 grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4"
        >
          {exploreGallery.map((item) => (
            <div
              key={item.id}
              data-gallery-item
              className={cn(
                "group relative overflow-hidden rounded-[20px]",
                item.span === "wide" && "col-span-2",
                item.span === "tall" && "row-span-2",
              )}
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
              <p className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold text-white md:text-base">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExploreCompare() {
  return (
    <section className="explore-section bg-[var(--explore-surface)]">
      <div className="explore-container">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--explore-primary)]">
          {exploreLandingCopy.compareEyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.03em] text-[var(--explore-text)]">
          {exploreLandingCopy.compareHeading}
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--explore-text-muted)]">
          {exploreLandingCopy.compareBody}
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {exploreCompareSamples.map((sample, index) => (
            <ExploreReveal key={sample.id} delay={Math.min(index * 0.08, 0.24)}>
              <article className="rounded-[20px] border border-[var(--explore-border)] bg-[var(--explore-bg)] p-5">
                <span
                  className={cn(
                    "inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em]",
                    sample.id === "best" &&
                      "bg-[var(--explore-primary-soft)] text-[var(--explore-primary)]",
                    sample.id === "cheap" &&
                      "bg-[var(--explore-teal-soft)] text-[var(--explore-teal)]",
                    sample.id === "fast" &&
                      "bg-[var(--explore-orange-soft)] text-[var(--explore-orange)]",
                  )}
                >
                  {sample.badge}
                </span>
                <p className="mt-4 text-sm font-medium text-[var(--explore-text-muted)]">
                  {sample.airline}
                </p>
                <div className="mt-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-2xl font-bold text-[var(--explore-text)]">
                      {sample.depart}
                    </p>
                    <p className="text-sm text-[var(--explore-text-muted)]">
                      {sample.from}
                    </p>
                  </div>
                  <div className="mb-2 flex-1 border-t border-dashed border-[var(--explore-border)]" />
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[var(--explore-text)]">
                      {sample.arrive}
                    </p>
                    <p className="text-sm text-[var(--explore-text-muted)]">
                      {sample.to}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-[var(--explore-text-muted)]">
                  {sample.duration} · {sample.stops} · {sample.bags}
                </p>
                <p className="mt-2 text-sm text-[var(--explore-text)]">
                  {sample.note}
                </p>
                <div className="mt-5 flex justify-end">
                  <a
                    href={supportPhone.href}
                    className="rounded-[12px] bg-[var(--explore-primary)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--explore-primary-hover)]"
                  >
                    Call to ticket
                  </a>
                </div>
              </article>
            </ExploreReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExploreAi() {
  return (
    <section id="ai" className="explore-section scroll-mt-24">
      <div className="explore-container grid items-center gap-10 lg:grid-cols-2">
        <ExploreReveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--explore-primary)]">
            {exploreLandingCopy.aiEyebrow}
          </p>
          <h2 className="mt-3 text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.03em] text-[var(--explore-text)]">
            {exploreLandingCopy.aiHeading}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--explore-text-muted)]">
            {exploreLandingCopy.aiBody}
          </p>
        </ExploreReveal>

        <ExploreReveal delay={0.08}>
          <div className="rounded-[24px] border border-[var(--explore-border)] bg-[var(--explore-surface)] p-6 shadow-[var(--explore-shadow-md)]">
            <CallPhoneButton
              size="lg"
              className="w-full rounded-[12px] bg-[var(--explore-primary)] text-white hover:bg-[var(--explore-primary-hover)]"
            />
          </div>
        </ExploreReveal>
      </div>
    </section>
  );
}

export function ExploreTrust() {
  return (
    <section
      id="cars"
      className="explore-section scroll-mt-24 bg-[var(--explore-surface)]"
    >
      <PartnersMarquee variant="explore" />
    </section>
  );
}

export function ExploreClose() {
  return (
    <>
      <section className="explore-section">
        <div className="explore-container">
          <ExploreReveal>
            <div className="overflow-hidden rounded-[28px] bg-[var(--explore-primary)] px-6 py-14 text-center text-white md:px-12">
              <h2 className="text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.03em]">
                {exploreLandingCopy.closeHeading}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] text-white/90">
                {exploreLandingCopy.closeBody}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#search"
                  className="inline-flex min-h-12 items-center justify-center rounded-[12px] bg-white px-6 text-[15px] font-bold text-[var(--explore-primary)]"
                >
                  {exploreLandingCopy.searchCta}
                </a>
                <CallPhoneButton
                  size="lg"
                  className="rounded-[12px] border border-white/40 bg-transparent text-white hover:bg-white/10"
                />
              </div>
            </div>
          </ExploreReveal>
        </div>
      </section>

      <SitePageFooter themeId="explore" />
    </>
  );
}
