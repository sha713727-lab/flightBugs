"use client";

import { useId, useState } from "react";

import {
  faqItems,
  homeAvailabilityLine,
  homeValueLine,
} from "@/constants/homeContent";
import { cn } from "@/utils/cn";

export function FaqSection() {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section id="faq" className="section-padding scroll-mt-28 bg-main-bg">
      <div className="container-avion">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-section-heading">Frequently asked questions</h2>
          <p className="text-body-muted mt-4">
            {homeValueLine} {homeAvailabilityLine}.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-[var(--radius-card)] border border-border bg-soft-section px-4 sm:px-6">
          {faqItems.map((item) => {
            const open = openId === item.id;
            const panelId = `${baseId}-${item.id}-panel`;
            const buttonId = `${baseId}-${item.id}-button`;

            return (
              <div key={item.id} className="border-b border-border last:border-b-0">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenId(open ? null : item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 py-5 text-left transition-colors",
                    "text-primary-text hover:text-aviation-blue",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aviation-blue",
                  )}
                >
                  <span className="flex-1 text-[15px] font-semibold">
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "text-lg leading-none text-aviation-blue transition-transform duration-300",
                      open && "rotate-180",
                    )}
                  >
                    ⌄
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={cn(
                    "overflow-hidden [transition:max-height_.35s_ease,opacity_.25s_ease]",
                    open ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  <p className="pb-5 pr-2 text-[15px] leading-relaxed text-secondary-text">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
