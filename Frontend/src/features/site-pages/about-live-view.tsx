"use client";

import { CallPhoneButton } from "@/components/call-phone-button";
import {
  aboutPageContent,
  type LandingThemeId,
  landingThemes,
} from "@/constants/sitePages";
import { SitePageMotion } from "@/features/site-pages/site-page-motion";

type Props = { readonly themeId: LandingThemeId };

export function AboutLiveView({ themeId }: Props) {
  const theme = landingThemes[themeId];

  return (
    <div className="bg-white text-primary-text">
      <section className="border-b border-[#c8102e]/20 bg-[#111111] text-white">
        <SitePageMotion mode="scale" className={`${theme.containerClassName} py-16 md:py-24`}>
          <div data-reveal className="inline-flex items-center gap-2 rounded-full border border-[#c8102e]/40 bg-[#c8102e]/15 px-3 py-1.5">
            <span className="size-2 animate-pulse rounded-full bg-[#c8102e]" aria-hidden />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff6b81]">
              {theme.aboutEyebrow}
            </span>
          </div>
          <h1
            data-reveal
            className="mt-8 max-w-5xl text-[clamp(48px,9vw,96px)] font-bold leading-[0.92] tracking-[-0.05em]"
          >
            {theme.aboutHeading}
          </h1>
          <p data-reveal className="mt-6 max-w-2xl text-[18px] leading-relaxed text-white/70">
            {theme.aboutLead}
          </p>
        </SitePageMotion>
      </section>

      <SitePageMotion mode="rise" className={`${theme.containerClassName} py-14 md:py-20`}>
        <div data-reveal className="rounded-[4px] border-2 border-[#c8102e] bg-[#fff5f6] p-8 md:p-10">
          <h2 className="text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.03em] text-[#c8102e]">
            {aboutPageContent.missionHeading}
          </h2>
          <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-primary-text">
            {aboutPageContent.missionBody}
          </p>
        </div>

        <ol className="mt-10 space-y-0">
          {aboutPageContent.values.map((item, index) => (
            <li
              key={item.title}
              data-reveal
              className="grid gap-3 border-b border-border py-8 md:grid-cols-[80px_1fr]"
            >
              <span className="text-4xl font-bold text-[#c8102e]">{index + 1}</span>
              <div>
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="mt-2 text-[15px] text-secondary-text">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div data-reveal className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm text-secondary-text">{aboutPageContent.regionsBody}</p>
          <CallPhoneButton
            size="lg"
            className="rounded-[4px] bg-[#c8102e] text-white hover:bg-[#a50d24]"
          />
        </div>
      </SitePageMotion>
    </div>
  );
}
