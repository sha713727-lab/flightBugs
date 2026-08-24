import Link from "next/link";

import {
  europeLandingCopy,
  europeLandingFacts,
  europeLandingSeasons,
} from "@/constants/destinationLandingContent";

export function LandingPractical() {
  return (
    <>
      <section
        id="flight-info"
        className="destination-section scroll-mt-28 bg-soft-section"
      >
        <div className="container-avion">
          <h2 className="text-[clamp(32px,4vw,48px)] font-bold leading-[1.15] tracking-[-0.03em] text-primary-text">
            {europeLandingCopy.flightInfoHeading}
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-4">
            {europeLandingFacts.map((fact) => (
              <div key={fact.label}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary-text">
                  {fact.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-primary-text">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="#search"
            className="mt-10 inline-flex min-h-[52px] items-center justify-center rounded-[12px] bg-aviation-blue px-8 text-[15px] font-semibold text-on-accent transition duration-200 hover:-translate-y-0.5 hover:bg-medium-blue"
          >
            {europeLandingCopy.ctaButton}
          </Link>
        </div>
      </section>

      <section className="destination-section">
        <div className="container-avion">
          <h2 className="text-[clamp(32px,4vw,48px)] font-bold leading-[1.15] tracking-[-0.03em] text-primary-text">
            {europeLandingCopy.seasonsHeading}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {europeLandingSeasons.map((season) => (
              <article
                key={season.id}
                className="rounded-[20px] bg-soft-section p-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary-text">
                  {season.months}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-primary-text">
                  {season.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary-text">
                  {season.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
