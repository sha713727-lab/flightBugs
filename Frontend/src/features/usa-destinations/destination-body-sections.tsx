import { CallPhoneButton } from "@/components/call-phone-button";
import { supportPhone } from "@/constants/supportContact";
import { DestinationCmsImage } from "@/features/usa-destinations/destination-cms-image";
import { DestinationReveal } from "@/features/usa-destinations/destination-reveal";
import type { DestinationDetail } from "@/types/destinations";

type DestinationBodySectionsProps = {
  readonly destination: DestinationDetail;
};

export function DestinationBodySections({
  destination,
}: DestinationBodySectionsProps) {
  return (
    <>
      {destination.thingsToDo.length > 0 ? (
        <section className="bg-soft-section py-16">
          <div className="container-avion px-6">
            <h2 className="text-[2rem] font-bold text-primary-text">
              Things to do
            </h2>
            <DestinationReveal className="mt-8" mode="stagger">
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {destination.thingsToDo.map((item) => (
                  <article
                    key={item.id}
                    data-reveal
                    className="overflow-hidden rounded-[var(--radius-lg)] bg-main-bg transition duration-300 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    {item.image ? (
                      <div className="relative aspect-[16/10]">
                        <DestinationCmsImage
                          src={item.image.publicPath}
                          alt={item.image.alt || item.title}
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    ) : null}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-primary-text">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-secondary-text">
                        {item.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </DestinationReveal>
          </div>
        </section>
      ) : null}

      {destination.galleryImages.length > 0 ? (
        <section className="container-avion px-6 py-16">
          <h2 className="text-[2rem] font-bold text-primary-text">Gallery</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {destination.galleryImages.map((image) => (
              <div
                key={image.id}
                className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)]"
              >
                <DestinationCmsImage
                  src={image.image.publicPath}
                  alt={image.image.alt || destination.destinationName}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {destination.experiences.length > 0 ? (
        <section className="bg-soft-section py-16">
          <div className="container-avion px-6">
            <h2 className="text-[2rem] font-bold text-primary-text">
              More experiences
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {destination.experiences.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-[var(--radius-lg)] bg-main-bg"
                >
                  {item.image ? (
                    <div className="relative aspect-[16/10]">
                      <DestinationCmsImage
                        src={item.image.publicPath}
                        alt={item.image.alt || item.title}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ) : null}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-primary-text">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-secondary-text">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {destination.culinaryItems.length > 0 ? (
        <section className="container-avion px-6 py-16">
          <h2 className="text-[2rem] font-bold text-primary-text">
            Culinary classics
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {destination.culinaryItems.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-[var(--radius-lg)] bg-main-bg"
                >
                  {item.image ? (
                    <div className="relative aspect-[16/10]">
                      <DestinationCmsImage
                        src={item.image.publicPath}
                        alt={item.image.alt || item.title}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ) : null}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-primary-text">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-secondary-text">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
          </div>
        </section>
      ) : null}

      {destination.airports.length > 0 ? (
        <section className="bg-soft-section py-16">
          <div className="container-avion px-6">
            <h2 className="text-[2rem] font-bold text-primary-text">
              Nearby airports
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {destination.airports.map((airport) => (
                <article
                  key={airport.id}
                  className="rounded-[var(--radius-lg)] border border-border bg-main-bg p-5"
                >
                  <p className="text-sm font-semibold text-aviation-blue">
                    {airport.airportCode}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-primary-text">
                    {airport.airportName}
                  </h3>
                  {airport.distanceOrArea ? (
                    <p className="mt-1 text-sm text-secondary-text">
                      {airport.distanceOrArea}
                    </p>
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

      <section className="container-avion px-6 py-16">
        <h2 className="text-[2rem] font-bold text-primary-text">
          {destination.bestTimeHeading}
        </h2>
        {destination.bestTimeSummary ? (
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-secondary-text">
            {destination.bestTimeSummary}
          </p>
        ) : null}
        {destination.seasons.length > 0 ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {destination.seasons.map((season) => (
              <article
                key={season.id}
                className="rounded-[var(--radius-lg)] border border-border p-5"
              >
                <h3 className="text-lg font-semibold text-primary-text">
                  {season.season}
                </h3>
                {season.months ? (
                  <p className="mt-1 text-sm font-medium text-aviation-blue">
                    {season.months}
                  </p>
                ) : null}
                <p className="mt-2 text-sm leading-relaxed text-secondary-text">
                  {season.description}
                </p>
              </article>
            ))}
          </div>
        ) : null}
      </section>

      {destination.faqs.length > 0 ? (
        <section className="bg-soft-section py-16">
          <div className="container-avion px-6">
            <h2 className="text-[2rem] font-bold text-primary-text">FAQs</h2>
            <div className="mt-8 space-y-4">
              {destination.faqs.map((faq) => (
                <details
                  key={faq.id}
                  className="rounded-[var(--radius-lg)] border border-border bg-main-bg p-5"
                >
                  <summary className="cursor-pointer text-base font-semibold text-primary-text">
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

      <section className="container-avion px-6 py-16">
        <div className="rounded-[var(--radius-xl)] bg-aviation-blue px-8 py-10 text-center text-on-accent">
          <h2 className="text-[1.75rem] font-bold">
            Ready to fly to {destination.destinationName}?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] text-white/85">
            Search live fares, then call {supportPhone.display}. We ticket by
            phone — 24/7 for Canada and the USA.
          </p>
          <div className="mt-6 flex justify-center">
            <CallPhoneButton className="!bg-white !text-aviation-blue hover:!bg-white/90" />
          </div>
        </div>
      </section>
    </>
  );
}
