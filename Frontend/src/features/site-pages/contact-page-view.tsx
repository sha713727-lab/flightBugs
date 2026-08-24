import type { LandingThemeId } from "@/constants/sitePages";
import { ContactBookView } from "@/features/site-pages/contact-book-view";
import { ContactEuropeView } from "@/features/site-pages/contact-europe-view";
import { ContactExploreView } from "@/features/site-pages/contact-explore-view";
import { ContactHomeView } from "@/features/site-pages/contact-home-view";
import { ContactLiveView } from "@/features/site-pages/contact-live-view";

type ContactPageViewProps = {
  readonly themeId: LandingThemeId;
};

export function ContactPageView({ themeId }: ContactPageViewProps) {
  switch (themeId) {
    case "europe":
      return <ContactEuropeView themeId={themeId} />;
    case "live":
      return <ContactLiveView themeId={themeId} />;
    case "book":
      return <ContactBookView themeId={themeId} />;
    case "explore":
      return <ContactExploreView themeId={themeId} />;
    case "home":
    default:
      return <ContactHomeView themeId={themeId} />;
  }
}
