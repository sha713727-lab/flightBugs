"use client";

import { adsLandingCopy, adsLandingSteps } from "@/constants/adsLandingContent";
import { AdsReveal } from "@/features/ads-landing/ads-reveal";

export function AdsSteps() {
  return (
    <section className="border-y border-border bg-[var(--search-panel-bg)] py-16 md:py-24">
      <div className="container-avion">
        <AdsReveal>
          <h2 className="text-[clamp(36px,5vw,56px)] font-bold tracking-[-0.04em] text-primary-text">
            {adsLandingCopy.stepsHeading}
          </h2>
        </AdsReveal>
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {adsLandingSteps.map((step, index) => (
            <li key={step.index}>
              <AdsReveal delay={index * 0.1}>
                <p className="text-[clamp(48px,8vw,72px)] font-bold leading-none tracking-[-0.05em] text-aviation-blue/25">
                  0{step.index}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-primary-text">
                  {step.title}
                </h3>
                <p className="mt-3 text-[16px] leading-relaxed text-secondary-text">
                  {step.body}
                </p>
              </AdsReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
