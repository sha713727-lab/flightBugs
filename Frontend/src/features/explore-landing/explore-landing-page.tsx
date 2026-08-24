import dynamic from "next/dynamic";

import { ExploreHeader } from "@/features/explore-landing/explore-header";
import { ExploreHero } from "@/features/explore-landing/explore-hero";
import { ExploreMotionRoot } from "@/features/explore-landing/explore-motion-root";

const ExploreTrending = dynamic(
  () =>
    import("@/features/explore-landing/explore-discovery").then((module) => ({
      default: module.ExploreTrending,
    })),
);

const ExploreMoods = dynamic(
  () =>
    import("@/features/explore-landing/explore-discovery").then((module) => ({
      default: module.ExploreMoods,
    })),
);

const ExplorePrices = dynamic(
  () =>
    import("@/features/explore-landing/explore-discovery").then((module) => ({
      default: module.ExplorePrices,
    })),
);

const ExploreRoutes = dynamic(
  () =>
    import("@/features/explore-landing/explore-discovery").then((module) => ({
      default: module.ExploreRoutes,
    })),
);

const ExploreGallery = dynamic(
  () =>
    import("@/features/explore-landing/explore-showcase").then((module) => ({
      default: module.ExploreGallery,
    })),
);

const ExploreCompare = dynamic(
  () =>
    import("@/features/explore-landing/explore-showcase").then((module) => ({
      default: module.ExploreCompare,
    })),
);

const ExploreAi = dynamic(
  () =>
    import("@/features/explore-landing/explore-showcase").then((module) => ({
      default: module.ExploreAi,
    })),
);

const ExploreTrust = dynamic(
  () =>
    import("@/features/explore-landing/explore-showcase").then((module) => ({
      default: module.ExploreTrust,
    })),
);

const ExploreClose = dynamic(
  () =>
    import("@/features/explore-landing/explore-showcase").then((module) => ({
      default: module.ExploreClose,
    })),
);

export function ExploreLandingPage() {
  return (
    <ExploreMotionRoot>
      <ExploreHeader />
      <main>
        <ExploreHero />
        <ExploreTrending />
        <ExploreMoods />
        <ExplorePrices />
        <ExploreRoutes />
        <ExploreGallery />
        <ExploreCompare />
        <ExploreAi />
        <ExploreTrust />
      </main>
      <ExploreClose />
    </ExploreMotionRoot>
  );
}
