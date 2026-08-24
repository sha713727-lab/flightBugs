import dynamic from "next/dynamic";

import { AdsHeader } from "@/features/ads-landing/ads-header";
import { AdsHero } from "@/features/ads-landing/ads-hero";

const AdsTrust = dynamic(
  () =>
    import("@/features/ads-landing/ads-trust").then((module) => ({
      default: module.AdsTrust,
    })),
  { loading: () => <div className="min-h-24 border-y border-border bg-[var(--search-panel-bg)]" /> },
);

const AdsSteps = dynamic(
  () =>
    import("@/features/ads-landing/ads-steps").then((module) => ({
      default: module.AdsSteps,
    })),
);

const AdsWhy = dynamic(
  () =>
    import("@/features/ads-landing/ads-why").then((module) => ({
      default: module.AdsWhy,
    })),
);

const AdsCities = dynamic(
  () =>
    import("@/features/ads-landing/ads-cities").then((module) => ({
      default: module.AdsCities,
    })),
);

const AdsProof = dynamic(
  () =>
    import("@/features/ads-landing/ads-proof").then((module) => ({
      default: module.AdsProof,
    })),
);

const AdsFaq = dynamic(
  () =>
    import("@/features/ads-landing/ads-faq").then((module) => ({
      default: module.AdsFaq,
    })),
);

const AdsClose = dynamic(
  () =>
    import("@/features/ads-landing/ads-close").then((module) => ({
      default: module.AdsClose,
    })),
);

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
