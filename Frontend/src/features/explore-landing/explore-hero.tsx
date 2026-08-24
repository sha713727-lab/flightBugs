import dynamic from "next/dynamic";
import { Suspense } from "react";

import { exploreLandingCopy } from "@/constants/exploreLandingContent";
import { cn } from "@/utils/cn";

const ExploreSearchPanel = dynamic(
  () =>
    import("@/features/explore-landing/explore-search-panel").then((module) => ({
      default: module.ExploreSearchPanel,
    })),
  {
    loading: () => (
      <div className="explore-search-panel min-h-[220px] animate-pulse rounded-[16px] border border-[var(--explore-border)] bg-[var(--explore-surface)]" />
    ),
  },
);

export function ExploreHero() {
  return (
    <section className="explore-hero relative overflow-hidden pb-10 pt-10 md:pb-14 md:pt-14">
      <div className="explore-hero-glow" aria-hidden="true" />
      <div className="explore-container relative z-10">
        <p
          className={cn(
            "explore-fade-in text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--explore-primary)]",
          )}
        >
          {exploreLandingCopy.heroEyebrow}
        </p>

        <h1
          className={cn(
            "explore-fade-in explore-fade-in-delay-1 mx-auto mt-4 max-w-3xl text-center text-[clamp(36px,6vw,64px)] font-bold leading-[1.05] tracking-[-0.04em] text-[var(--explore-text)]",
          )}
        >
          {exploreLandingCopy.heroHeading}
        </h1>

        <p
          className={cn(
            "explore-fade-in explore-fade-in-delay-2 mx-auto mt-5 max-w-xl text-center text-[16px] leading-relaxed text-[var(--explore-text-muted)] md:text-[18px]",
          )}
        >
          {exploreLandingCopy.heroBody}
        </p>

        <div
          id="search"
          className={cn(
            "explore-fade-in explore-fade-in-delay-3 mx-auto mt-8 max-w-4xl scroll-mt-28",
          )}
        >
          <Suspense
            fallback={
              <div className="explore-search-panel min-h-[220px] animate-pulse rounded-[16px] border border-[var(--explore-border)] bg-[var(--explore-surface)]" />
            }
          >
            <ExploreSearchPanel />
          </Suspense>
        </div>

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
