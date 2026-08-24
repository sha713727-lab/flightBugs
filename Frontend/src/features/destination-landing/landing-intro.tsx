import Link from "next/link";

import { europeLandingCopy } from "@/constants/destinationLandingContent";

export function LandingIntro() {
  return (
    <section className="destination-section">
      <div className="container-avion max-w-3xl">
        <h2 className="text-[clamp(32px,4vw,48px)] font-bold leading-[1.15] tracking-[-0.03em] text-primary-text">
          {europeLandingCopy.introHeading}
        </h2>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-secondary-text">
          {europeLandingCopy.introBody}
        </p>
        <Link
          href="#cities"
          className="mt-8 inline-flex min-h-11 items-center text-sm font-semibold text-primary-text transition-transform duration-200 hover:translate-x-1"
        >
          {europeLandingCopy.introCta} →
        </Link>
      </div>
    </section>
  );
}
