import { SiteHeader } from "@/components/site-header";
import { SitePageShell } from "@/features/site-pages/site-page-shell";
import { DestinationIndexView } from "@/features/usa-destinations/destination-index-view";
import { destinationIndexMetadata } from "@/features/usa-destinations/destination-metadata";
import { loadDestinationPublicData } from "@/lib/destinations/fetch-destinations";

export const metadata = destinationIndexMetadata("home");

export default async function DestinationsIndexRoute() {
  const { destinations, destinationNav } = await loadDestinationPublicData();

  return (
    <SitePageShell
      themeId="home"
      header={
        <SiteHeader destinationNav={destinationNav} placement="bar" />
      }
    >
      <DestinationIndexView themeId="home" destinations={destinations} />
    </SitePageShell>
  );
}
