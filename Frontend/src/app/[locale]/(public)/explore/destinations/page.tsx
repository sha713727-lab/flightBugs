import { ExploreHeader } from "@/features/explore-landing/explore-header";
import { SitePageShell } from "@/features/site-pages/site-page-shell";
import { DestinationIndexView } from "@/features/usa-destinations/destination-index-view";
import { destinationIndexMetadata } from "@/features/usa-destinations/destination-metadata";
import { loadDestinationPublicData } from "@/lib/destinations/fetch-destinations";

export const metadata = destinationIndexMetadata("explore");

export default async function ExploreDestinationsIndexRoute() {
  const { destinations, destinationNav } = await loadDestinationPublicData();

  return (
    <SitePageShell
      themeId="explore"
      header={<ExploreHeader destinationNav={destinationNav} />}
    >
      <DestinationIndexView themeId="explore" destinations={destinations} />
    </SitePageShell>
  );
}
