"use client";

import { useEffect, useRef, useState } from "react";

import { liveLandingCopy, liveLandingRitual } from "@/constants/liveLandingContent";
import { gsap, ScrollTrigger } from "@/features/live-landing/live-gsap";

export function LiveRitual() {
  const pinRef = useRef<HTMLDivElement>(null);
  const fillXRef = useRef<HTMLDivElement>(null);
  const fillYRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const pin = pinRef.current;
    const fillX = fillXRef.current;
    const fillY = fillYRef.current;
    if (!pin || !fillX || !fillY) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const trigger = ScrollTrigger.create({
        trigger: pin,
        start: "top 56px",
        end: () => (window.innerWidth < 768 ? "+=180%" : "+=220%"),
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(fillX, { scaleX: self.progress });
          gsap.set(fillY, { scaleY: self.progress });
          const next = Math.min(
            liveLandingRitual.length - 1,
            Math.floor(self.progress * liveLandingRitual.length),
          );
          setActive((current) => (current === next ? current : next));
        },
      });

      return () => {
        trigger.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  const current = liveLandingRitual[active] ?? liveLandingRitual[0];

  return (
    <section className="bg-white">
      <div className="live-ritual-stack">
        <div className="container-avion py-20 md:py-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-aviation-blue">
            {liveLandingCopy.ritualEyebrow}
          </p>
          <ol className="mt-10 space-y-10">
            {liveLandingRitual.map((step) => (
              <li key={step.index} className="border-l-2 border-aviation-blue pl-5">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-secondary-text">
                  {step.index} / 03
                </p>
                <h2 className="mt-2 text-[clamp(32px,5vw,48px)] font-bold tracking-[-0.03em] text-primary-text">
                  {step.title}
                </h2>
                <p className="mt-3 text-[15px] text-secondary-text">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div ref={pinRef} className="live-ritual-pin">
        <div className="container-avion flex min-h-[calc(100svh-56px)] flex-col justify-center gap-8 py-12 md:grid md:grid-cols-[auto_minmax(0,1fr)_12px] md:items-center md:gap-10 md:py-16">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-secondary-text">
            {current.index} / 03
          </p>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-aviation-blue">
              {liveLandingCopy.ritualEyebrow}
            </p>
            <h2 className="mt-3 max-w-xl text-[clamp(40px,10vw,84px)] font-bold leading-[0.98] tracking-[-0.045em] text-primary-text">
              {current.title}
            </h2>
            <p className="mt-5 max-w-md text-base text-secondary-text md:mt-6 md:text-lg">
              {current.body}
            </p>
          </div>
          <div className="h-0.5 w-full overflow-hidden bg-border md:hidden" aria-hidden="true">
            <div
              ref={fillXRef}
              className="h-full origin-left scale-x-0 bg-aviation-blue"
            />
          </div>
          <div
            className="relative hidden h-[min(58vh,420px)] w-0.5 self-center overflow-hidden bg-border md:block"
            aria-hidden="true"
          >
            <div
              ref={fillYRef}
              className="absolute inset-0 origin-top scale-y-0 bg-aviation-blue"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
