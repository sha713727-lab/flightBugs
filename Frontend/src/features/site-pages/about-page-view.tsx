import type { LandingThemeId } from "@/constants/sitePages";
import { AboutBookView } from "@/features/site-pages/about-book-view";
import { AboutEuropeView } from "@/features/site-pages/about-europe-view";
import { AboutExploreView } from "@/features/site-pages/about-explore-view";
import { AboutHomeView } from "@/features/site-pages/about-home-view";
import { AboutLiveView } from "@/features/site-pages/about-live-view";

type AboutPageViewProps = {
  readonly themeId: LandingThemeId;
};

export function AboutPageView({ themeId }: AboutPageViewProps) {
  switch (themeId) {
    case "europe":
      return <AboutEuropeView themeId={themeId} />;
    case "live":
      return <AboutLiveView themeId={themeId} />;
    case "book":
      return <AboutBookView themeId={themeId} />;
    case "explore":
      return <AboutExploreView themeId={themeId} />;
    case "home":
    default:
      return <AboutHomeView themeId={themeId} />;
  }
}
