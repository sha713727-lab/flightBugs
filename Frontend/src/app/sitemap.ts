import type { MetadataRoute } from "next";

import { DEFAULT_LOCALE } from "@/constants/locales";
import { sitePagePaths } from "@/constants/sitePages";
import { env } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.NEXT_PUBLIC_APP_URL;
  const now = new Date();

  const entries: ReadonlyArray<{
    readonly path: string;
    readonly priority: number;
    readonly changeFrequency: "weekly" | "monthly";
  }> = [
    { path: `/${DEFAULT_LOCALE}`, priority: 1, changeFrequency: "weekly" },
    { path: sitePagePaths.about, priority: 0.6, changeFrequency: "monthly" },
    { path: sitePagePaths.contact, priority: 0.6, changeFrequency: "monthly" },
    { path: sitePagePaths.terms, priority: 0.5, changeFrequency: "monthly" },
    { path: sitePagePaths.privacy, priority: 0.5, changeFrequency: "monthly" },
  ];

  return entries.map((entry) => ({
    url: new URL(entry.path, base).toString(),
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
