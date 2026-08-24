import Image from "next/image";
import Link from "next/link";

import { AirplaneAccent } from "@/components/airplane-accent";
import { marketingImages } from "@/constants/brandAssets";
import {
  homeAvailabilityLine,
  homeValueLine,
} from "@/constants/homeContent";
import { DEFAULT_LOCALE } from "@/constants/locales";
import { cn } from "@/utils/cn";

export function ThoughtfulServiceSection() {
  return (
    <section className="section-padding bg-main-bg">
      <div className="container-avion">
        <div className="relative mx-auto max-w-3xl px-14 text-center sm:px-16 md:px-20">
          <AirplaneAccent
            className="pointer-events-none absolute -left-2 top-1 hidden md:block lg:-left-10"
            width={110}
          />
          <AirplaneAccent
            className="pointer-events-none absolute -right-2 top-5 hidden rotate-[10deg] md:block lg:-right-10 lg:top-7"
            mirrored
            width={110}
          />
          <h2 className="text-section-heading relative z-10">
            Thoughtful service from takeoff
            <br />
            to landing
          </h2>
          <p className="text-body-muted relative z-10 mx-auto mt-4 max-w-2xl">
            {homeValueLine} {homeAvailabilityLine}. A specialist covers your
            full journey, fare rules, and documents so you reach the gate with
            a confirmed ticket.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-[0.85fr_1.4fr_0.85fr] lg:items-stretch">
          <article
            className={cn(
              "group relative min-h-[320px] overflow-hidden rounded-[var(--radius-card)]",
              "shadow-card sm:min-h-[380px] lg:min-h-[420px]",
            )}
          >
            <Image
              src={marketingImages.travelSuccess.src}
              alt={marketingImages.travelSuccess.alt}
              width={736}
              height={1308}
              sizes="(max-width: 1024px) 100vw, 28vw"
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-dark-navy/40"
              aria-hidden="true"
            />
            <Link
              href={`/${DEFAULT_LOCALE}#search`}
              className="absolute inset-0 flex items-center justify-center p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aviation-blue"
            >
              <h3 className="max-w-[12ch] text-center text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)] sm:text-[32px]">
                Unlock your travel success
              </h3>
            </Link>
          </article>

          <article className="group relative min-h-[320px] overflow-hidden rounded-[var(--radius-card)] shadow-card sm:min-h-[380px] lg:min-h-[420px]">
            <Image
              src={marketingImages.airportExperience.src}
              alt={marketingImages.airportExperience.alt}
              width={1470}
              height={820}
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
            />
          </article>

          <article
            className={cn(
              "group relative min-h-[320px] overflow-hidden rounded-[var(--radius-card)]",
              "shadow-card sm:min-h-[380px] lg:min-h-[420px]",
            )}
          >
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={marketingImages.dealsVideo.poster}
              aria-label={marketingImages.dealsVideo.alt}
            >
              <source src={marketingImages.dealsVideo.src} type="video/mp4" />
            </video>
            <div
              className="absolute inset-0 bg-dark-navy/40"
              aria-hidden="true"
            />
            <Link
              href={`/${DEFAULT_LOCALE}#search`}
              className="absolute inset-0 flex items-center justify-center p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aviation-blue"
            >
              <span className="max-w-[10ch] text-center text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-[32px]">
                Flight deals
              </span>
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
