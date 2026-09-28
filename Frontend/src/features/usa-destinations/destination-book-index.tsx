import Image from "next/image";
import Link from "next/link";

import { destinationSlugPath } from "@/constants/destinationPaths";
import { type LandingThemeId } from "@/constants/sitePages";
import { DestinationCrumbs } from "@/features/usa-destinations/destination-crumbs";
import { DestinationReveal } from "@/features/usa-destinations/destination-reveal";
import type { DestinationSummary } from "@/types/destinations";

type Props = {
  readonly themeId: LandingThemeId;
  readonly destinations: ReadonlyArray<DestinationSummary>;
};

export function DestinationBookIndex({ themeId, destinations }: Props) {
  return (
    <div className="bg-main-bg text-primary-text">
      <section className="border-b border-border">
        <DestinationReveal mode="rise" className="container-avion px-6 py-16 md:py-24">
          <p
            data-reveal
            className="text-[12px] font-semibold uppercase tracking-[0.14em] text-aviation-blue"
          >
            USA destinations
          </p>
          <h1
            data-reveal
            className="mt-4 max-w-3xl text-[clamp(36px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.03em]"
          >
            Explore destinations
          </h1>
          <p
            data-reveal
            className="mt-5 max-w-2xl text-[16px] leading-relaxed text-secondary-text"
          >
            Browse popular USA cities, then call our desk to ticket by phone.
          </p>
        </DestinationReveal>
      </section>

      <DestinationCrumbs themeId={themeId} className="container-avion px-6 pt-8" />

      <ul className="container-avion grid gap-4 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {destinations.map((destination) => (
          <li key={destination.id}>
            <Link
              href={destinationSlugPath(themeId, destination.slug)}
              className="group relative block overflow-hidden rounded-[20px]"
            >
              <div className="relative aspect-[3/4] min-h-[280px] bg-soft-section">
                {destination.heroImage ? (
                  <Image
                    src={destination.heroImage.publicPath}
                    alt={
                      destination.heroImage.alt || destination.destinationName
                    }
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                ) : null}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70">
                    {destination.state}
                  </p>
                  <h2 className="mt-1 text-[28px] font-bold tracking-[-0.03em] text-white">
                    {destination.destinationName}
                  </h2>
                  <p className="mt-2 text-sm font-semibold text-white/90 transition-transform duration-200 group-hover:translate-x-1">
                    Search & call →
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
