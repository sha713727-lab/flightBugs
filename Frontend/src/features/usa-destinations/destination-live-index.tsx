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

export function DestinationLiveIndex({ themeId, destinations }: Props) {
  return (
    <div className="bg-white text-primary-text">
      <section className="border-b border-aviation-blue/20 bg-dark-navy text-white">
        <DestinationReveal mode="rise" className="container-avion px-6 py-16 md:py-24">
          <div
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border border-aviation-blue/40 bg-aviation-blue/15 px-3 py-1.5"
          >
            <span className="size-2 animate-pulse rounded-full bg-aviation-blue" aria-hidden />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em]">
              USA destinations
            </span>
          </div>
          <h1
            data-reveal
            className="mt-8 max-w-5xl text-[clamp(42px,8vw,84px)] font-bold leading-[0.92] tracking-[-0.05em]"
          >
            Explore destinations
          </h1>
          <p data-reveal className="mt-6 max-w-2xl text-[18px] text-white/70">
            Browse popular USA cities, then call to ticket while the fare is live.
          </p>
        </DestinationReveal>
      </section>

      <DestinationCrumbs themeId={themeId} className="container-avion px-6 pt-8" />

      <ol className="container-avion px-6 py-12">
        {destinations.map((destination, index) => (
          <li key={destination.id} className="border-b border-border">
            <Link
              href={destinationSlugPath(themeId, destination.slug)}
              className="grid gap-4 py-8 md:grid-cols-[80px_1fr_240px] md:items-center"
            >
              <span className="text-4xl font-bold text-aviation-blue">
                {index + 1}
              </span>
              <div>
                <h2 className="text-2xl font-bold">{destination.destinationName}</h2>
                <p className="mt-2 text-[15px] text-secondary-text">
                  {destination.shortDescription}
                </p>
              </div>
              {destination.heroImage ? (
                <div className="relative aspect-[16/10] overflow-hidden rounded-[4px]">
                  <DestinationCmsImage
                    src={destination.heroImage.publicPath}
                    alt={
                      destination.heroImage.alt || destination.destinationName
                    }
                    className="object-cover"
                    sizes="240px"
                  />
                </div>
              ) : null}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
