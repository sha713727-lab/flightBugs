import { europeLandingCopy, europeLandingPath } from "@/constants/destinationLandingContent";
import { siteBrand } from "@/constants/siteBrand";
import { supportPhone } from "@/constants/supportContact";
import { DestinationLandingPage } from "@/features/destination-landing/destination-landing-page";
import { ThemeDocumentClass } from "@/features/site-pages/theme-document-class";
import { buildLandingMetadata } from "@/lib/site-metadata";
export const metadata = buildLandingMetadata({
  title: `International Flights Worldwide | ${siteBrand.metadataTitle}`,
  description: `${europeLandingCopy.heroSupport} ${europeLandingCopy.announcement} Call ${supportPhone.display}.`,
  path: europeLandingPath,
});

export default function EuropeLandingRoute() {
  return (
    <>
      <ThemeDocumentClass themeId="europe" />
      <DestinationLandingPage />
    </>
  );
}