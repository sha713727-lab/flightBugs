import Image from "next/image";

import { marketingImages } from "@/constants/brandAssets";
import {
  homeAvailabilityLine,
  homeValueLine,
} from "@/constants/homeContent";

export function TravelStatementSection() {
  return (
    <section className="section-padding bg-soft-section">
      <div className="container-avion">
        <h2 className="relative z-10 text-center text-[clamp(48px,8vw,96px)] font-bold leading-[0.95] tracking-[-0.045em] text-primary-text drop-shadow-[0_8px_28px_rgba(0,0,0,0.45)]">
          Fly <span className="text-aviation-blue">with us</span> everyday
        </h2>

        <div className="relative -mt-6 overflow-hidden rounded-[var(--radius-lg)] shadow-float md:-mt-10 lg:-mt-12">
          <div className="relative aspect-[16/10] min-h-[280px] w-full md:min-h-[360px]">
            <Image
              src={marketingImages.finalTravel.src}
              alt={marketingImages.finalTravel.alt}
              width={1470}
              height={820}
              sizes="(max-width: 1240px) 100vw, 1240px"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div
              className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-soft-section/80 to-transparent md:h-36"
              aria-hidden="true"
            />
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-2xl pb-16 text-center text-[15px] text-secondary-text md:pb-0">
          {homeValueLine} {homeAvailabilityLine}.
        </p>
      </div>
    </section>
  );
}
