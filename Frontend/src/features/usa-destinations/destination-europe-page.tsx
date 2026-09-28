import Image from "next/image";

import { CallPhoneButton } from "@/components/call-phone-button";
import { type LandingThemeId } from "@/constants/sitePages";
import { supportPhone } from "@/constants/supportContact";
import { DestinationCrumbs } from "@/features/usa-destinations/destination-crumbs";
import { DestinationReveal } from "@/features/usa-destinations/destination-reveal";
import type { DestinationDetail } from "@/types/destinations";

type Props = {
  readonly themeId: LandingThemeId;
  readonly destination: DestinationDetail;
};

export function DestinationEuropePage({ themeId, destination }: Props) {
  return (
    <div className="bg-white text-primary-text">
      <section className="border-b border-border bg-soft-section">
        <DestinationReveal
          mode="rise"
          className="container-avion grid gap-10 px-6 py-16 md:grid-cols-12 md:py-24"
        >
          <div data-reveal className="md:col-span-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-aviation-blue">
              {destination.state}, {destination.country}
            </p>
            <div className="mt-6 h-1 w-16 bg-aviation-blue" aria-hidden />
          </div>
          <div data-reveal className="md:col-span-8">
            <h1 className="max-w-3xl text-[clamp(36px,5vw,58px)] font-bold leading-[1.05] tracking-[-0.035em] text-aviation-blue">
              {destination.heroHeading}
            </h1>
            {destination.heroSubheading ? (
              <p className="mt-4 text-lg font-medium text-primary-text">
                {destination.heroSubheading}
              </p>
            ) : null}
            {destination.heroDescription ? (
              <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-secondary-text">
                {destination.heroDescription}
              </p>
            ) : null}
            <div className="mt-8">
              <CallPhoneButton className="rounded-[12px]" />
            </div>
          </div>
        </DestinationReveal>
      </section>

      {destination.heroImage ? (
        <div className="relative aspect-[21/9] min-h-[280px] w-full overflow-hidden">
          <Image
            src={destination.heroImage.publicPath}
            alt={destination.heroImage.alt || destination.destinationName}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ) : null}

      <DestinationCrumbs
        themeId={themeId}
        destinationName={destination.destinationName}
        className="container-avion px-6 pt-8"
      />

      <section className="destination-section">
        <article className="container-avion border-l-4 border-aviation-blue bg-soft-section py-8 pl-8 pr-6 md:pl-12">
          <h2 className="text-3xl font-bold tracking-[-0.02em]">
            {destination.whyVisitHeading}
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-secondary-text">
            {destination.whyVisitDescription || destination.fullDescription}
          </p>
        </article>
      </section>

      {destination.thingsToDo.length > 0 ? (
        <section className="destination-section">
          <div className="container-avion">
            <h2 className="max-w-xl text-[clamp(32px,4vw,48px)] font-bold leading-[1.15] tracking-[-0.03em]">
              Things to do
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {destination.thingsToDo.map((item) => (
                <article
                  key={item.id}
                  className="group relative overflow-hidden rounded-[24px]"
                >
                  <div className="relative aspect-[4/5] min-h-[320px] bg-soft-section">
                    {item.image ? (
                      <Image
                        src={item.image.publicPath}
                        alt={item.image.alt || item.title}
                        fill
                        className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : null}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
                      aria-hidden
                    />
                    <div className="absolute inset-x-0 bottom-0 p-7">
                      <h3 className="text-2xl font-bold tracking-[-0.03em] text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/80">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {destination.galleryImages.length > 0 ? (
        <section className="destination-section bg-soft-section">
          <div className="container-avion">
            <h2 className="text-[clamp(32px,4vw,48px)] font-bold tracking-[-0.03em]">
              Gallery
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {destination.galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-[16/10] overflow-hidden rounded-[24px]"
                >
                  <Image
                    src={image.image.publicPath}
                    alt={image.image.alt || destination.destinationName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {destination.experiences.length > 0 ? (
        <section className="destination-section">
          <div className="container-avion">
            <h2 className="max-w-xl text-[clamp(32px,4vw,48px)] font-bold tracking-[-0.03em]">
              More experiences
            </h2>
          </div>
          <div className="container-avion mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 xl:grid xl:grid-cols-4 xl:overflow-visible">
            {destination.experiences.map((item) => (
              <article
                key={item.id}
                className="relative min-w-[78%] snap-center overflow-hidden rounded-[24px] sm:min-w-[52%] xl:min-w-0"
              >
                <div className="relative aspect-[3/4] bg-soft-section">
                  {item.image ? (
                    <Image
                      src={item.image.publicPath}
                      alt={item.image.alt || item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1280px) 78vw, 25vw"
                    />
                  ) : null}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {destination.culinaryItems.length > 0 ? (
        <section className="destination-section">
          <div className="container-avion">
            <h2 className="text-[clamp(32px,4vw,48px)] font-bold tracking-[-0.03em]">
              Culinary classics
            </h2>
            <div className="mt-12 grid gap-0 md:grid-cols-3">
              {destination.culinaryItems.map((item) => (
                <article
                  key={item.id}
                  className="border-t border-border px-0 py-8 md:border-l md:border-t-0 md:px-8 md:first:border-l-0 md:first:pl-0"
                >
                  <h3 className="text-xl font-bold text-aviation-blue">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary-text">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {destination.airports.length > 0 ? (
        <section className="destination-section bg-soft-section">
          <div className="container-avion">
            <h2 className="text-[clamp(32px,4vw,48px)] font-bold tracking-[-0.03em]">
              Nearby airports
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {destination.airports.map((airport) => (
                <article key={airport.id} className="border-l-4 border-aviation-blue pl-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-aviation-blue">
                    {airport.airportCode}
                  </p>
                  <h3 className="mt-2 text-xl font-bold">{airport.airportName}</h3>
                  {airport.distanceOrArea ? (
                    <p className="mt-1 text-sm text-secondary-text">{airport.distanceOrArea}</p>
                  ) : null}
                  {airport.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-secondary-text">
                      {airport.description}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="destination-section">
        <div className="container-avion">
          <h2 className="text-[clamp(32px,4vw,48px)] font-bold tracking-[-0.03em]">
            {destination.bestTimeHeading}
          </h2>
          {destination.bestTimeSummary ? (
            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-secondary-text">
              {destination.bestTimeSummary}
            </p>
          ) : null}
          {destination.seasons.length > 0 ? (
            <div className="mt-10 grid gap-0 md:grid-cols-4">
              {destination.seasons.map((season) => (
                <article
                  key={season.id}
                  className="border-t border-border py-8 md:border-l md:border-t-0 md:px-6 md:first:border-l-0 md:first:pl-0"
                >
                  <h3 className="text-lg font-bold text-aviation-blue">
                    {season.season}
                  </h3>
                  {season.months ? (
                    <p className="mt-1 text-sm font-medium">{season.months}</p>
                  ) : null}
                  <p className="mt-2 text-sm leading-relaxed text-secondary-text">
                    {season.description}
                  </p>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {destination.faqs.length > 0 ? (
        <section className="destination-section bg-soft-section">
          <div className="container-avion">
            <h2 className="text-[clamp(32px,4vw,48px)] font-bold tracking-[-0.03em]">
              FAQs
            </h2>
            <div className="mt-10 space-y-0">
              {destination.faqs.map((faq) => (
                <details
                  key={faq.id}
                  className="border-t border-border py-6 first:border-t-0"
                >
                  <summary className="cursor-pointer text-lg font-semibold text-aviation-blue">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-secondary-text">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="destination-section">
        <div className="container-avion flex flex-col gap-6 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Ready to fly to {destination.destinationName}?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-secondary-text">
              Search live fares, then call {supportPhone.display}. We ticket by
              phone — 24/7 for Canada and the USA.
            </p>
          </div>
          <CallPhoneButton className="rounded-[12px]" />
        </div>
      </section>
    </div>
  );
}
