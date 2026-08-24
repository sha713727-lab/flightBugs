import { adsLandingPath } from "@/constants/adsLandingContent";
import { europeLandingPath } from "@/constants/destinationLandingContent";
import { exploreLandingPath } from "@/constants/exploreLandingContent";
import { liveLandingPath } from "@/constants/liveLandingContent";
import { DEFAULT_LOCALE } from "@/constants/locales";
import { siteBrand } from "@/constants/siteBrand";
import { supportEmail, supportPhone } from "@/constants/supportContact";

const localeRoot = `/${DEFAULT_LOCALE}` as const;

export const sitePagePaths = {
  about: `${localeRoot}/about`,
  contact: `${localeRoot}/contact`,
  terms: `${localeRoot}/terms`,
  privacy: `${localeRoot}/privacy`,
} as const;

export type SitePageKey = keyof typeof sitePagePaths;

export const landingThemeIds = [
  "home",
  "europe",
  "live",
  "book",
  "explore",
] as const;

export type LandingThemeId = (typeof landingThemeIds)[number];

export type LandingPageLayout =
  | "dark-aviation"
  | "editorial-blue"
  | "signal-live"
  | "paper-book"
  | "soft-explore";

export function isLandingThemeId(value: string): value is LandingThemeId {
  return (landingThemeIds as ReadonlyArray<string>).includes(value);
}

export function parseLandingTheme(
  value: string | string[] | undefined,
): LandingThemeId {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw && isLandingThemeId(raw)) {
    return raw;
  }
  return "home";
}

export function sitePageHref(
  page: SitePageKey,
  theme: LandingThemeId = "home",
): string {
  const path = sitePagePaths[page];
  if (theme === "home") {
    return path;
  }
  return `${path}?from=${theme}`;
}

export const siteCompanyLinks = [
  { label: "About us", page: "about" as const },
  { label: "Contact us", page: "contact" as const },
] as const;

export const siteLegalLinks = [
  { label: "Terms & conditions", page: "terms" as const },
  { label: "Privacy policy", page: "privacy" as const },
] as const;

export const siteDisclaimer =
  `${siteBrand.legal} is an independent international flight booking desk serving travelers in Canada and the USA. We are not an airline and are not affiliated with any carrier. Live fares, taxes, and availability can change until a specialist confirms and tickets your itinerary by phone. Searching on this website does not create a booking. Ticketing is completed by phone at ${supportPhone.display}.` as const;

export type LandingThemeConfig = {
  readonly id: LandingThemeId;
  readonly label: string;
  readonly homeHref: string;
  readonly htmlClassName: string | null;
  readonly rootClassName: string;
  readonly containerClassName: string;
  readonly footerTone: "dark" | "light";
  readonly layout: LandingPageLayout;
  readonly aboutEyebrow: string;
  readonly aboutHeading: string;
  readonly aboutLead: string;
  readonly contactEyebrow: string;
  readonly contactHeading: string;
  readonly contactLead: string;
  readonly footerBlurb: string;
};

