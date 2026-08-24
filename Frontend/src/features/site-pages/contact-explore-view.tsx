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

export function ContactExploreView({ themeId }: Props) {
  const theme = landingThemes[themeId];

  return (
    <div className="bg-[var(--explore-bg,#f7f7f9)] text-[var(--explore-text,#17171c)]">
      <SitePageMotion
        mode="stagger"
        className={`${theme.containerClassName} grid items-stretch gap-6 py-16 md:grid-cols-2 md:py-24`}
      >
        <div data-reveal className="flex flex-col justify-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--explore-primary,#5b2eff)]">
            {theme.contactEyebrow}
          </p>
          <h1 className="mt-4 text-[clamp(36px,5vw,56px)] font-bold tracking-[-0.04em]">
            {theme.contactHeading}
          </h1>
          <p className="mt-4 text-[16px] text-[var(--explore-text-muted,#666670)]">
            {theme.contactLead}
          </p>
        </div>

        <div
          data-reveal
          className="rounded-[32px] bg-[var(--explore-primary,#5b2eff)] p-8 text-white md:p-10"
        >
          <p className="text-sm font-semibold text-white/80">{contactPageContent.phoneHeading}</p>
          <a
            href={supportPhone.href}
            className="mt-3 block whitespace-nowrap text-[clamp(28px,4vw,42px)] font-bold tracking-[-0.02em] text-white"
          >
            {supportPhone.display}
          </a>
          <p className="mt-3 text-sm text-white/80">{contactPageContent.phoneBody}</p>
          <p className="mt-6 text-sm font-semibold text-white/80">{contactPageContent.emailHeading}</p>
          <a
            href={supportEmail.href}
            className="mt-2 block text-[15px] font-semibold text-white hover:underline"
          >
            {supportEmail.display}
          </a>
          <p className="mt-2 text-sm text-white/80">{contactPageContent.emailBody}</p>
          <div className="mt-8">
            <CallPhoneButton
              size="lg"
              className="rounded-full !bg-white !text-[#5b2eff] hover:!bg-white/90 hover:!text-[#5b2eff]"
            />
          </div>
        </div>
      </SitePageMotion>

      <SitePageMotion
        mode="scale"
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
            className="rounded-[24px] border border-[var(--explore-border,#e4e4e8)] bg-white p-6 shadow-[0_8px_30px_rgba(91,46,255,0.06)]"
          >
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p className="mt-2 text-sm text-[var(--explore-text-muted,#666670)]">{item.body}</p>
          </article>
        ))}
      </SitePageMotion>
    </div>
  );
}
