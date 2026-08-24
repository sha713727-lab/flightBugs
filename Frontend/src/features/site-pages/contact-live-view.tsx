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

export function ContactLiveView({ themeId }: Props) {
  const theme = landingThemes[themeId];

  return (
    <div className="bg-white text-primary-text">
      <section className="bg-[#111111] text-white">
        <SitePageMotion mode="scale" className={`${theme.containerClassName} py-16 md:py-24`}>
          <div data-reveal className="inline-flex items-center gap-2 rounded-full border border-[#c8102e]/40 px-3 py-1.5">
            <span className="size-2 animate-pulse rounded-full bg-[#c8102e]" aria-hidden />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff6b81]">
              {theme.contactEyebrow}
            </span>
          </div>
          <h1
            data-reveal
            className="mt-8 text-[clamp(44px,8vw,84px)] font-bold leading-[0.94] tracking-[-0.05em]"
          >
            {theme.contactHeading}
          </h1>
          <a
            data-reveal
            href={supportPhone.href}
            className="mt-8 block text-[clamp(40px,9vw,80px)] font-bold tracking-[-0.05em] text-[#c8102e]"
          >
            {supportPhone.display}
          </a>
          <a
            data-reveal
            href={supportEmail.href}
            className="mt-4 block text-[clamp(18px,3vw,26px)] font-semibold text-white/85 hover:text-[#ff6b81]"
          >
            {supportEmail.display}
          </a>
          <p data-reveal className="mt-4 max-w-xl text-[16px] text-white/70">
            {theme.contactLead}
          </p>
          <div data-reveal className="mt-8">
            <CallPhoneButton
              size="lg"
              className="rounded-[4px] bg-[#c8102e] text-white hover:bg-[#a50d24]"
            />
          </div>
        </SitePageMotion>
      </section>

      <SitePageMotion mode="rise" className={`${theme.containerClassName} py-12 md:py-16`}>
        <div className="space-y-0">
          {[
            { title: contactPageContent.hoursHeading, body: contactPageContent.hoursBody },
            { title: contactPageContent.regionsHeading, body: contactPageContent.regionsBody },
            { title: contactPageContent.tipHeading, body: contactPageContent.tipBody },
          ].map((item) => (
            <article
              key={item.title}
              data-reveal
              className="border-b border-border py-7 md:grid md:grid-cols-[220px_1fr] md:gap-8"
            >
              <h2 className="text-xl font-bold text-[#c8102e]">{item.title}</h2>
              <p className="mt-2 text-[15px] text-secondary-text md:mt-0">{item.body}</p>
            </article>
          ))}
        </div>
      </SitePageMotion>
    </div>
  );
}
