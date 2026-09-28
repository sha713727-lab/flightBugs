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

export function DestinationExploreIndex({ themeId, destinations }: Props) {
  const [featured, ...rest] = destinations;

  return (
    <div className="bg-[var(--explore-bg)] text-[var(--explore-text)]">
      <DestinationReveal mode="stagger" className="explore-container py-16 md:py-24">
        <p
          data-reveal
          className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--explore-primary)]"
        >
          USA destinations
        </p>
        <h1
          data-reveal
          className="mt-4 max-w-4xl text-[clamp(36px,6vw,64px)] font-bold leading-[1.02] tracking-[-0.04em]"
        >
          Explore destinations
        </h1>
        <p
          data-reveal
          className="mt-5 max-w-2xl text-[16px] leading-relaxed text-[var(--explore-text-muted)]"
        >
          Discover cities, compare options clearly, then call to ticket.
        </p>
      </DestinationReveal>

      <DestinationCrumbs themeId={themeId} className="explore-container" />

      <section className="explore-section">
        <div className="explore-container grid gap-4 md:grid-cols-2">
          {featured ? (
            <Link
              href={destinationSlugPath(themeId, featured.slug)}
              className="overflow-hidden rounded-[28px] bg-[var(--explore-primary)] text-white md:row-span-2"
            >
              {featured.heroImage ? (
                <div className="relative aspect-[16/10]">
                  <Image
                    src={featured.heroImage.publicPath}
                    alt={featured.heroImage.alt || featured.destinationName}
                    fill
                    className="object-cover opacity-80"
                    sizes="50vw"
                  />
                </div>
              ) : null}
              <div className="p-8">
                <h2 className="text-3xl font-bold tracking-[-0.02em]">
                  {featured.destinationName}
                </h2>
                <p className="mt-3 text-[15px] text-white/85">
                  {featured.shortDescription}
                </p>
              </div>
            </Link>
          ) : null}
          {rest.map((destination) => (
            <Link
              key={destination.id}
              href={destinationSlugPath(themeId, destination.slug)}
              className="rounded-[28px] border border-[var(--explore-border)] bg-[var(--explore-surface)] p-6 shadow-[var(--explore-shadow-md)]"
            >
              <p className="text-sm text-[var(--explore-primary)]">
                {destination.state}
              </p>
              <h2 className="mt-1 text-xl font-bold">
                {destination.destinationName}
              </h2>
              <p className="mt-2 text-sm text-[var(--explore-text-muted)]">
                {destination.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
