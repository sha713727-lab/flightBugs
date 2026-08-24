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

export function ContactBookView({ themeId }: Props) {
  const theme = landingThemes[themeId];

  return (
    <div className="bg-[#f7f4ee] text-[#141414]">
      <SitePageMotion mode="fade" className={`${theme.containerClassName} py-16 md:py-24`}>
        <div
          data-reveal
          className="mx-auto max-w-2xl rounded-[24px] border border-[#e3ddd2] bg-white p-8 text-center shadow-[0_16px_50px_rgba(20,20,20,0.08)] md:p-12"
        >
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0f7a4b]">
            {theme.contactEyebrow}
          </p>
          <h1 className="mt-4 text-[clamp(32px,5vw,48px)] font-bold tracking-[-0.03em]">
            {theme.contactHeading}
          </h1>
          <p className="mt-4 text-[15px] text-[#5c5c5c]">{theme.contactLead}</p>
          <a
            href={supportPhone.href}
            className="mt-8 block text-[clamp(28px,5vw,40px)] font-bold text-[#0f7a4b]"
          >
            {supportPhone.display}
          </a>
          <p className="mt-2 text-sm text-[#5c5c5c]">{contactPageContent.phoneBody}</p>
          <a
            href={supportEmail.href}
            className="mt-5 block text-[15px] font-semibold text-[#0f7a4b] hover:underline"
          >
            {supportEmail.display}
          </a>
          <p className="mt-2 text-sm text-[#5c5c5c]">{contactPageContent.emailBody}</p>
          <div className="mt-8 flex justify-center">
            <CallPhoneButton
              size="lg"
              className="rounded-[12px] bg-[#0f7a4b] text-white hover:bg-[#0c6840]"
            />
          </div>
        </div>
      </SitePageMotion>

      <SitePageMotion
        mode="stagger"
        className={`${theme.containerClassName} grid gap-4 pb-16 md:grid-cols-3 md:pb-24`}
      >
        {[
          { title: contactPageContent.hoursHeading, body: contactPageContent.hoursBody },
          { title: contactPageContent.regionsHeading, body: contactPageContent.regionsBody },
          { title: contactPageContent.tipHeading, body: contactPageContent.tipBody },
        ].map((item) => (
          <article
            key={item.title}
            data-reveal
            className="rounded-[16px] border border-[#e3ddd2] bg-[#fff8ee] p-5"
          >
            <h2 className="font-bold">{item.title}</h2>
            <p className="mt-2 text-sm text-[#5c5c5c]">{item.body}</p>
          </article>
        ))}
      </SitePageMotion>
    </div>
  );
}
