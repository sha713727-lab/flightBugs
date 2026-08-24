import Link from "next/link";

import { SitePageFooter } from "@/components/site-page-footer";
import {
  europeLandingCopy,
} from "@/constants/destinationLandingContent";

export function LandingClose() {
  return (
    <>
      <section className="bg-dark-navy py-20 md:py-28 xl:py-36">
        <div className="container-avion text-center">
          <h2 className="mx-auto max-w-2xl text-[clamp(36px,5vw,64px)] font-bold leading-[1.08] tracking-[-0.04em] text-white">
            {europeLandingCopy.ctaHeading}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] text-white/90">
            {europeLandingCopy.ctaBody}
          </p>
          <Link
            href="#search"
            className="mt-10 inline-flex min-h-[52px] items-center justify-center rounded-[12px] bg-aviation-blue px-8 text-[15px] font-semibold text-on-accent transition duration-200 hover:-translate-y-0.5 hover:bg-medium-blue"
          >
            Book your flight →
          </Link>
        </div>
      </section>

      <SitePageFooter themeId="europe" />
    </>
  );
}
