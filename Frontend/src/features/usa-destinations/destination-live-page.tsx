import { CallPhoneButton } from "@/components/call-phone-button";
import { type LandingThemeId } from "@/constants/sitePages";
import { supportPhone } from "@/constants/supportContact";
import { DestinationCmsImage } from "@/features/usa-destinations/destination-cms-image";
import { DestinationCrumbs } from "@/features/usa-destinations/destination-crumbs";
import { DestinationReveal } from "@/features/usa-destinations/destination-reveal";
import type { DestinationDetail } from "@/types/destinations";

type Props = {
  readonly themeId: LandingThemeId;
  readonly destination: DestinationDetail;
};

export function DestinationLivePage({ themeId, destination }: Props) {
  return (
    <div className="bg-white text-primary-text">
      <section className="relative min-h-[480px] overflow-hidden bg-dark-navy text-white">
        {destination.heroImage ? (
          <DestinationCmsImage
            src={destination.heroImage.publicPath}
            alt={destination.heroImage.alt || destination.destinationName}
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
        ) : null}
        <DestinationReveal mode="rise" className="container-avion relative px-6 py-16 md:py-24">
          <div
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border border-aviation-blue/40 bg-aviation-blue/15 px-3 py-1.5"
          >
            <span className="size-2 animate-pulse rounded-full bg-aviation-blue" aria-hidden />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-on-accent">
              {destination.state}
            </span>
          </div>
          <h1
            data-reveal
            className="mt-8 max-w-5xl text-[clamp(42px,8vw,84px)] font-bold leading-[0.92] tracking-[-0.05em]"
          >
            {destination.heroHeading}
          </h1>
          {destination.heroDescription ? (
            <p data-reveal className="mt-6 max-w-2xl text-[18px] leading-relaxed text-white/70">
              {destination.heroDescription}
            </p>
          ) : null}
          <div data-reveal className="mt-8">
            <CallPhoneButton className="rounded-[4px]" />
          </div>
        </DestinationReveal>
      </section>

      <DestinationCrumbs
        themeId={themeId}
        destinationName={destination.destinationName}
        className="container-avion px-6 pt-8"
      />

      <section className="container-avion px-6 py-14 md:py-20">
        <div className="rounded-[4px] border-2 border-aviation-blue bg-soft-section p-8 md:p-10">
          <h2 className="text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.03em] text-aviation-blue">
            {destination.whyVisitHeading}
          </h2>
          <p className="mt-4 max-w-3xl text-[16px] leading-relaxed">
            {destination.whyVisitDescription || destination.fullDescription}
          </p>
        </div>

        {destination.thingsToDo.length > 0 ? (
          <ol className="mt-12 space-y-0">
            {destination.thingsToDo.map((item, index) => (
              <li
                key={item.id}
                className="grid gap-4 border-b border-border py-8 md:grid-cols-[80px_1fr_200px] md:items-center"
              >
                <span className="text-4xl font-bold text-aviation-blue">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-[15px] text-secondary-text">
                    {item.description}
                  </p>
                </div>
                {item.image ? (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[4px]">
                    <DestinationCmsImage
                      src={item.image.publicPath}
                      alt={item.image.alt || item.title}
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        ) : null}
      </section>

      {destination.galleryImages.length > 0 ? (
        <section className="bg-dark-navy py-6">
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-6">
            {destination.galleryImages.map((image) => (
              <div
                key={image.id}
                className="relative h-64 min-w-[70%] snap-center overflow-hidden sm:min-w-[40%] lg:min-w-[28%]"
              >
                <DestinationCmsImage
                  src={image.image.publicPath}
                  alt={image.image.alt || destination.destinationName}
                  className="object-cover"
                  sizes="40vw"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {destination.experiences.length > 0 ? (
        <section className="container-avion px-6 py-14">
          <h2 className="text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.03em]">
            More experiences
          </h2>
          <ol className="mt-8">
            {destination.experiences.map((item, index) => (
              <li key={item.id} className="border-b border-border py-6">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-aviation-blue">
                  0{index + 1}
                </p>
                <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-secondary-text">{item.description}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {destination.airports.length > 0 ? (
        <section className="bg-soft-section py-14">
          <div className="container-avion px-6">
            <h2 className="text-[clamp(28px,4vw,44px)] font-bold text-aviation-blue">
              Nearby airports
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {destination.airports.map((airport) => (
                <article
                  key={airport.id}
                  className="rounded-[4px] border-2 border-aviation-blue bg-white p-5"
                >
                  <p className="text-sm font-bold text-aviation-blue">
                    {airport.airportCode}
                  </p>
                  <h3 className="mt-1 text-lg font-bold">{airport.airportName}</h3>
                  {airport.description ? (
                    <p className="mt-2 text-sm text-secondary-text">
                      {airport.description}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="container-avion px-6 py-14">
        <h2 className="text-[clamp(28px,4vw,44px)] font-bold">
          {destination.bestTimeHeading}
        </h2>
        {destination.bestTimeSummary ? (
          <p className="mt-4 max-w-3xl text-[15px] text-secondary-text">
            {destination.bestTimeSummary}
          </p>
        ) : null}
        {destination.seasons.length > 0 ? (
          <ol className="mt-8">
            {destination.seasons.map((season, index) => (
              <li
                key={season.id}
                className="grid gap-2 border-b border-border py-6 md:grid-cols-[80px_1fr]"
              >
                <span className="text-3xl font-bold text-aviation-blue">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-bold">{season.season}</h3>
                  {season.months ? (
                    <p className="text-sm font-medium text-aviation-blue">
                      {season.months}
                    </p>
                  ) : null}
                  <p className="mt-2 text-sm text-secondary-text">
                    {season.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        ) : null}
      </section>

      {destination.faqs.length > 0 ? (
        <section className="container-avion px-6 pb-14">
          <h2 className="text-[clamp(28px,4vw,44px)] font-bold">FAQs</h2>
          <ol className="mt-8">
            {destination.faqs.map((faq, index) => (
              <li key={faq.id} className="grid gap-3 border-b border-border py-6 md:grid-cols-[80px_1fr]">
                <span className="text-3xl font-bold text-aviation-blue">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold">{faq.question}</h3>
                  <p className="mt-2 text-sm text-secondary-text">{faq.answer}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <section className="container-avion flex flex-col gap-4 px-6 pb-16 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-sm text-secondary-text">
          Search live fares, then call {supportPhone.display}. We ticket while
          the fare is still live.
        </p>
        <CallPhoneButton className="rounded-[4px]" />
      </section>
    </div>
  );
}
