import type { Metadata } from "next";

import {
  destinationIndexPath,
  destinationSlugPath,
} from "@/constants/destinationPaths";
import type { LandingThemeId } from "@/constants/sitePages";
import { env } from "@/lib/env";
import { buildLandingMetadata } from "@/lib/site-metadata";
import type { DestinationDetail } from "@/types/destinations";

function absoluteUrl(path: string): string {
  return new URL(path, env.NEXT_PUBLIC_APP_URL).toString();
}

export function destinationIndexMetadata(
  themeId: LandingThemeId,
): Metadata {
  const canonicalPath = destinationIndexPath("home");
  const metadata = buildLandingMetadata({
    title: "USA Destinations | FlightBugs",
    description:
      "Explore USA destinations and book international or domestic flights by phone with FlightBugs.",
    path: canonicalPath,
  });

  if (themeId === "home") {
    return metadata;
  }

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      url: absoluteUrl(destinationIndexPath(themeId)),
    },
  };
}

export function destinationSlugMetadata(
  themeId: LandingThemeId,
  destination: DestinationDetail,
): Metadata {
  const canonicalPath = destinationSlugPath("home", destination.slug);
  const metadata = buildLandingMetadata({
    title: destination.metaTitle,
    description: destination.metaDescription,
    path: canonicalPath,
  });
  const ogImage =
    destination.ogImage?.publicPath ?? destination.heroImage?.publicPath;

  const themedUrl = absoluteUrl(
    destinationSlugPath(themeId, destination.slug),
  );

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      url: themedUrl,
      title: destination.ogTitle ?? destination.metaTitle,
      description: destination.ogDescription ?? destination.metaDescription,
      ...(ogImage
        ? {
            images: [
              { url: new URL(ogImage, env.NEXT_PUBLIC_APP_URL).toString() },
            ],
          }
        : {}),
    },
  };
}
