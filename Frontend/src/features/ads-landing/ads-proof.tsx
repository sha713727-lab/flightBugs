"use client";

import Image from "next/image";

import { adsLandingCopy, adsLandingProof } from "@/constants/adsLandingContent";
import { AdsReveal } from "@/features/ads-landing/ads-reveal";

export function AdsProof() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-avion">
        <AdsReveal>
          <h2 className="text-[clamp(36px,5vw,56px)] font-bold tracking-[-0.04em] text-primary-text">
            {adsLandingCopy.proofHeading}
          </h2>
        </AdsReveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {adsLandingProof.map((item, index) => (
            <AdsReveal key={item.id} delay={index * 0.08}>
              <figure className="flex h-full flex-col rounded-[24px] border border-border bg-[var(--search-panel-bg)] p-7 md:p-9">
                <blockquote className="text-[clamp(20px,2.4vw,28px)] font-medium leading-[1.35] tracking-[-0.02em] text-primary-text">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <Image
                    src={item.imageSrc}
                    alt=""
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-base font-semibold text-primary-text">
                      {item.name}
                    </p>
                    <p className="text-sm text-secondary-text">
                      {item.role} · {item.routeCode}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </AdsReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
