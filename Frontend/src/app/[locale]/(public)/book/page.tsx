import { adsLandingCopy, adsLandingPath } from "@/constants/adsLandingContent";
import { siteBrand } from "@/constants/siteBrand";
import { supportPhone } from "@/constants/supportContact";
import { AdsLandingPage } from "@/features/ads-landing/ads-landing-page";
import { ThemeDocumentClass } from "@/features/site-pages/theme-document-class";
import { buildLandingMetadata } from "@/lib/site-metadata";

export const metadata = buildLandingMetadata({
  title: `Book International Flights by Phone | ${siteBrand.metadataTitle}`,
  description: `${adsLandingCopy.heading} ${adsLandingCopy.sub} Call ${supportPhone.display}.`,
  path: adsLandingPath,
});

export default function AdsLandingRoute() {
  return (
    <>
      <ThemeDocumentClass themeId="book" />
      <AdsLandingPage />
    </>
  );
}
