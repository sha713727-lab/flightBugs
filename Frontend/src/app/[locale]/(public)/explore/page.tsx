import {
  exploreLandingCopy,
  exploreLandingPath,
} from "@/constants/exploreLandingContent";
import { siteBrand } from "@/constants/siteBrand";
import { supportPhone } from "@/constants/supportContact";
import { ExploreLandingPage } from "@/features/explore-landing/explore-landing-page";
import { ThemeDocumentClass } from "@/features/site-pages/theme-document-class";
import { fetchDestinationNav } from "@/lib/destinations/fetch-destinations";
import { buildLandingMetadata } from "@/lib/site-metadata";

export const metadata = buildLandingMetadata({
  title: `Explore International Flights | ${siteBrand.metadataTitle}`,
  description: `${exploreLandingCopy.heroHeading} ${exploreLandingCopy.spine} Call ${supportPhone.display}.`,
  path: exploreLandingPath,
});

export default async function ExploreLandingRoute() {
  const destinationNav = await fetchDestinationNav();

  return (
    <>
      <ThemeDocumentClass themeId="explore" />
      <ExploreLandingPage destinationNav={destinationNav} />
    </>
  );
}
