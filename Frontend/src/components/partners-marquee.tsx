import Image from "next/image";

import {
  adsPartnersCopy,
  adsPartnersList,
  europePartnersCopy,
  europePartnersList,
  explorePartnersCopy,
  explorePartnersList,
  homePartnersCopy,
  homePartnersList,
  livePartnersCopy,
  livePartnersList,
  type PartnersMarqueeVariant,
} from "@/constants/trustedPartners";
import { cn } from "@/utils/cn";

const variantConfig = {
  home: {
    copy: homePartnersCopy,
    partners: homePartnersList,
  },
  europe: {
    copy: europePartnersCopy,
    partners: europePartnersList,
  },
  live: {
    copy: livePartnersCopy,
    partners: livePartnersList,
  },
  ads: {
    copy: adsPartnersCopy,
    partners: adsPartnersList,
  },
  explore: {
    copy: explorePartnersCopy,
    partners: explorePartnersList,
  },
} as const;

type PartnersMarqueeProps = {
  readonly variant: PartnersMarqueeVariant;
  readonly className?: string;
};

export function PartnersMarquee({ variant, className }: PartnersMarqueeProps) {
  const { copy, partners } = variantConfig[variant];
  const loop = [...partners, ...partners];

  return (
    <div
      className={cn(
        "partner-marquee-root overflow-hidden",
        `partner-marquee-root--${variant}`,
        className,
      )}
    >
      <div className="container-avion">
        <div
          className={cn(
            "partner-marquee-copy",
            variant === "home" || variant === "live"
              ? "max-w-2xl text-left"
              : "mx-auto max-w-2xl text-center",
          )}
        >
          <p className="partner-marquee-eyebrow">{copy.eyebrow}</p>
          <h2 className="partner-marquee-heading">{copy.heading}</h2>
          <p className="partner-marquee-body">{copy.body}</p>
        </div>
      </div>

      <div className="partner-marquee mt-10 overflow-hidden py-2" aria-hidden="true">
        <div className="partner-marquee-track flex w-max items-start gap-10 px-10 sm:gap-12 sm:px-14">
          {loop.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="partner-marquee-item group flex w-28 shrink-0 select-none flex-col items-center gap-3 sm:w-32"
            >
              <div className="partner-marquee-card flex items-center justify-center p-3 transition-all duration-300">
                <Image
                  src={logo.src}
                  alt=""
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="partner-marquee-label text-center text-sm font-medium leading-tight">
                {logo.alt}
              </span>
            </div>
          ))}
        </div>
      </div>

      <ul className="sr-only">
        {partners.map((logo) => (
          <li key={logo.id}>{logo.alt}</li>
        ))}
      </ul>
    </div>
  );
}
