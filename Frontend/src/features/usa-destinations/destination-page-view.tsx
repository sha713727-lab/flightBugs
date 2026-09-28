import type { LandingThemeId } from "@/constants/sitePages";
import { DestinationBookPage } from "@/features/usa-destinations/destination-book-page";
import { DestinationEuropePage } from "@/features/usa-destinations/destination-europe-page";
import { DestinationExplorePage } from "@/features/usa-destinations/destination-explore-page";
import { DestinationLivePage } from "@/features/usa-destinations/destination-live-page";
import { UsaDestinationPage } from "@/features/usa-destinations/usa-destination-page";
import type { DestinationDetail } from "@/types/destinations";

type DestinationPageViewProps = {
  readonly themeId: LandingThemeId;
  readonly destination: DestinationDetail;
};

export function DestinationPageView({
  themeId,
  destination,
}: DestinationPageViewProps) {
  switch (themeId) {
    case "europe":
      return (
        <DestinationEuropePage themeId={themeId} destination={destination} />
      );
    case "live":
      return (
        <DestinationLivePage themeId={themeId} destination={destination} />
      );
    case "book":
      return (
        <DestinationBookPage themeId={themeId} destination={destination} />
      );
    case "explore":
      return (
        <DestinationExplorePage themeId={themeId} destination={destination} />
      );
    case "home":
    default:
      return (
        <UsaDestinationPage themeId={themeId} destination={destination} />
      );
  }
}
