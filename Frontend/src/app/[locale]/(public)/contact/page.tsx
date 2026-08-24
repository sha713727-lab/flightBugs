import type { Metadata } from "next";

import {
  contactPageContent,
  parseLandingTheme,
} from "@/constants/sitePages";
import { ContactPageView } from "@/features/site-pages/contact-page-view";
import { SitePageShell } from "@/features/site-pages/site-page-shell";
import { buildSitePageMetadata } from "@/lib/site-metadata";

type ContactPageProps = {
  readonly searchParams: Promise<{ readonly from?: string | string[] }>;
};

export async function generateMetadata({
  searchParams,
}: ContactPageProps): Promise<Metadata> {
  const params = await searchParams;
  const theme = parseLandingTheme(params.from);

  return buildSitePageMetadata({
    page: "contact",
    theme,
    title: contactPageContent.metaTitle,
    description: contactPageContent.metaDescription,
  });
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const themeId = parseLandingTheme(params.from);

  return (
    <SitePageShell themeId={themeId}>
      <ContactPageView themeId={themeId} />
    </SitePageShell>
  );
}
