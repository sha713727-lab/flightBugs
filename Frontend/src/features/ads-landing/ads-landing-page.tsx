import { AdsCities } from "@/features/ads-landing/ads-cities";
import { AdsClose } from "@/features/ads-landing/ads-close";
import { AdsFaq } from "@/features/ads-landing/ads-faq";
import { AdsHeader } from "@/features/ads-landing/ads-header";
import { AdsHero } from "@/features/ads-landing/ads-hero";
import { AdsProof } from "@/features/ads-landing/ads-proof";
import { AdsSteps } from "@/features/ads-landing/ads-steps";
import { AdsTrust } from "@/features/ads-landing/ads-trust";
import { AdsWhy } from "@/features/ads-landing/ads-why";

export function AdsLandingPage() {
  return (
    <div className="ads-landing flex min-h-full flex-1 flex-col bg-main-bg">
      <AdsHeader />
      <main>
        <AdsHero />
        <AdsTrust />
        <AdsSteps />
        <AdsWhy />
        <AdsCities />
        <AdsProof />
        <AdsFaq />
      </main>
      <AdsClose />
    </div>
  );
}
