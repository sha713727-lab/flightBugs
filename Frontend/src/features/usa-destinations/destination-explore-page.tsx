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

export function DestinationExplorePage({ themeId, destination }: Props) {
  const [firstThing, ...otherThings] = destination.thingsToDo;

  return (
    <div className="bg-[var(--explore-bg)] text-[var(--explore-text)]">
      <DestinationReveal mode="stagger" className="explore-container py-16 md:py-24">
        <p
          data-reveal
          className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--explore-primary)]"
        >
          {destination.state}, {destination.country}
        </p>
        <h1
          data-reveal
          className="mt-4 max-w-4xl text-[clamp(36px,6vw,64px)] font-bold leading-[1.02] tracking-[-0.04em]"
        >
          {destination.heroHeading}
        </h1>
        {destination.heroDescription ? (
          <p
            data-reveal
            className="mt-5 max-w-2xl text-[16px] leading-relaxed text-[var(--explore-text-muted)]"
          >
            {destination.heroDescription}
          </p>
        ) : null}
      </DestinationReveal>

      {destination.heroImage ? (
        <div className="explore-container pb-10">
          <div className="relative aspect-[16/8] min-h-[240px] overflow-hidden rounded-[28px]">
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
        className="explore-container"
      />

      <section className="explore-section">
        <div className="explore-container grid gap-4 md:grid-cols-2">
          <article
            className="rounded-[28px] bg-[var(--explore-primary)] p-8 text-white md:row-span-2 md:min-h-[320px]"
          >
            <h2 className="text-3xl font-bold tracking-[-0.02em]">
              {destination.whyVisitHeading}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/85">
              {destination.whyVisitDescription || destination.fullDescription}
            </p>
            <div className="mt-10">
              <CallPhoneButton className="rounded-full !bg-white !text-[var(--explore-primary)] hover:!bg-white/90" />
            </div>
          </article>
          {firstThing ? (
            <article className="overflow-hidden rounded-[28px] border border-[var(--explore-border)] bg-[var(--explore-surface)]">
              {firstThing.image ? (
                <div className="relative aspect-[16/10]">
                  <DestinationCmsImage
                    src={firstThing.image.publicPath}
                    alt={firstThing.image.alt || firstThing.title}
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
              ) : null}
              <div className="p-6">
                <h3 className="text-xl font-bold">{firstThing.title}</h3>
                <p className="mt-2 text-sm text-[var(--explore-text-muted)]">
                  {firstThing.description}
                </p>
              </div>
            </article>
          ) : null}
          {otherThings.slice(0, 1).map((item) => (
            <article
              key={item.id}
              className="rounded-[28px] border border-[var(--explore-border)] bg-[var(--explore-surface)] p-6 shadow-[var(--explore-shadow-md)]"
            >
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--explore-text-muted)]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {otherThings.length > 1 ? (
        <section className="explore-section">
          <div className="explore-container grid gap-4 md:grid-cols-3">
            {otherThings.slice(1).map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-[28px] border border-[var(--explore-border)] bg-[var(--explore-surface)]"
              >
                {item.image ? (
                  <div className="relative aspect-[16/10]">
                    <DestinationCmsImage
                      src={item.image.publicPath}
                      alt={item.image.alt || item.title}
                      className="object-cover"
                      sizes="33vw"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-[var(--explore-text-muted)]">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {destination.galleryImages.length > 0 ? (
        <section className="explore-section">
          <div className="explore-container">
            <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.03em]">
              Gallery
            </h2>
            <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible">
              {destination.galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="relative min-w-[70%] snap-center overflow-hidden rounded-[28px] md:min-w-0"
                >
                  <div className="relative aspect-[4/5]">
                    <DestinationCmsImage
                      src={image.image.publicPath}
                      alt={image.image.alt || destination.destinationName}
                      className="object-cover"
                      sizes="25vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {destination.experiences.length > 0 ? (
        <section className="explore-section">
          <div className="explore-container grid gap-4 md:grid-cols-2">
            {destination.experiences.map((item) => (
              <article
                key={item.id}
                className="rounded-[28px] border border-[var(--explore-border)] bg-[var(--explore-surface)] p-6"
              >
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--explore-text-muted)]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {destination.airports.length > 0 ? (
        <section className="explore-section">
          <div className="explore-container">
            <h2 className="text-[clamp(28px,4vw,40px)] font-bold">Nearby airports</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {destination.airports.map((airport) => (
                <article
                  key={airport.id}
                  className="rounded-[28px] bg-[var(--explore-primary-soft)] p-6"
                >
                  <p className="text-sm font-semibold text-[var(--explore-primary)]">
                    {airport.airportCode}
                  </p>
                  <h3 className="mt-1 text-lg font-bold">{airport.airportName}</h3>
                  {airport.description ? (
                    <p className="mt-2 text-sm text-[var(--explore-text-muted)]">
                      {airport.description}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="explore-section">
        <div className="explore-container">
          <h2 className="text-[clamp(28px,4vw,40px)] font-bold">
            {destination.bestTimeHeading}
          </h2>
          {destination.bestTimeSummary ? (
            <p className="mt-3 max-w-3xl text-sm text-[var(--explore-text-muted)]">
              {destination.bestTimeSummary}
            </p>
          ) : null}
          {destination.seasons.length > 0 ? (
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {destination.seasons.map((season) => (
                <article
                  key={season.id}
                  className="rounded-[28px] border border-[var(--explore-border)] bg-[var(--explore-surface)] p-5"
                >
                  <h3 className="font-bold">{season.season}</h3>
                  {season.months ? (
                    <p className="mt-1 text-sm text-[var(--explore-primary)]">
                      {season.months}
                    </p>
                  ) : null}
                  <p className="mt-2 text-sm text-[var(--explore-text-muted)]">
                    {season.description}
                  </p>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {destination.faqs.length > 0 ? (
        <section className="explore-section">
          <div className="explore-container space-y-3">
            <h2 className="text-[clamp(28px,4vw,40px)] font-bold">FAQs</h2>
            {destination.faqs.map((faq) => (
              <details
                key={faq.id}
                className="rounded-[28px] border border-[var(--explore-border)] bg-[var(--explore-surface)] p-5"
              >
                <summary className="cursor-pointer font-semibold">{faq.question}</summary>
                <p className="mt-3 text-sm text-[var(--explore-text-muted)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      <p className="explore-container pb-16 text-center text-sm text-[var(--explore-text-muted)]">
        Search first. Call {supportPhone.display} to ticket.
      </p>
    </div>
  );
}
