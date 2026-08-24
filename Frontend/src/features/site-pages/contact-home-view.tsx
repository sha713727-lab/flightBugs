"use client";

import { CallPhoneButton } from "@/components/call-phone-button";
import {
  contactPageContent,
  type LandingThemeId,
  landingThemes,
} from "@/constants/sitePages";
import { supportEmail, supportPhone } from "@/constants/supportContact";
import { SitePageMotion } from "@/features/site-pages/site-page-motion";

type Props = { readonly themeId: LandingThemeId };

export function ContactHomeView({ themeId }: Props) {
  const theme = landingThemes[themeId];

  return (
    <div className="bg-[#0a0a0a] text-white">
      <SitePageMotion mode="rise" className={`${theme.containerClassName} py-20 md:py-28`}>
        <p data-reveal className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#f5c400]">
          {theme.contactEyebrow}
        </p>
        <h1
          data-reveal
          className="mt-4 max-w-3xl text-[clamp(40px,7vw,68px)] font-bold leading-[0.98] tracking-[-0.04em]"
        >
          {theme.contactHeading}
        </h1>
        <p data-reveal className="mt-5 max-w-xl text-[17px] text-white/65">
          {theme.contactLead}
        </p>
        <a
          data-reveal
          href={supportPhone.href}
          className="mt-10 block text-[clamp(36px,8vw,64px)] font-bold tracking-[-0.04em] text-[#f5c400]"
        >
          {supportPhone.display}
        </a>
        <a
          data-reveal
          href={supportEmail.href}
          className="mt-4 block text-[clamp(18px,3vw,24px)] font-semibold tracking-[-0.02em] text-white/80 hover:text-[#f5c400]"
        >
          {supportEmail.display}
        </a>
        <div data-reveal className="mt-8">
          <CallPhoneButton
            size="lg"
            className="rounded-full bg-[#f5c400] text-[#4a4a4a] hover:bg-[#e0b200] hover:text-[#4a4a4a]"
          />
        </div>
      </SitePageMotion>

      <SitePageMotion
        mode="stagger"
        className={`${theme.containerClassName} grid gap-4 border-t border-white/10 py-14 md:grid-cols-3 md:py-20`}
      >
        {[
          { title: contactPageContent.hoursHeading, body: contactPageContent.hoursBody },
          { title: contactPageContent.regionsHeading, body: contactPageContent.regionsBody },
          { title: contactPageContent.tipHeading, body: contactPageContent.tipBody },
        ].map((item) => (
          <article
            key={item.title}
            data-reveal
            className="rounded-[20px] border border-white/10 bg-white/[0.04] p-6"
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-white/60">{item.body}</p>
          </article>
        ))}
      </SitePageMotion>
    </div>
  );
}
