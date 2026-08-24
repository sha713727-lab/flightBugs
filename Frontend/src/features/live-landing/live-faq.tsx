"use client";

import { useId, useState } from "react";

import { liveLandingCopy, liveLandingFaq } from "@/constants/liveLandingContent";
import { cn } from "@/utils/cn";

export function LiveFaq() {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(
    liveLandingFaq[0]?.id ?? null,
  );

  return (
    <section id="faq" className="scroll-mt-20 border-t border-border bg-white py-20 md:py-28">
      <div className="container-avion">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-aviation-blue">
          FAQ
        </p>
        <h2 className="mt-4 max-w-xl text-[clamp(32px,5vw,48px)] font-bold tracking-[-0.03em] text-primary-text">
          {liveLandingCopy.faqHeading}
        </h2>

        <div className="mt-10 border-t border-border">
          {liveLandingFaq.map((item) => {
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
                  className="flex min-h-14 w-full items-center gap-4 py-6 text-left"
                >
                  <span className="flex-1 text-lg font-semibold text-primary-text">
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-2xl font-light leading-none text-aviation-blue"
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
                  <p className="pb-6 pr-10 text-[15px] leading-relaxed text-secondary-text">
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
