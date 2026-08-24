import { DEFAULT_LOCALE } from "@/constants/locales";
import { sitePageHref } from "@/constants/sitePages";

const localeRoot = `/${DEFAULT_LOCALE}`;

export const siteNavigation = [
  { label: "Home", href: localeRoot },
  { label: "Destinations", href: `${localeRoot}#destinations` },
  { label: "About", href: sitePageHref("about", "home") },
  { label: "Contact", href: sitePageHref("contact", "home") },
  { label: "FAQ", href: `${localeRoot}#faq` },
] as const;
