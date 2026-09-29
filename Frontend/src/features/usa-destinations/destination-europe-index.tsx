import Link from "next/link";

import { destinationSlugPath } from "@/constants/destinationPaths";
import { type LandingThemeId } from "@/constants/sitePages";
import { DestinationCmsImage } from "@/features/usa-destinations/destination-cms-image";
import { DestinationCrumbs } from "@/features/usa-destinations/destination-crumbs";
import { DestinationReveal } from "@/features/usa-destinations/destination-reveal";
import type { DestinationSummary } from "@/types/destinations";

type Props = {
  readonly themeId: LandingThemeId;
  readonly destinations: ReadonlyArray<DestinationSummary>;
};

export function DestinationEuropeIndex({ themeId, destinations }: Props) {
  return (
    <div className="bg-white text-primary-text">
      <section className="border-b border-border bg-soft-section">
        <DestinationReveal
          mode="rise"
          className="container-avion grid gap-10 px-6 py-16 md:grid-cols-12 md:py-24"
        >
          <div data-reveal className="md:col-span-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-aviation-blue">
              USA destinations
            </p>
            <div className="mt-6 h-1 w-16 bg-aviation-blue" aria-hidden />
          </div>
          <div data-reveal className="md:col-span-8">
            <h1 className="max-w-3xl text-[clamp(36px,5vw,58px)] font-bold leading-[1.05] tracking-[-0.035em] text-aviation-blue">
              Explore destinations
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-secondary-text">
              Browse popular USA cities, then call our desk to ticket your
              itinerary by phone.
            </p>
          </div>
        </DestinationReveal>
      </section>

      <DestinationCrumbs themeId={themeId} className="container-avion px-6 pt-8" />

      <section className="destination-section">
        <div className="container-avion grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              href={destinationSlugPath(themeId, destination.slug)}
              className="group relative block overflow-hidden rounded-[24px]"
            >
              <div className="relative aspect-[4/5] min-h-[420px] bg-soft-section">
                {destination.heroImage ? (
                  <DestinationCmsImage
                    src={destination.heroImage.publicPath}
                    alt={
                      destination.heroImage.alt || destination.destinationName
                    }
                    className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : null}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h2 className="text-3xl font-bold tracking-[-0.03em] text-white">
                    {destination.destinationName}
                  </h2>
                  <p className="mt-2 text-sm text-white/80">
                    {destination.shortDescription}
                  </p>
                  <p className="mt-5 text-sm font-semibold text-white transition-transform duration-200 group-hover:translate-x-1">
                    Discover →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
