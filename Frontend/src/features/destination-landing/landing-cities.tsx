import Image from "next/image";
import Link from "next/link";

import {
  europeLandingCities,
  europeLandingCopy,
  europeLandingPath,
} from "@/constants/destinationLandingContent";

export function LandingCities() {
  return (
    <section id="cities" className="destination-section scroll-mt-28">
      <div className="container-avion">
        <h2 className="max-w-xl text-[clamp(32px,4vw,48px)] font-bold leading-[1.15] tracking-[-0.03em] text-primary-text">
          {europeLandingCopy.citiesHeading}
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {europeLandingCities.map((city) => (
            <Link
              key={city.id}
              href={`${europeLandingPath}?to=${city.place.iata}#search`}
              className="group relative block overflow-hidden rounded-[24px]"
            >
              <div className="relative aspect-[4/5] min-h-[420px]">
                <Image
                  src={city.image.src}
                  alt={city.image.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent transition-colors duration-[400ms] group-hover:from-black/80"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="text-3xl font-bold tracking-[-0.03em] text-white">
                    {city.name}
                  </h3>
                  <p className="mt-2 text-sm text-white/80">{city.line}</p>
                  <p className="mt-5 text-sm font-semibold text-white transition-transform duration-200 group-hover:translate-x-1">
                    Discover →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
