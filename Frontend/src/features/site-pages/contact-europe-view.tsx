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

export function ContactEuropeView({ themeId }: Props) {
  const theme = landingThemes[themeId];

  return (
    <div className="bg-white text-primary-text">
      <section className="border-b border-border bg-[#f5f7fa]">
        <SitePageMotion
          mode="slide"
          className={`${theme.containerClassName} grid gap-10 py-16 md:grid-cols-2 md:py-24`}
        >
          <div data-reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0b3a73]">
              {theme.contactEyebrow}
            </p>
            <h1 className="mt-4 text-[clamp(36px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.03em] text-[#0b3a73]">
              {theme.contactHeading}
            </h1>
            <p className="mt-5 text-[16px] leading-relaxed text-secondary-text">
              {theme.contactLead}
            </p>
          </div>
          <div
            data-reveal
            className="flex flex-col justify-center rounded-[4px] border border-[#0b3a73]/20 bg-white p-8 shadow-sm"
          >
            <p className="text-sm font-semibold text-[#0b3a73]">{contactPageContent.phoneHeading}</p>
            <a
              href={supportPhone.href}
              className="mt-3 text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.03em] text-[#0b3a73]"
            >
              {supportPhone.display}
            </a>
            <p className="mt-3 text-sm text-secondary-text">{contactPageContent.phoneBody}</p>
            <p className="mt-6 text-sm font-semibold text-[#0b3a73]">{contactPageContent.emailHeading}</p>
            <a
              href={supportEmail.href}
              className="mt-2 text-[15px] font-semibold text-[#0b3a73] hover:underline"
            >
              {supportEmail.display}
            </a>
            <p className="mt-2 text-sm text-secondary-text">{contactPageContent.emailBody}</p>
            <div className="mt-6">
              <CallPhoneButton
                size="lg"
                className="rounded-[12px] bg-[#0b3a73] text-white hover:bg-[#1e5a9f]"
              />
            </div>
          </div>
        </SitePageMotion>
      </section>

      <SitePageMotion mode="stagger" className={`${theme.containerClassName} py-14 md:py-20`}>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { title: contactPageContent.hoursHeading, body: contactPageContent.hoursBody },
            { title: contactPageContent.regionsHeading, body: contactPageContent.regionsBody },
            { title: contactPageContent.tipHeading, body: contactPageContent.tipBody },
          ].map((item) => (
            <article key={item.title} data-reveal className="border-t-2 border-[#0b3a73] pt-5">
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="mt-2 text-sm text-secondary-text">{item.body}</p>
            </article>
          ))}
        </div>
      </SitePageMotion>
    </div>
  );
}
