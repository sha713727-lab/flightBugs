import type { Metadata } from "next";

import { siteBrand } from "@/constants/siteBrand";
import {
  type LandingThemeId,
  landingThemes,
  sitePageHref,
  type SitePageKey,
  sitePagePaths,
} from "@/constants/sitePages";
import { env } from "@/lib/env";

function absoluteUrl(path: string): string {
  return new URL(path, env.NEXT_PUBLIC_APP_URL).toString();
}

export function buildSitePageMetadata(input: {
  readonly page: SitePageKey;
  readonly theme: LandingThemeId;
  readonly title: string;
  readonly description: string;
}): Metadata {
  const canonicalPath = sitePagePaths[input.page];
  const themedPath = sitePageHref(input.page, input.theme);
  const themeLabel = landingThemes[input.theme].label;

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: absoluteUrl(themedPath),
      siteName: siteBrand.legal,
      title: input.title,
      description: input.description,
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
    other: {
      "theme-variant": themeLabel,
    },
  };
}

export function buildLandingMetadata(input: {
  readonly title: string;
  readonly description: string;
  readonly path: string;
}): Metadata {
  const url = absoluteUrl(input.path);

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: siteBrand.legal,
      title: input.title,
      description: input.description,
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  };
}
