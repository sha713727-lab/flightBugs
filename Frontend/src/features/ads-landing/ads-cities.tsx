"use client";

import Image from "next/image";
import Link from "next/link";

import {
  adsLandingCities,
  adsLandingCopy,
  adsLandingPath,
} from "@/constants/adsLandingContent";
import { AdsReveal } from "@/features/ads-landing/ads-reveal";

export function AdsCities() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-avion">
        <AdsReveal>
          <h2 className="max-w-xl text-[clamp(36px,6vw,64px)] font-bold leading-[1.02] tracking-[-0.04em] text-primary-text">
            {adsLandingCopy.citiesHeading}
          </h2>
        </AdsReveal>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {adsLandingCities.map((city, index) => (
            <li key={city.id}>
              <AdsReveal delay={Math.min(index * 0.05, 0.28)}>
                <Link
                  href={`${adsLandingPath}?to=${city.place.iata}#search`}
                  className="group relative block overflow-hidden rounded-[20px]"
                >
                  <div className="relative aspect-[3/4] min-h-[280px]">
                    <Image
                      src={city.image.src}
                      alt={city.image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70">
                        {city.place.iata}
                      </p>
                      <h3 className="mt-1 text-[28px] font-bold tracking-[-0.03em] text-white">
                        {city.name}
                      </h3>
                      <p className="mt-2 text-sm font-semibold text-white/90 transition-transform duration-200 group-hover:translate-x-1">
                        Search & call →
                      </p>
                    </div>
                  </div>
                </Link>
              </AdsReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
