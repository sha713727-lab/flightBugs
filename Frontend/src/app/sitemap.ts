import type { MetadataRoute } from "next";

import { DEFAULT_LOCALE } from "@/constants/locales";
import { sitePagePaths } from "@/constants/sitePages";
import { fetchPublishedDestinations } from "@/lib/destinations/fetch-destinations";
import { env } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.NEXT_PUBLIC_APP_URL;
  const now = new Date();

  const staticEntries: ReadonlyArray<{
    readonly path: string;
    readonly priority: number;
    readonly changeFrequency: "weekly" | "monthly";
  }> = [
    { path: `/${DEFAULT_LOCALE}`, priority: 1, changeFrequency: "weekly" },
    {
      path: `/${DEFAULT_LOCALE}/destinations`,
      priority: 0.8,
      changeFrequency: "weekly",
    },
    { path: sitePagePaths.about, priority: 0.6, changeFrequency: "monthly" },
    { path: sitePagePaths.contact, priority: 0.6, changeFrequency: "monthly" },
    { path: sitePagePaths.terms, priority: 0.5, changeFrequency: "monthly" },
    { path: sitePagePaths.privacy, priority: 0.5, changeFrequency: "monthly" },
  ];

  const destinations = await fetchPublishedDestinations();
  const destinationEntries = destinations.map((destination) => ({
    url: new URL(
      `/${DEFAULT_LOCALE}/destinations/${destination.slug}`,
      base,
    ).toString(),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticEntries.map((entry) => ({
      url: new URL(entry.path, base).toString(),
      lastModified: now,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    })),
    ...destinationEntries,
  ];
}
