import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  homeAvailabilityLine,
  homeValueLine,
} from "@/constants/homeContent";
import { DEFAULT_LOCALE } from "@/constants/locales";
import { siteBrand } from "@/constants/siteBrand";
import { supportPhone } from "@/constants/supportContact";
import { FaqSection } from "@/features/home/faq-section";
import { HeroSection } from "@/features/home/hero-section";
import { HomePartnersSection } from "@/features/home/home-partners-section";
import { HomeStructuredData } from "@/features/home/home-structured-data";
import { PopularDestinationsSection } from "@/features/home/popular-destinations-section";
import { PremiumSmartTravelerSection } from "@/features/home/premium-smart-traveler-section";
import { SupportCtaSection } from "@/features/home/support-cta-section";
import { TestimonialsSection } from "@/features/home/testimonials-section";
import { ThoughtfulServiceSection } from "@/features/home/thoughtful-service-section";
import { TravelStatementSection } from "@/features/home/travel-statement-section";
import { buildLandingMetadata } from "@/lib/site-metadata";

export const metadata = buildLandingMetadata({
  title: `Book International Flights by Phone | ${siteBrand.metadataTitle}`,
  description: `${homeValueLine} ${homeAvailabilityLine} for Canada and the USA. Call ${supportPhone.display}.`,
  path: `/${DEFAULT_LOCALE}`,
});

export default function HomePage() {
  return (
    <main className="flex min-h-full flex-1 flex-col bg-main-bg">
      <HomeStructuredData />
      <div className="relative">
        <SiteHeader />
        <HeroSection />
      </div>
      <PopularDestinationsSection />
      <HomePartnersSection />
      <PremiumSmartTravelerSection />
      <ThoughtfulServiceSection />
      <FaqSection />
      <SupportCtaSection />
      <TestimonialsSection />
      <TravelStatementSection />
      <SiteFooter />
    </main>
  );
}
