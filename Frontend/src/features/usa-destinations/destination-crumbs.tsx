import Link from "next/link";

import { destinationIndexPath } from "@/constants/destinationPaths";
import {
  type LandingThemeId,
  landingThemes,
} from "@/constants/sitePages";
import { cn } from "@/utils/cn";

type DestinationCrumbsProps = {
  readonly themeId: LandingThemeId;
  readonly destinationName?: string;
  readonly className?: string;
};

export function DestinationCrumbs({
  themeId,
  destinationName,
  className,
}: DestinationCrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("text-sm text-secondary-text", className)}
    >
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link
            href={landingThemes[themeId].homeHref}
            className="hover:text-aviation-blue"
          >
            {landingThemes[themeId].label}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          {destinationName ? (
            <Link
              href={destinationIndexPath(themeId)}
              className="hover:text-aviation-blue"
            >
              Destinations
            </Link>
          ) : (
            <span className="font-medium text-primary-text">Destinations</span>
          )}
        </li>
        {destinationName ? (
          <>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-primary-text">{destinationName}</li>
          </>
        ) : null}
      </ol>
    </nav>
  );
}
