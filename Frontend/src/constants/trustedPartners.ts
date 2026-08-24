import { partnerLogos } from "@/constants/brandAssets";

function pickPartners(ids: ReadonlyArray<(typeof partnerLogos)[number]["id"]>) {
  return ids.flatMap((id) => {
    const logo = partnerLogos.find((item) => item.id === id);
    return logo ? [logo] : [];
  });
}

export const homePartnersCopy = {
  eyebrow: "Desk network",
  heading: "Carriers we ticket by phone",
  body: "Search the fare, then call. Specialists ticket Air Canada, Delta, United, and more — 24/7 for Canada and the USA.",
} as const;

export const homePartnersList = pickPartners([
  "airCanada",
  "westJet",
  "porter",
  "flair",
  "delta",
  "united",
  "british",
  "airFrance",
  "emirates",
  "qatar",
  "visa",
  "masterCard",
  "amex",
]);

export const europePartnersCopy = {
  eyebrow: "Worldwide network",
  heading: "Airlines & stays across the map",
  body: "From London and Paris to Tokyo — we ticket major carriers and coordinate hotel options. Independent desk, not an airline.",
} as const;

export const europePartnersList = pickPartners([
  "british",
  "airFrance",
  "lufthansa",
  "emirates",
  "qatar",
  "singapore",
  "delta",
  "united",
  "airCanada",
  "hilton",
  "wyndham",
  "booking",
  "expedia",
]);

export const livePartnersCopy = {
  eyebrow: "On the board",
  heading: "Live desks ticket these brands",
  body: "When you call the Live Desk, a specialist works real inventory across airlines and pay rails — no website checkout.",
} as const;

export const livePartnersList = pickPartners([
  "airCanada",
  "delta",
  "united",
  "british",
  "lufthansa",
  "emirates",
  "qatar",
  "singapore",
  "westJet",
  "porter",
  "visa",
  "amex",
  "blueRewards",
]);

export const adsPartnersCopy = {
  eyebrow: "Call with confidence",
  heading: "Brands travelers ask us to ticket",
  body: "See a live offer, then call. We confirm the fare with major airlines and trusted payment partners before anything is issued.",
} as const;

export const adsPartnersList = pickPartners([
  "airCanada",
  "westJet",
  "delta",
  "united",
  "emirates",
  "british",
  "airFrance",
  "hilton",
  "booking",
  "skyScanner",
  "visa",
  "masterCard",
  "amex",
]);

export const explorePartnersCopy = {
  eyebrow: "Trusted network",
  heading: "Airlines and brands we compare for you",
  body: "Search live options across major carriers, then call. Specialists confirm and ticket — no website checkout.",
} as const;

export const explorePartnersList = pickPartners([
  "airCanada",
  "delta",
  "united",
  "british",
  "airFrance",
  "lufthansa",
  "emirates",
  "qatar",
  "singapore",
  "skyScanner",
  "expedia",
  "visa",
  "amex",
]);

export type PartnersMarqueeVariant =
  | "home"
  | "europe"
  | "live"
  | "ads"
  | "explore";
