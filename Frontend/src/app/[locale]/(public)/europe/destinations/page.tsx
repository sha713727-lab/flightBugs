import { LandingHeader } from "@/features/destination-landing/landing-header";
import { SitePageShell } from "@/features/site-pages/site-page-shell";
import { DestinationIndexView } from "@/features/usa-destinations/destination-index-view";
import { destinationIndexMetadata } from "@/features/usa-destinations/destination-metadata";
import { loadDestinationPublicData } from "@/lib/destinations/fetch-destinations";

export const metadata = destinationIndexMetadata("europe");

export default async function EuropeDestinationsIndexRoute() {
  const { destinations, destinationNav } = await loadDestinationPublicData();

  return (
    <SitePageShell
      themeId="europe"
      header={<LandingHeader destinationNav={destinationNav} />}
    >
      <DestinationIndexView themeId="europe" destinations={destinations} />
    </SitePageShell>
  );
}
