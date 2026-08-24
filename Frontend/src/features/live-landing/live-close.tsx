import Link from "next/link";

import { CallPhoneButton } from "@/components/call-phone-button";
import { SitePageFooter } from "@/components/site-page-footer";
import {
  liveLandingCopy,
  liveLandingPath,
} from "@/constants/liveLandingContent";
import { supportPhone } from "@/constants/supportContact";

export function LiveClose() {
  return (
    <>
      <section className="bg-white py-24 md:py-32 xl:py-[140px]">
        <div className="container-avion">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary-text">
            {liveLandingCopy.availability}
          </p>
          <a
            href={supportPhone.href}
            className="mt-6 block text-[clamp(40px,8.5vw,104px)] font-bold leading-[0.95] tracking-[-0.05em] text-aviation-blue"
          >
            {supportPhone.display}
          </a>
          <p className="mt-6 text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.03em] text-primary-text">
            {liveLandingCopy.closeLine}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CallPhoneButton
              size="lg"
              className="rounded-[12px] bg-aviation-blue text-on-accent hover:bg-medium-blue"
            />
            <Link
              href={`${liveLandingPath}#desk`}
              className="inline-flex min-h-12 items-center justify-center rounded-[12px] border border-border px-6 text-[15px] font-semibold text-primary-text transition-colors hover:border-aviation-blue hover:text-aviation-blue sm:min-h-14 sm:px-8"
            >
              {liveLandingCopy.searchCta}
            </Link>
          </div>
        </div>
      </section>

      <SitePageFooter themeId="live" />
    </>
  );
}
