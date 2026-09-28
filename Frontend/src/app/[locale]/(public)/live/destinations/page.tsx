import { LiveHeader } from "@/features/live-landing/live-header";
import { SitePageShell } from "@/features/site-pages/site-page-shell";
import { DestinationIndexView } from "@/features/usa-destinations/destination-index-view";
import { destinationIndexMetadata } from "@/features/usa-destinations/destination-metadata";
import { loadDestinationPublicData } from "@/lib/destinations/fetch-destinations";

export const metadata = destinationIndexMetadata("live");

export default async function LiveDestinationsIndexRoute() {
  const { destinations, destinationNav } = await loadDestinationPublicData();

  return (
    <SitePageShell
      themeId="live"
      header={<LiveHeader destinationNav={destinationNav} />}
    >
      <DestinationIndexView themeId="live" destinations={destinations} />
    </SitePageShell>
  );
}
