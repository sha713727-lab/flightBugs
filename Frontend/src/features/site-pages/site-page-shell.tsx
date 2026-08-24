import type { ReactNode } from "react";

import { SitePageFooter } from "@/components/site-page-footer";
import {
  type LandingThemeId,
  landingThemes,
} from "@/constants/sitePages";
import { SitePageHeader } from "@/features/site-pages/site-page-header";
import { ThemeDocumentClass } from "@/features/site-pages/theme-document-class";
import { cn } from "@/utils/cn";

type SitePageShellProps = {
  readonly themeId: LandingThemeId;
  readonly children: ReactNode;
};

export function SitePageShell({ themeId, children }: SitePageShellProps) {
  const theme = landingThemes[themeId];

  return (
    <div className={cn("flex min-h-full flex-1 flex-col", theme.rootClassName)}>
      <ThemeDocumentClass themeId={themeId} />
      <SitePageHeader themeId={themeId} />
      <main className="flex-1">{children}</main>
      <SitePageFooter themeId={themeId} />
    </div>
  );
}
