"use client";

import { CallPhoneButton } from "@/components/call-phone-button";
import {
  aboutPageContent,
  type LandingThemeId,
  landingThemes,
} from "@/constants/sitePages";
import { SitePageMotion } from "@/features/site-pages/site-page-motion";

type Props = { readonly themeId: LandingThemeId };

export function AboutHomeView({ themeId }: Props) {
  const theme = landingThemes[themeId];

  return (
    <div className="bg-[#0a0a0a] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(245,196,0,0.25), transparent 55%)",
          }}
          aria-hidden
        />
        <SitePageMotion mode="rise" className={`${theme.containerClassName} relative py-20 md:py-28`}>
          <p data-reveal className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#f5c400]">
            {theme.aboutEyebrow}
          </p>
          <h1
            data-reveal
            className="mt-4 max-w-4xl text-[clamp(40px,7vw,72px)] font-bold leading-[0.98] tracking-[-0.04em]"
          >
            {theme.aboutHeading}
          </h1>
          <p data-reveal className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/65">
            {theme.aboutLead}
          </p>
        </SitePageMotion>
      </section>

      <SitePageMotion mode="stagger" className={`${theme.containerClassName} py-16 md:py-24`}>
        <div data-reveal className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.03em]">
              {aboutPageContent.missionHeading}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/65">
              {aboutPageContent.missionBody}
            </p>
          </div>
          <div className="rounded-[24px] border border-[#f5c400]/30 bg-[#f5c400]/10 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f5c400]">
              {aboutPageContent.regionsHeading}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-white/80">
              {aboutPageContent.regionsBody}
            </p>
          </div>
        </div>

        <h2 data-reveal className="mt-16 text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.03em]">
          {aboutPageContent.valuesHeading}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {aboutPageContent.values.map((item, index) => (
            <article
              key={item.title}
              data-reveal
              className="rounded-[20px] border border-white/10 bg-white/[0.04] p-6"
            >
              <span className="text-[12px] font-bold text-[#f5c400]">0{index + 1}</span>
              <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{item.body}</p>
            </article>
          ))}
        </div>

        <div data-reveal className="mt-14">
          <CallPhoneButton
            size="lg"
            className="rounded-full bg-[#f5c400] text-[#4a4a4a] hover:bg-[#e0b200] hover:text-[#4a4a4a]"
          />
        </div>
      </SitePageMotion>
    </div>
  );
}
