import {
  exploreLandingCopy,
  exploreLandingPath,
} from "@/constants/exploreLandingContent";
import { siteBrand } from "@/constants/siteBrand";
import { supportPhone } from "@/constants/supportContact";
import { ExploreLandingPage } from "@/features/explore-landing/explore-landing-page";
import { ThemeDocumentClass } from "@/features/site-pages/theme-document-class";
import { buildLandingMetadata } from "@/lib/site-metadata";
export const metadata = buildLandingMetadata({
  title: `Explore International Flights | ${siteBrand.metadataTitle}`,
  description: `${exploreLandingCopy.heroHeading} ${exploreLandingCopy.spine} Call ${supportPhone.display}.`,
  path: exploreLandingPath,
});

export default function ExploreLandingRoute() {
  return (
    <>
      <ThemeDocumentClass themeId="explore" />
      <ExploreLandingPage />
    </>
  );
}