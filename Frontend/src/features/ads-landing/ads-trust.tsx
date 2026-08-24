"use client";

import { PartnersMarquee } from "@/components/partners-marquee";
import { AdsReveal } from "@/features/ads-landing/ads-reveal";

export function AdsTrust() {
  return (
    <section className="border-y border-border bg-[var(--search-panel-bg)] py-12 md:py-16">
      <AdsReveal>
        <PartnersMarquee variant="ads" />
      </AdsReveal>
    </section>
  );
}
