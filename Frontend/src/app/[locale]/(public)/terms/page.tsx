import type { Metadata } from "next";

import {
  parseLandingTheme,
  termsPageContent,
} from "@/constants/sitePages";
import { LegalDocumentView } from "@/features/site-pages/legal-document-view";
import { SitePageShell } from "@/features/site-pages/site-page-shell";
import { buildSitePageMetadata } from "@/lib/site-metadata";

type TermsPageProps = {
  readonly searchParams: Promise<{ readonly from?: string | string[] }>;
};

export async function generateMetadata({
  searchParams,
}: TermsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const theme = parseLandingTheme(params.from);

  return buildSitePageMetadata({
    page: "terms",
    theme,
    title: termsPageContent.metaTitle,
    description: termsPageContent.metaDescription,
  });
}

export default async function TermsPage({ searchParams }: TermsPageProps) {
  const params = await searchParams;
  const themeId = parseLandingTheme(params.from);

  return (
    <SitePageShell themeId={themeId}>
      <LegalDocumentView
        themeId={themeId}
        title="Terms & conditions"
        intro={termsPageContent.intro}
        updatedLabel={termsPageContent.updatedLabel}
        updatedDate={termsPageContent.updatedDate}
        sections={termsPageContent.sections}
      />
    </SitePageShell>
  );
}
