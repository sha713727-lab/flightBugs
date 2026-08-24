import Image from "next/image";
import Link from "next/link";

import { CallPhoneButton } from "@/components/call-phone-button";
import { brandAssets } from "@/constants/brandAssets";
import { siteBrand } from "@/constants/siteBrand";
import {
  type LandingThemeId,
  landingThemes,
  siteCompanyLinks,
  siteDisclaimer,
  siteLegalLinks,
  sitePageHref,
} from "@/constants/sitePages";
import { supportEmail, supportPhone } from "@/constants/supportContact";
import { cn } from "@/utils/cn";

type SitePageFooterProps = {
  readonly themeId: LandingThemeId;
  readonly blurb?: string;
};

export function SitePageFooter({ themeId, blurb }: SitePageFooterProps) {
  const theme = landingThemes[themeId];
  const year = new Date().getFullYear();
  const { siteLogo } = brandAssets;
  const isDark = theme.footerTone === "dark";
  const isExplore = theme.layout === "soft-explore";
  const copy = blurb ?? theme.footerBlurb;

  return (
    <footer
      className={cn(
        isDark && "bg-footer text-white",
        isExplore &&
          "border-t border-[var(--explore-border)] bg-[var(--explore-surface)] text-[var(--explore-text)]",
        !isDark &&
          !isExplore &&
          "border-t border-border bg-white text-primary-text",
      )}
    >
      <div className={cn(theme.containerClassName, "py-14 md:py-16")}>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href={theme.homeHref}
              className="inline-flex items-center gap-2"
            >
              <Image
                src={siteLogo.src}
                alt={siteLogo.alt}
                width={siteLogo.width}
                height={siteLogo.height}
                className="h-10 w-10 object-contain"
              />
              <span className="text-[15px] font-bold">{siteBrand.chromeName}</span>
            </Link>
            <p
              className={cn(
                "mt-4 max-w-xs text-sm leading-relaxed",
                isDark ? "text-white/60" : "text-secondary-text",
              )}
            >
              {copy}
            </p>
            <div className="mt-5">
              <CallPhoneButton
                size="sm"
                className="rounded-[12px] bg-aviation-blue text-on-accent hover:bg-medium-blue"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul
              className={cn(
                "mt-4 space-y-2.5 text-sm",
                isDark ? "text-white/60" : "text-secondary-text",
              )}
            >
              {siteCompanyLinks.map((item) => (
                <li key={item.page}>
                  <Link
                    href={sitePageHref(item.page, themeId)}
                    className={
                      isDark ? "hover:text-white" : "hover:text-aviation-blue"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={supportPhone.href}
                  className={
                    isDark ? "hover:text-white" : "hover:text-aviation-blue"
                  }
                >
                  {supportPhone.display}
                </a>
              </li>
              <li>
                <a
                  href={supportEmail.href}
                  className={
                    isDark ? "hover:text-white" : "hover:text-aviation-blue"
                  }
                >
                  {supportEmail.display}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul
              className={cn(
                "mt-4 space-y-2.5 text-sm",
                isDark ? "text-white/60" : "text-secondary-text",
              )}
            >
              {siteLegalLinks.map((item) => (
                <li key={item.page}>
                  <Link
                    href={sitePageHref(item.page, themeId)}
                    className={
                      isDark ? "hover:text-white" : "hover:text-aviation-blue"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Search</h3>
            <ul
              className={cn(
                "mt-4 space-y-2.5 text-sm",
                isDark ? "text-white/60" : "text-secondary-text",
              )}
            >
              <li>
                <Link
                  href={theme.homeHref}
                  className={
                    isDark ? "hover:text-white" : "hover:text-aviation-blue"
                  }
                >
                  Back to {theme.label}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={cn(
            "mt-12 border-t pt-8",
            isDark
              ? "border-white/10"
              : isExplore
                ? "border-[var(--explore-border)]"
                : "border-border",
          )}
        >
          <p
            className={cn(
              "max-w-4xl text-xs leading-relaxed",
              isDark ? "text-white/45" : "text-secondary-text",
            )}
          >
            {siteDisclaimer}
          </p>
          <p
            className={cn(
              "mt-4 text-sm",
              isDark ? "text-white/45" : "text-secondary-text",
            )}
          >
            © {year} {siteBrand.chromeName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
