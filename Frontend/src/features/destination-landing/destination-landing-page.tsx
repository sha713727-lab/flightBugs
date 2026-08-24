import { LandingCities } from "@/features/destination-landing/landing-cities";
import { LandingClose } from "@/features/destination-landing/landing-close";
import { LandingExperiences } from "@/features/destination-landing/landing-experiences";
import { LandingFaq } from "@/features/destination-landing/landing-faq";
import { LandingHeader } from "@/features/destination-landing/landing-header";
import { LandingHero } from "@/features/destination-landing/landing-hero";
import { LandingIntro } from "@/features/destination-landing/landing-intro";
import { LandingPartners } from "@/features/destination-landing/landing-partners";
import { LandingPractical } from "@/features/destination-landing/landing-practical";
import { LandingTestimonials } from "@/features/destination-landing/landing-testimonials";
import { LandingWhy } from "@/features/destination-landing/landing-why";

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
