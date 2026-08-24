"use client";

import { CallPhoneButton } from "@/components/call-phone-button";
import {
  aboutPageContent,
  type LandingThemeId,
  landingThemes,
} from "@/constants/sitePages";
import { SitePageMotion } from "@/features/site-pages/site-page-motion";

type Props = { readonly themeId: LandingThemeId };

export function AboutBookView({ themeId }: Props) {
  const theme = landingThemes[themeId];

  return (
    <div className="bg-[#f7f4ee] text-[#141414]">
      <section className="border-b border-[#e3ddd2]">
        <SitePageMotion mode="fade" className={`${theme.containerClassName} py-16 md:py-24`}>
          <p
            data-reveal
            className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0f7a4b]"
          >
            {theme.aboutEyebrow}
          </p>
          <h1
            data-reveal
            className="mt-4 max-w-3xl text-[clamp(36px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.03em]"
          >
            {theme.aboutHeading}
          </h1>
          <p data-reveal className="mt-5 max-w-2xl text-[16px] leading-relaxed text-[#5c5c5c]">
            {theme.aboutLead}
          </p>
          <div data-reveal className="mt-8">
            <CallPhoneButton
              size="lg"
              className="rounded-[12px] bg-[#0f7a4b] text-white hover:bg-[#0c6840]"
            />
          </div>
        </SitePageMotion>
      </section>

      <SitePageMotion mode="stagger" className={`${theme.containerClassName} py-14 md:py-20`}>
        <div
          data-reveal
          className="rounded-[20px] border border-[#e3ddd2] bg-[#fff8ee] p-8 shadow-[0_12px_40px_rgba(20,20,20,0.06)]"
        >
          <h2 className="text-2xl font-bold">{aboutPageContent.missionHeading}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#5c5c5c]">
            {aboutPageContent.missionBody}
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {aboutPageContent.values.map((item) => (
            <article
              key={item.title}
              data-reveal
              className="rounded-[16px] border border-[#e3ddd2] bg-white p-6"
            >
              <div className="mb-4 h-1.5 w-10 rounded-full bg-[#0f7a4b]" aria-hidden />
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5c5c5c]">{item.body}</p>
            </article>
          ))}
        </div>

        <p data-reveal className="mt-10 text-center text-sm text-[#5c5c5c]">
          {aboutPageContent.regionsBody}
        </p>
      </SitePageMotion>
    </div>
  );
}
