import dynamic from "next/dynamic";

import { LandingHeader } from "@/features/destination-landing/landing-header";
import { LandingHero } from "@/features/destination-landing/landing-hero";
import { LandingIntro } from "@/features/destination-landing/landing-intro";

const LandingCities = dynamic(
  () =>
    import("@/features/destination-landing/landing-cities").then((module) => ({
      default: module.LandingCities,
    })),
);

const LandingWhy = dynamic(
  () =>
    import("@/features/destination-landing/landing-why").then((module) => ({
      default: module.LandingWhy,
    })),
);

const LandingExperiences = dynamic(
  () =>
    import("@/features/destination-landing/landing-experiences").then(
      (module) => ({
        default: module.LandingExperiences,
      }),
    ),
);

const LandingPractical = dynamic(
  () =>
    import("@/features/destination-landing/landing-practical").then(
      (module) => ({
        default: module.LandingPractical,
      }),
    ),
);

const LandingTestimonials = dynamic(
  () =>
    import("@/features/destination-landing/landing-testimonials").then(
      (module) => ({
        default: module.LandingTestimonials,
      }),
    ),
);

const LandingPartners = dynamic(
  () =>
    import("@/features/destination-landing/landing-partners").then(
      (module) => ({
        default: module.LandingPartners,
      }),
    ),
);

const LandingFaq = dynamic(
  () =>
    import("@/features/destination-landing/landing-faq").then((module) => ({
      default: module.LandingFaq,
    })),
);

const LandingClose = dynamic(
  () =>
    import("@/features/destination-landing/landing-close").then((module) => ({
      default: module.LandingClose,
    })),
);

export function DestinationLandingPage() {
  return (
    <div className="destination-landing flex min-h-full flex-1 flex-col bg-white">
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingIntro />
        <LandingCities />
        <LandingWhy />
        <LandingExperiences />
        <LandingPractical />
        <LandingTestimonials />
        <LandingPartners />
        <LandingFaq />
      </main>
      <LandingClose />
    </div>
  );
}
