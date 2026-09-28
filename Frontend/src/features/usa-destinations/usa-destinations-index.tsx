import Image from "next/image";
import Link from "next/link";

import { destinationSlugPath } from "@/constants/destinationPaths";
import type { LandingThemeId } from "@/constants/sitePages";
import { DestinationReveal } from "@/features/usa-destinations/destination-reveal";
import type { DestinationSummary } from "@/types/destinations";

type UsaDestinationsIndexProps = {
  readonly themeId: LandingThemeId;
  readonly destinations: ReadonlyArray<DestinationSummary>;
};

export function UsaDestinationsIndex({
  themeId,
  destinations,
}: UsaDestinationsIndexProps) {
  return (
    <div className="container-avion px-6 py-16">
      <DestinationReveal mode="rise">
        <p
          data-reveal
          className="text-sm font-semibold uppercase tracking-wide text-aviation-blue"
        >
          USA destinations
        </p>
        <h1
          data-reveal
          className="mt-3 text-[clamp(2rem,4vw,3rem)] font-bold text-primary-text"
        >
          Explore destinations
        </h1>
        <p
          data-reveal
          className="mt-4 max-w-2xl text-[15px] leading-relaxed text-secondary-text"
        >
          Browse popular USA cities, then call our desk to ticket your itinerary
          by phone.
        </p>
      </DestinationReveal>

      <DestinationReveal className="mt-10" mode="stagger">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              href={destinationSlugPath(themeId, destination.slug)}
              data-reveal
              className="group overflow-hidden rounded-[var(--radius-lg)] bg-soft-section transition duration-300 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              {destination.heroImage ? (
                <div className="relative aspect-[16/10]">
                  <Image
                    src={destination.heroImage.publicPath}
                    alt={
                      destination.heroImage.alt || destination.destinationName
                    }
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ) : null}
              <div className="p-5">
                <p className="text-sm text-secondary-text">{destination.state}</p>
                <h2 className="mt-1 text-xl font-semibold text-primary-text">
                  {destination.destinationName}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-secondary-text">
                  {destination.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </DestinationReveal>
    </div>
  );
}
