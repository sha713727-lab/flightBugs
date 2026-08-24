import type { Metadata } from "next";

import {
  parseLandingTheme,
  privacyPageContent,
} from "@/constants/sitePages";
import { LegalDocumentView } from "@/features/site-pages/legal-document-view";
import { SitePageShell } from "@/features/site-pages/site-page-shell";
import { buildSitePageMetadata } from "@/lib/site-metadata";

type PrivacyPageProps = {
  readonly searchParams: Promise<{ readonly from?: string | string[] }>;
};

export async function generateMetadata({
  searchParams,
}: PrivacyPageProps): Promise<Metadata> {
  const params = await searchParams;
  const theme = parseLandingTheme(params.from);

  return buildSitePageMetadata({
    page: "privacy",
    theme,
    title: privacyPageContent.metaTitle,
    description: privacyPageContent.metaDescription,
  });
}

export default async function PrivacyPage({ searchParams }: PrivacyPageProps) {
  const params = await searchParams;
  const themeId = parseLandingTheme(params.from);

  return (
    <SitePageShell themeId={themeId}>
      <LegalDocumentView
        themeId={themeId}
        title="Privacy policy"
        intro={privacyPageContent.intro}
        updatedLabel={privacyPageContent.updatedLabel}
        updatedDate={privacyPageContent.updatedDate}
        sections={privacyPageContent.sections}
      />
    </SitePageShell>
  );
}
