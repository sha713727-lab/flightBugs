import { DEFAULT_LOCALE } from "@/constants/locales";
import {
  type LandingThemeId,
  landingThemes,
} from "@/constants/sitePages";

export function destinationIndexPath(themeId: LandingThemeId): string {
  if (themeId === "home") {
    return `/${DEFAULT_LOCALE}/destinations`;
  }
  return `${landingThemes[themeId].homeHref}/destinations`;
}

export function destinationSlugPath(
  themeId: LandingThemeId,
  slug: string,
): string {
  return `${destinationIndexPath(themeId)}/${slug}`;
}
