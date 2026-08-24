import Image from "next/image";

import {
  europeLandingCopy,
  europeLandingProof,
} from "@/constants/destinationLandingContent";

export function LandingTestimonials() {
  return (
    <section className="destination-section bg-soft-section">
      <div className="container-avion">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary-text">
          {europeLandingCopy.proofEyebrow}
        </p>
        <h2 className="mt-3 text-[clamp(32px,4vw,48px)] font-bold leading-[1.15] tracking-[-0.03em] text-primary-text">
          {europeLandingCopy.proofHeading}
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
          {europeLandingProof.map((item) => (
            <figure key={item.id} className="flex flex-col">
              <blockquote className="text-[17px] font-medium leading-relaxed tracking-[-0.02em] text-primary-text">
                {item.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Image
                  src={item.imageSrc}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-primary-text">
                    {item.name}
                  </p>
                  <p className="text-xs text-secondary-text">{item.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
