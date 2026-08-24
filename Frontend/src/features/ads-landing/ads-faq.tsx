"use client";

import { useId, useState } from "react";

import { adsLandingCopy, adsLandingFaq } from "@/constants/adsLandingContent";
import { AdsReveal } from "@/features/ads-landing/ads-reveal";
import { cn } from "@/utils/cn";

export function AdsFaq() {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(
    adsLandingFaq[0]?.id ?? null,
  );

  return (
    <section className="py-16 md:py-24">
      <div className="container-avion">
        <AdsReveal>
          <h2 className="text-[clamp(36px,5vw,56px)] font-bold tracking-[-0.04em] text-primary-text">
            {adsLandingCopy.faqHeading}
          </h2>
        </AdsReveal>
        <AdsReveal delay={0.08} className="mt-10 border-t border-border">
          {adsLandingFaq.map((item) => {
            const open = openId === item.id;
            const panelId = `${baseId}-${item.id}-panel`;
            const buttonId = `${baseId}-${item.id}-button`;

            return (
              <div key={item.id} className="border-b border-border">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenId(open ? null : item.id)}
                  className="flex min-h-16 w-full items-center gap-4 py-6 text-left"
                >
                  <span className="flex-1 text-[18px] font-semibold text-primary-text md:text-[20px]">
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-3xl font-light leading-none text-secondary-text"
                  >
                    {open ? "−" : "+"}
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={cn(
                    "overflow-hidden [transition:max-height_250ms_ease,opacity_250ms_ease]",
                    open ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  <p className="pb-6 pr-10 text-[16px] leading-relaxed text-secondary-text">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </AdsReveal>
      </div>
    </section>
  );
}
