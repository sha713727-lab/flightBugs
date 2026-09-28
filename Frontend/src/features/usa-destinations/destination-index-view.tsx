import type { LandingThemeId } from "@/constants/sitePages";
import { DestinationBookIndex } from "@/features/usa-destinations/destination-book-index";
import { DestinationEuropeIndex } from "@/features/usa-destinations/destination-europe-index";
import { DestinationExploreIndex } from "@/features/usa-destinations/destination-explore-index";
import { DestinationLiveIndex } from "@/features/usa-destinations/destination-live-index";
import { UsaDestinationsIndex } from "@/features/usa-destinations/usa-destinations-index";
import type { DestinationSummary } from "@/types/destinations";

type DestinationIndexViewProps = {
  readonly themeId: LandingThemeId;
  readonly destinations: ReadonlyArray<DestinationSummary>;
};

export function DestinationIndexView({
  themeId,
  destinations,
}: DestinationIndexViewProps) {
  switch (themeId) {
    case "europe":
      return (
        <DestinationEuropeIndex
          themeId={themeId}
          destinations={destinations}
        />
      );
    case "live":
      return (
        <DestinationLiveIndex themeId={themeId} destinations={destinations} />
      );
    case "book":
      return (
        <DestinationBookIndex themeId={themeId} destinations={destinations} />
      );
    case "explore":
      return (
        <DestinationExploreIndex
          themeId={themeId}
          destinations={destinations}
        />
      );
    case "home":
    default:
      return (
        <UsaDestinationsIndex themeId={themeId} destinations={destinations} />
      );
  }
}
