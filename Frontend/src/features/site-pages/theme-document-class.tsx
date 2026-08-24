"use client";

import { useEffect } from "react";

import {
  type LandingThemeId,
  landingThemes,
} from "@/constants/sitePages";

const MANAGED_HTML_CLASSES = [
  "destination-landing-active",
  "live-landing-active",
  "ads-landing-active",
  "explore-landing-active",
] as const;

type ThemeDocumentClassProps = {
  readonly themeId: LandingThemeId;
};

export function ThemeDocumentClass({ themeId }: ThemeDocumentClassProps) {
  useEffect(() => {
    const root = document.documentElement;
    const nextClass = landingThemes[themeId].htmlClassName;

    for (const className of MANAGED_HTML_CLASSES) {
      root.classList.remove(className);
    }

    if (nextClass) {
      root.classList.add(nextClass);
    }

    return () => {
      if (nextClass) {
        root.classList.remove(nextClass);
      }
    };
  }, [themeId]);

  return null;
}
