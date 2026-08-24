"use client";

import { CallPhoneButton } from "@/components/call-phone-button";
import {
  aboutPageContent,
  type LandingThemeId,
  landingThemes,
} from "@/constants/sitePages";
import { SitePageMotion } from "@/features/site-pages/site-page-motion";

type Props = { readonly themeId: LandingThemeId };

export function AboutEuropeView({ themeId }: Props) {
  const theme = landingThemes[themeId];

  return (
    <div className="bg-white text-primary-text">
      <section className="border-b border-border bg-[#f5f7fa]">
        <SitePageMotion
          mode="slide"
          className={`${theme.containerClassName} grid gap-10 py-16 md:grid-cols-12 md:py-24`}
        >
          <div data-reveal className="md:col-span-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0b3a73]">
              {theme.aboutEyebrow}
            </p>
            <div className="mt-6 h-1 w-16 bg-[#0b3a73]" aria-hidden />
          </div>
          <div data-reveal className="md:col-span-8">
            <h1 className="max-w-3xl text-[clamp(36px,5vw,58px)] font-bold leading-[1.05] tracking-[-0.035em] text-[#0b3a73]">
              {theme.aboutHeading}
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-secondary-text">
              {theme.aboutLead}
            </p>
          </div>
        </SitePageMotion>
      </section>

      <SitePageMotion mode="stagger" className={`${theme.containerClassName} py-16 md:py-24`}>
        <article
          data-reveal
          className="border-l-4 border-[#0b3a73] bg-[#f5f7fa] py-8 pl-8 pr-6 md:pl-12"
        >
          <h2 className="text-3xl font-bold tracking-[-0.02em]">{aboutPageContent.missionHeading}</h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-secondary-text">
            {aboutPageContent.missionBody}
          </p>
        </article>

        <div className="mt-16 grid gap-0 md:grid-cols-3">
          {aboutPageContent.values.map((item) => (
            <article
              key={item.title}
              data-reveal
              className="border-t border-border px-0 py-8 md:border-l md:border-t-0 md:px-8 md:first:border-l-0 md:first:pl-0"
            >
              <h3 className="text-xl font-bold text-[#0b3a73]">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary-text">{item.body}</p>
            </article>
          ))}
        </div>

        <div data-reveal className="mt-16 flex flex-col gap-6 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">{aboutPageContent.regionsHeading}</h2>
            <p className="mt-2 max-w-xl text-sm text-secondary-text">{aboutPageContent.regionsBody}</p>
          </div>
          <CallPhoneButton
            size="lg"
            className="rounded-[12px] bg-[#0b3a73] text-white hover:bg-[#1e5a9f]"
          />
        </div>
      </SitePageMotion>
    </div>
  );
}
