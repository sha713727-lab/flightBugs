import Image from "next/image";

import { PartnersMarquee } from "@/components/partners-marquee";
import {
  liveLandingCopy,
  liveLandingProof,
} from "@/constants/liveLandingContent";

export function LiveProof() {
  return (
    <>
      <section className="border-t border-border bg-white py-20 md:py-28">
        <div className="container-avion">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-aviation-blue">
            {liveLandingCopy.proofEyebrow}
          </p>
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12">
            {liveLandingProof.map((item) => (
              <figure key={item.id} className="flex flex-col">
                <blockquote className="text-[17px] font-medium leading-relaxed tracking-[-0.02em] text-primary-text">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <Image
                    src={item.imageSrc}
                    alt=""
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

      <section className="border-t border-border bg-[#F8E9EB] py-16 md:py-20">
        <PartnersMarquee variant="live" />
      </section>
    </>
  );
}