export const landingThemes: Record<LandingThemeId, LandingThemeConfig> = {
  home: {
    id: "home",
    label: "Home",
    homeHref: localeRoot,
    htmlClassName: null,
    rootClassName: "bg-main-bg text-primary-text",
    containerClassName: "container-avion",
    footerTone: "dark",
    layout: "dark-aviation",
    aboutEyebrow: "About the desk",
    aboutHeading: "International flights, ticketed by specialists.",
    aboutLead:
      "Search live routes on our aviation desk, then call. We ticket by phone — 24/7 for Canada and the USA.",
    contactEyebrow: "Contact",
    contactHeading: "Talk to a flight specialist.",
    contactLead:
      "The fastest path to a confirmed ticket is a phone call. Our desk is open around the clock.",
    footerBlurb:
      "You search, we ticket by phone. Award-winning service 24/7 for Canada and the USA.",
  },
  europe: {
    id: "europe",
    label: "Worldwide",
    homeHref: europeLandingPath,
    htmlClassName: "destination-landing-active",
    rootClassName: "destination-landing bg-white text-primary-text",
    containerClassName: "container-avion",
    footerTone: "dark",
    layout: "editorial-blue",
    aboutEyebrow: "Our worldwide desk",
    aboutHeading: "Flights worldwide. Clarity on every call.",
    aboutLead:
      "From North America to Europe, Asia, and beyond — you search destinations here, then a specialist tickets the itinerary by phone.",
    contactEyebrow: "Reach the desk",
    contactHeading: "Plan the route. Call to ticket.",
    contactLead:
      "Whether you are comparing cities or locked on dates, call and we will ticket the live fare.",
    footerBlurb:
      "International destinations worldwide. Search here, ticket by phone — 24/7 for Canada and the USA.",
  },
  live: {
    id: "live",
    label: "Live desk",
    homeHref: liveLandingPath,
    htmlClassName: "live-landing-active",
    rootClassName: "live-landing bg-white text-primary-text",
    containerClassName: "container-avion",
    footerTone: "light",
    layout: "signal-live",
    aboutEyebrow: siteBrand.liveDesk,
    aboutHeading: "Always on. Always international.",
    aboutLead:
      "This desk is built for speed: search live offers, then reach a specialist who tickets while the fare is still live.",
    contactEyebrow: "On the line",
    contactHeading: "Call the live desk now.",
    contactLead:
      "Fares move. When you are ready, call — a specialist verifies price, rules, and seats before ticketing.",
    footerBlurb: `${siteBrand.liveDesk}. Search first. Ticket by phone.`,
  },
  book: {
    id: "book",
    label: "Book",
    homeHref: adsLandingPath,
    htmlClassName: "ads-landing-active",
    rootClassName: "ads-landing bg-main-bg text-primary-text",
    containerClassName: "container-avion",
    footerTone: "light",
    layout: "paper-book",
    aboutEyebrow: "How booking works here",
    aboutHeading: "Search here. Ticket by phone.",
    aboutLead:
      "This page is built for decisive travelers: see live international options, then call so a specialist can ticket without website checkout.",
    contactEyebrow: "Book by phone",
    contactHeading: "Ready when you are — including 2am.",
    contactLead:
      "Tap the number. Tell us the route and dates. We confirm the live fare and ticket on the call.",
    footerBlurb:
      "International flights. Ticketed by phone. No website checkout.",
  },
  explore: {
    id: "explore",
    label: "Explore",
    homeHref: exploreLandingPath,
    htmlClassName: "explore-landing-active",
    rootClassName:
      "explore-landing bg-[var(--explore-bg)] text-[var(--explore-text)]",
    containerClassName: "explore-container",
    footerTone: "light",
    layout: "soft-explore",
    aboutEyebrow: "Travel intelligence",
    aboutHeading: "Compare with clarity. Ticket with confidence.",
    aboutLead:
      "Explore is our search-first experience: discover destinations, compare options clearly, then call to ticket the live offer.",
    contactEyebrow: "Plan with a specialist",
    contactHeading: "Bring the trip. We’ll map the options.",
    contactLead:
      "Share destination, dates, and priorities. A specialist helps you choose, then tickets by phone.",
    footerBlurb:
      "Search-first travel intelligence. Ticketing stays on the phone.",
  },
};

export const aboutPageContent = {
  metaTitle: `About Us | ${siteBrand.metadataTitle}`,
  metaDescription: `${siteBrand.legal} helps travelers in Canada and the USA search international flights and ticket by phone with award-winning specialists 24/7. Call ${supportPhone.display}.`,
  missionHeading: "What we do",
  missionBody:
    "We help you search live international flight options, understand the trade-offs, and complete ticketing with a specialist by phone. There is no website checkout — confirmation happens on the call.",
  valuesHeading: "How we work",
  values: [
    {
      title: "Search first",
      body: "Use the on-page search to explore routes and dates before you call.",
    },
    {
      title: "Human ticketing",
      body: "A specialist verifies the live fare, rules, and seats, then tickets your itinerary by phone.",
    },
    {
      title: "Always available",
      body: "Award-winning service for Canada and the USA — day or night.",
    },
  ],
  regionsHeading: "Who we serve",
  regionsBody:
    "Travelers across Canada and the United States booking international flights worldwide.",
} as const;

export const contactPageContent = {
  metaTitle: `Contact Us | ${siteBrand.metadataTitle}`,
  metaDescription: `Contact ${siteBrand.legal}. Call ${supportPhone.display} 24/7 or email ${supportEmail.display} for international flights in Canada and the USA.`,
  phoneHeading: "Phone desk",
  phoneBody:
    "Calling is the primary way to ticket. Specialists confirm live itineraries on the line.",
  emailHeading: "Email",
  emailBody:
    "Write us at our overall contact address for compliance, privacy, and general inquiries.",
  hoursHeading: "Hours",
  hoursBody: "Open 24 hours a day, 7 days a week.",
  regionsHeading: "Service area",
  regionsBody: "Canada and the United States.",
  tipHeading: "Before you call",
  tipBody:
    "Have your preferred dates, airports, and passenger count ready. If you already searched on the site, mention the route so we can match the live offer faster.",
} as const;

export type LegalSection = {
  readonly heading: string;
  readonly paragraphs: ReadonlyArray<string>;
};

