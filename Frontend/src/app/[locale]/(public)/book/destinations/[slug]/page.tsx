import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AdsHeader } from "@/features/ads-landing/ads-header";
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
  return destinationSlugMetadata("book", destination);
}

export default async function BookDestinationSlugRoute({
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
      themeId="book"
      header={<AdsHeader destinationNav={destinationNav} />}
    >
      <DestinationStructuredData destination={destination} />
      <DestinationPageView themeId="book" destination={destination} />
    </SitePageShell>
  );
}
