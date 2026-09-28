import { DEFAULT_LOCALE } from "@/constants/locales";
import { sitePageHref } from "@/constants/sitePages";

const localeRoot = `/${DEFAULT_LOCALE}`;

export const siteNavigation = [
  { label: "Home", href: localeRoot, kind: "link" as const },
  {
    label: "Destinations",
    href: `${localeRoot}/destinations`,
    kind: "destinations" as const,
  },
  {
    label: "About",
    href: sitePageHref("about", "home"),
    kind: "link" as const,
  },
  {
    label: "Contact",
    href: sitePageHref("contact", "home"),
    kind: "link" as const,
  },
  { label: "FAQ", href: `${localeRoot}#faq`, kind: "link" as const },
] as const;
