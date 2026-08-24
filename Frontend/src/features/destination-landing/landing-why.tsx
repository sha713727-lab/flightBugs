import Image from "next/image";

import { destinationImages } from "@/constants/brandAssets";
import {
  europeLandingCopy,
  europeLandingReasons,
} from "@/constants/destinationLandingContent";

export function LandingWhy() {
  return (
    <section className="destination-section">
      <div className="container-avion grid items-stretch gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="relative min-h-[420px] overflow-hidden rounded-[24px]">
          <Image
            src={destinationImages.london.src}
            alt={destinationImages.london.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary-text">
            {europeLandingCopy.whyEyebrow}
          </p>
          <ul className="mt-8 space-y-8">
            {europeLandingReasons.map((reason) => (
              <li key={reason.number} className="grid grid-cols-[auto_1fr] gap-5">
                <span className="text-2xl font-bold tracking-[-0.04em] text-aviation-blue">
                  {reason.number}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-primary-text">
                    {reason.title}
                  </h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-secondary-text">
                    {reason.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
