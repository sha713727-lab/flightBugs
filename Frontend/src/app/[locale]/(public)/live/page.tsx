import { liveLandingCopy, liveLandingPath } from "@/constants/liveLandingContent";
import { siteBrand } from "@/constants/siteBrand";
import { supportPhone } from "@/constants/supportContact";
import { LiveLandingPage } from "@/features/live-landing/live-landing-page";
import { ThemeDocumentClass } from "@/features/site-pages/theme-document-class";
import { buildLandingMetadata } from "@/lib/site-metadata";
export const metadata = buildLandingMetadata({
  title: `${siteBrand.liveDesk} | ${siteBrand.metadataTitle}`,
  description: `${liveLandingCopy.spine} ${liveLandingCopy.availability} Call ${supportPhone.display}.`,
  path: liveLandingPath,
});

export default function LiveLandingRoute() {
  return (
    <>
      <ThemeDocumentClass themeId="live" />
      <LiveLandingPage />
    </>
  );
}