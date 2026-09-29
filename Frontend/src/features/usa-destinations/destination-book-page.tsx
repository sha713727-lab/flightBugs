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

export function DestinationBookPage({ themeId, destination }: Props) {
  return (
    <div className="bg-main-bg text-primary-text">
      <section className="border-b border-border">
        <DestinationReveal mode="rise" className="container-avion px-6 py-16 md:py-24">
          <p
            data-reveal
            className="text-[12px] font-semibold uppercase tracking-[0.14em] text-aviation-blue"
          >
            {destination.state}, {destination.country}
          </p>
          <h1
            data-reveal
            className="mt-4 max-w-3xl text-[clamp(36px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.03em]"
          >
            {destination.heroHeading}
          </h1>
          {destination.heroDescription ? (
            <p
              data-reveal
              className="mt-5 max-w-2xl text-[16px] leading-relaxed text-secondary-text"
            >
              {destination.heroDescription}
            </p>
          ) : null}
          <div data-reveal className="mt-8">
            <CallPhoneButton className="rounded-[12px]" />
          </div>
        </DestinationReveal>
      </section>

      {destination.heroImage ? (
        <div className="container-avion px-6 py-8">
          <div className="relative aspect-[21/9] min-h-[240px] overflow-hidden rounded-[20px]">
            <DestinationCmsImage
              src={destination.heroImage.publicPath}
              alt={destination.heroImage.alt || destination.destinationName}
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      ) : null}

      <DestinationCrumbs
        themeId={themeId}
        destinationName={destination.destinationName}
        className="container-avion px-6"
      />

      <section className="container-avion px-6 py-14">
        <div className="rounded-[20px] border border-border bg-[var(--search-panel-bg)] p-8">
          <h2 className="text-2xl font-bold">{destination.whyVisitHeading}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-secondary-text">
            {destination.whyVisitDescription || destination.fullDescription}
          </p>
        </div>

        {destination.thingsToDo.length > 0 ? (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {destination.thingsToDo.map((item) => (
              <li key={item.id}>
                <article className="group relative overflow-hidden rounded-[20px]">
                  <div className="relative aspect-[3/4] min-h-[260px] bg-soft-section">
                    {item.image ? (
                      <DestinationCmsImage
                        src={item.image.publicPath}
                        alt={item.image.alt || item.title}
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                    ) : null}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
                      aria-hidden
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="text-[22px] font-bold tracking-[-0.03em] text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/90">{item.description}</p>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {destination.galleryImages.length > 0 ? (
        <section className="container-avion px-6 pb-14">
          <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.03em]">
            Gallery
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {destination.galleryImages.map((image) => (
              <div
                key={image.id}
                className="relative aspect-[3/4] overflow-hidden rounded-[20px]"
              >
                <DestinationCmsImage
                  src={image.image.publicPath}
                  alt={image.image.alt || destination.destinationName}
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {destination.experiences.length > 0 || destination.culinaryItems.length > 0 ? (
        <section className="container-avion grid gap-4 px-6 pb-14 md:grid-cols-3">
          {[...destination.experiences, ...destination.culinaryItems].map(
            (item) => (
              <article
                key={item.id}
                className="rounded-[16px] border border-border bg-white p-6"
              >
                <div className="mb-4 h-1.5 w-10 rounded-full bg-aviation-blue" aria-hidden />
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary-text">
                  {item.description}
                </p>
              </article>
            ),
          )}
        </section>
      ) : null}

      {destination.airports.length > 0 ? (
        <section className="container-avion px-6 pb-14">
          <h2 className="text-2xl font-bold">Nearby airports</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {destination.airports.map((airport) => (
              <article
                key={airport.id}
                className="rounded-[16px] border border-border bg-white p-6"
              >
                <p className="text-sm font-semibold text-aviation-blue">
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
        </section>
      ) : null}

      <section className="container-avion px-6 pb-14">
        <h2 className="text-2xl font-bold">{destination.bestTimeHeading}</h2>
        {destination.bestTimeSummary ? (
          <p className="mt-3 max-w-3xl text-sm text-secondary-text">
            {destination.bestTimeSummary}
          </p>
        ) : null}
        {destination.seasons.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {destination.seasons.map((season) => (
              <article
                key={season.id}
                className="rounded-[16px] border border-border bg-white p-5"
              >
                <h3 className="font-bold">{season.season}</h3>
                {season.months ? (
                  <p className="mt-1 text-sm text-aviation-blue">{season.months}</p>
                ) : null}
                <p className="mt-2 text-sm text-secondary-text">{season.description}</p>
              </article>
            ))}
          </div>
        ) : null}
      </section>

      {destination.faqs.length > 0 ? (
        <section className="container-avion px-6 pb-14">
          <h2 className="text-2xl font-bold">FAQs</h2>
          <div className="mt-6 space-y-3">
            {destination.faqs.map((faq) => (
              <details
                key={faq.id}
                className="rounded-[16px] border border-border bg-white p-5"
              >
                <summary className="cursor-pointer font-semibold">{faq.question}</summary>
                <p className="mt-3 text-sm text-secondary-text">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      <p className="container-avion px-6 pb-16 text-center text-sm text-secondary-text">
        Search live fares, then call {supportPhone.display}. Ticketed by phone.
      </p>
    </div>
  );
}
