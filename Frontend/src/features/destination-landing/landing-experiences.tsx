import Image from "next/image";
import Link from "next/link";

import {
  europeLandingCopy,
  europeLandingExperiences,
} from "@/constants/destinationLandingContent";

export function LandingExperiences() {
  return (
    <section className="destination-section">
      <div className="container-avion">
        <h2 className="max-w-xl text-[clamp(32px,4vw,48px)] font-bold leading-[1.15] tracking-[-0.03em] text-primary-text">
          {europeLandingCopy.experiencesHeading}
        </h2>
      </div>

      <div className="container-avion mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 xl:grid xl:grid-cols-4 xl:overflow-visible">
        {europeLandingExperiences.map((item) => (
          <Link
            key={item.id}
            href="#search"
            className="group relative min-w-[78%] snap-center overflow-hidden rounded-[24px] sm:min-w-[52%] xl:min-w-0"
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                loading="lazy"
                sizes="(max-width: 1280px) 78vw, 25vw"
                className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70">
                  {item.label}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm font-semibold text-white transition-transform duration-200 group-hover:translate-x-1">
                  Search flights →
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
