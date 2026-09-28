import Image from "next/image";

import { CallPhoneButton } from "@/components/call-phone-button";
import { type LandingThemeId } from "@/constants/sitePages";
import { DestinationBodySections } from "@/features/usa-destinations/destination-body-sections";
import { DestinationCrumbs } from "@/features/usa-destinations/destination-crumbs";
import { DestinationReveal } from "@/features/usa-destinations/destination-reveal";
import type { DestinationDetail } from "@/types/destinations";

type UsaDestinationPageProps = {
  readonly themeId: LandingThemeId;
  readonly destination: DestinationDetail;
};

export function UsaDestinationPage({
  themeId,
  destination,
}: UsaDestinationPageProps) {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative min-h-[420px] w-full bg-dark-navy">
          {destination.heroImage ? (
            <Image
              src={destination.heroImage.publicPath}
              alt={destination.heroImage.alt || destination.destinationName}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20" />
          <DestinationReveal mode="rise">
            <div className="container-avion relative flex min-h-[420px] flex-col justify-end px-6 pb-16 pt-28">
              <p data-reveal className="text-sm font-semibold text-white/80">
                {destination.state}, {destination.country}
              </p>
              <h1
                data-reveal
                className="mt-2 max-w-3xl text-[clamp(2.4rem,5vw,4rem)] font-bold leading-tight text-white"
              >
                {destination.heroHeading}
              </h1>
              {destination.heroSubheading ? (
                <p
                  data-reveal
                  className="mt-3 max-w-2xl text-lg font-medium text-white/90"
                >
                  {destination.heroSubheading}
                </p>
              ) : null}
              {destination.heroDescription ? (
                <p
                  data-reveal
                  className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/80"
                >
                  {destination.heroDescription}
                </p>
              ) : null}
              <div data-reveal className="mt-6">
                <CallPhoneButton />
              </div>
            </div>
          </DestinationReveal>
        </div>
      </section>

      <DestinationCrumbs
        themeId={themeId}
        destinationName={destination.destinationName}
        className="container-avion px-6 pt-6"
      />

      <section className="container-avion px-6 py-16">
        <h2 className="text-[2rem] font-bold text-primary-text">
          {destination.whyVisitHeading}
        </h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-secondary-text">
          {destination.whyVisitDescription || destination.fullDescription}
        </p>
      </section>

      <DestinationBodySections destination={destination} />
    </>
  );
}
