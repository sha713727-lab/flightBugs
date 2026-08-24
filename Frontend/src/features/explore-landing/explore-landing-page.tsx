import {
  ExploreMoods,
  ExplorePrices,
  ExploreRoutes,
  ExploreTrending,
} from "@/features/explore-landing/explore-discovery";
import { ExploreHeader } from "@/features/explore-landing/explore-header";
import { ExploreHero } from "@/features/explore-landing/explore-hero";
import { ExploreMotionRoot } from "@/features/explore-landing/explore-motion-root";
import {
  ExploreAi,
  ExploreClose,
  ExploreCompare,
  ExploreGallery,
  ExploreTrust,
} from "@/features/explore-landing/explore-showcase";

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
