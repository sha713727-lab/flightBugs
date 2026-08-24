"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Suspense } from "react";

import { exploreLandingCopy } from "@/constants/exploreLandingContent";
import { ExploreSearchPanel } from "@/features/explore-landing/explore-search-panel";

export function ExploreHero() {
  const reduced = useReducedMotion();

  return (
    <section className="explore-hero relative overflow-hidden pb-10 pt-10 md:pb-14 md:pt-14">
      <div className="explore-hero-glow" aria-hidden="true" />
      <div className="explore-container relative z-10">
        <motion.p
          className="text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--explore-primary)]"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          {exploreLandingCopy.heroEyebrow}
        </motion.p>

        <motion.h1
          className="mx-auto mt-4 max-w-3xl text-center text-[clamp(36px,6vw,64px)] font-bold leading-[1.05] tracking-[-0.04em] text-[var(--explore-text)]"
          initial={reduced ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          {exploreLandingCopy.heroHeading}
        </motion.h1>

        <motion.p
          className="mx-auto mt-5 max-w-xl text-center text-[16px] leading-relaxed text-[var(--explore-text-muted)] md:text-[18px]"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.14 }}
        >
          {exploreLandingCopy.heroBody}
        </motion.p>

        <motion.div
          id="search"
          className="mx-auto mt-8 max-w-4xl scroll-mt-28"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Suspense
            fallback={
              <div className="explore-search-panel min-h-[220px] animate-pulse" />
            }
          >
            <ExploreSearchPanel />
          </Suspense>
        </motion.div>

        <ul className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-[var(--explore-text-muted)]">
          <li>{exploreLandingCopy.trustCompare}</li>
          <li aria-hidden="true">·</li>
          <li>{exploreLandingCopy.trustFees}</li>
          <li aria-hidden="true">·</li>
          <li>{exploreLandingCopy.trustChoose}</li>
        </ul>
      </div>
    </section>
  );
}
