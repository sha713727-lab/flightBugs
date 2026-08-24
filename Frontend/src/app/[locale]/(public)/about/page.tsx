import type { Metadata } from "next";

import {
  aboutPageContent,
  parseLandingTheme,
} from "@/constants/sitePages";
import { AboutPageView } from "@/features/site-pages/about-page-view";
import { SitePageShell } from "@/features/site-pages/site-page-shell";
import { buildSitePageMetadata } from "@/lib/site-metadata";

type AboutPageProps = {
  readonly searchParams: Promise<{ readonly from?: string | string[] }>;
};

export async function generateMetadata({
  searchParams,
}: AboutPageProps): Promise<Metadata> {
  const params = await searchParams;
  const theme = parseLandingTheme(params.from);

  return buildSitePageMetadata({
    page: "about",
    theme,
    title: aboutPageContent.metaTitle,
    description: aboutPageContent.metaDescription,
  });
}

export default async function AboutPage({ searchParams }: AboutPageProps) {
  const params = await searchParams;
  const themeId = parseLandingTheme(params.from);

  return (
    <SitePageShell themeId={themeId}>
      <AboutPageView themeId={themeId} />
    </SitePageShell>
  );
}
