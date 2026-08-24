"use client";

import { CallPhoneButton } from "@/components/call-phone-button";
import {
  aboutPageContent,
  type LandingThemeId,
  landingThemes,
} from "@/constants/sitePages";
import { SitePageMotion } from "@/features/site-pages/site-page-motion";

type Props = { readonly themeId: LandingThemeId };

export function AboutExploreView({ themeId }: Props) {
  const theme = landingThemes[themeId];

  return (
    <div className="bg-[var(--explore-bg,#f7f7f9)] text-[var(--explore-text,#17171c)]">
      <section className="overflow-hidden">
        <SitePageMotion
          mode="stagger"
          className={`${theme.containerClassName} py-16 md:py-24`}
        >
          <p
            data-reveal
            className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--explore-primary,#5b2eff)]"
          >
            {theme.aboutEyebrow}
          </p>
          <h1
            data-reveal
            className="mt-4 max-w-4xl text-[clamp(36px,6vw,64px)] font-bold leading-[1.02] tracking-[-0.04em]"
          >
            {theme.aboutHeading}
          </h1>
          <p
            data-reveal
            className="mt-5 max-w-2xl text-[16px] leading-relaxed text-[var(--explore-text-muted,#666670)]"
          >
            {theme.aboutLead}
          </p>
        </SitePageMotion>
      </section>

      <SitePageMotion mode="scale" className={`${theme.containerClassName} pb-16 md:pb-24`}>
        <div className="grid gap-4 md:grid-cols-2">
          <article
            data-reveal
            className="rounded-[28px] bg-[var(--explore-primary,#5b2eff)] p-8 text-white md:row-span-2 md:min-h-[360px]"
          >
            <h2 className="text-3xl font-bold tracking-[-0.02em]">
              {aboutPageContent.missionHeading}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/85">
              {aboutPageContent.missionBody}
            </p>
            <div className="mt-10">
              <CallPhoneButton
                size="lg"
                className="rounded-full !bg-white !text-[#5b2eff] hover:!bg-white/90 hover:!text-[#5b2eff]"
              />
            </div>
          </article>

          {aboutPageContent.values.map((item) => (
            <article
              key={item.title}
              data-reveal
              className="rounded-[28px] border border-[var(--explore-border,#e4e4e8)] bg-white p-6 shadow-[0_8px_30px_rgba(91,46,255,0.06)]"
            >
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--explore-text-muted,#666670)]">
                {item.body}
              </p>
            </article>
          ))}
        </div>

        <p
          data-reveal
          className="mt-10 text-center text-sm text-[var(--explore-text-muted,#666670)]"
        >
          {aboutPageContent.regionsBody}
        </p>
      </SitePageMotion>
    </div>
  );
}
