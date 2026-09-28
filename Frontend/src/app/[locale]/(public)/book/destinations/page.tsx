import { AdsHeader } from "@/features/ads-landing/ads-header";
import { SitePageShell } from "@/features/site-pages/site-page-shell";
import { DestinationIndexView } from "@/features/usa-destinations/destination-index-view";
import { destinationIndexMetadata } from "@/features/usa-destinations/destination-metadata";
import { loadDestinationPublicData } from "@/lib/destinations/fetch-destinations";

export const metadata = destinationIndexMetadata("book");

export default async function BookDestinationsIndexRoute() {
  const { destinations, destinationNav } = await loadDestinationPublicData();

  return (
    <SitePageShell
      themeId="book"
      header={<AdsHeader destinationNav={destinationNav} />}
    >
      <DestinationIndexView themeId="book" destinations={destinations} />
    </SitePageShell>
  );
}