export const termsPageContent = {
  metaTitle: `Terms & Conditions | ${siteBrand.metadataTitle}`,
  metaDescription: `Terms and conditions for using ${siteBrand.legal} flight search and phone ticketing services.`,
  updatedLabel: "Last updated",
  updatedDate: "August 22, 2026",
  intro:
    "These terms govern your use of this website and our phone-based international flight ticketing services. By using the site or calling the desk, you agree to these terms.",
  sections: [
    {
      heading: "1. Who we are",
      paragraphs: [
        `${siteBrand.legal} operates an independent flight search and phone ticketing desk for travelers in Canada and the USA.`,
        "We are not an airline. Ticketing is completed by phone with a specialist.",
      ],
    },
    {
      heading: "2. Website use",
      paragraphs: [
        "The website lets you search and compare flight options for research and planning. Displayed prices, schedules, and availability are informational and may change without notice.",
        "Submitting a search does not reserve seats, hold a fare, or create a binding booking.",
      ],
    },
    {
      heading: "3. Phone ticketing",
      paragraphs: [
        `Bookings are completed by telephone at ${supportPhone.display}. On the call, a specialist confirms the live fare, taxes, baggage rules, and passenger details before ticketing.`,
        "You are responsible for providing accurate traveler names and contact information that match travel documents.",
      ],
    },
    {
      heading: "4. Fares, taxes, and changes",
      paragraphs: [
        "Airline fares and rules can change quickly. The fare that matters is the one confirmed by a specialist at the time of ticketing.",
        "Changes, cancellations, refunds, and baggage fees are governed by the airline’s fare rules and any applicable supplier terms explained on the call.",
      ],
    },
    {
      heading: "5. Service area",
      paragraphs: [
        "Services are intended for customers in Canada and the United States. We may decline requests outside that scope.",
      ],
    },
    {
      heading: "6. Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by law, we are not liable for airline schedule changes, cancellations, denied boarding, immigration decisions, or third-party supplier actions.",
        "Website content is provided for general information. Always confirm critical details with a specialist before travel.",
      ],
    },
    {
      heading: "7. Contact",
      paragraphs: [
        `Questions about these terms: call ${supportPhone.display} or email ${supportEmail.display}.`,
      ],
    },
  ] as const satisfies ReadonlyArray<LegalSection>,
} as const;

export const privacyPageContent = {
  metaTitle: `Privacy Policy | ${siteBrand.metadataTitle}`,
  metaDescription: `Privacy policy for ${siteBrand.legal}. How we handle information when you search flights and call our ticketing desk.`,
  updatedLabel: "Last updated",
  updatedDate: "August 22, 2026",
  intro:
    "This policy explains what information we handle when you use our website or call our desk, and how we use it to provide international flight search and phone ticketing.",
  sections: [
    {
      heading: "1. Information we collect",
      paragraphs: [
        "Website use may include technical data such as browser type, device, pages viewed, and approximate location derived from IP address.",
        "When you call, we may collect booking details you provide: traveler names, contact information, payment details processed for ticketing, route preferences, and call notes needed to complete your request.",
      ],
    },
    {
      heading: "2. How we use information",
      paragraphs: [
        "We use information to operate search experiences, respond to calls, ticket itineraries, prevent fraud, improve service quality, and meet legal obligations.",
        "We do not sell your personal information.",
      ],
    },
    {
      heading: "3. Sharing",
      paragraphs: [
        "We may share information with airlines, GDSs, payment processors, and service providers only as needed to ticket and support your trip, or when required by law.",
      ],
    },
    {
      heading: "4. Retention",
      paragraphs: [
        "We keep booking and call records as needed for ticketing, customer support, accounting, dispute handling, and legal retention requirements.",
      ],
    },
    {
      heading: "5. Your choices",
      paragraphs: [
        `To ask about access, correction, or deletion requests where applicable, call ${supportPhone.display} or email ${supportEmail.display}. We may need to verify your identity before responding.`,
      ],
    },
    {
      heading: "6. Security",
      paragraphs: [
        "We use administrative and technical safeguards appropriate to a phone-based ticketing desk. No method of transmission or storage is completely secure.",
      ],
    },
    {
      heading: "7. Updates",
      paragraphs: [
        "We may update this policy from time to time. The “Last updated” date on this page will change when we do.",
      ],
    },
    {
      heading: "8. Contact",
      paragraphs: [
        `Privacy and compliance requests: ${supportEmail.display}. For live booking help, call ${supportPhone.display}.`,
      ],
    },
  ] as const satisfies ReadonlyArray<LegalSection>,
} as const;
