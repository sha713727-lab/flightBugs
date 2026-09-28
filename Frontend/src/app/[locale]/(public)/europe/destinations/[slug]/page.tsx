import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LandingHeader } from "@/features/destination-landing/landing-header";
import { SitePageShell } from "@/features/site-pages/site-page-shell";
import { destinationSlugMetadata } from "@/features/usa-destinations/destination-metadata";
import { DestinationPageView } from "@/features/usa-destinations/destination-page-view";
import { DestinationStructuredData } from "@/features/usa-destinations/destination-structured-data";
import {
  fetchDestinationBySlug,
  fetchDestinationNav,
} from "@/lib/destinations/fetch-destinations";

export const dynamic = "force-dynamic";

type DestinationSlugPageProps = {
  readonly params: Promise<{ readonly locale: string; readonly slug: string }>;
};

export async function generateMetadata({
  params,
}: DestinationSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = await fetchDestinationBySlug(slug);
  if (!destination) {
    return { title: "Destination not found" };
  }
  return destinationSlugMetadata("europe", destination);
}

export default async function EuropeDestinationSlugRoute({
  params,
}: DestinationSlugPageProps) {
  const { slug } = await params;
  const [destination, destinationNav] = await Promise.all([
    fetchDestinationBySlug(slug),
    fetchDestinationNav(),
  ]);
  if (!destination) {
    notFound();
  }

  return (
    <SitePageShell
      themeId="europe"
      header={<LandingHeader destinationNav={destinationNav} />}
    >
      <DestinationStructuredData destination={destination} />
      <DestinationPageView themeId="europe" destination={destination} />
    </SitePageShell>
  );
}
