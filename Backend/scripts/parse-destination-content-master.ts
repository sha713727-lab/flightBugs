import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type ChildThing = {
  readonly title: string;
  readonly description: string;
  readonly imageUrl: string | null;
  readonly imageAlt: string;
  readonly sortOrder: number;
};

type Airport = {
  readonly airportName: string;
  readonly airportCode: string;
  readonly description: string;
  readonly distanceOrArea: string;
  readonly airportLink: string | null;
  readonly sortOrder: number;
};

type Faq = {
  readonly question: string;
  readonly answer: string;
  readonly sortOrder: number;
};

export type DestinationSeedRecord = {
  readonly destinationName: string;
  readonly slug: string;
  readonly state: string;
  readonly country: string;
  readonly shortDescription: string;
  readonly fullDescription: string;
  readonly published: boolean;
  readonly featured: boolean;
  readonly showInNavigation: boolean;
  readonly navigationOrder: number;
  readonly heroHeading: string;
  readonly heroSubheading: string;
  readonly heroDescription: string;
  readonly heroImageUrl: string | null;
  readonly heroImageAlt: string;
  readonly heroCtaText: string | null;
  readonly whyVisitHeading: string;
  readonly whyVisitDescription: string;
  readonly bestTimeHeading: string;
  readonly bestTimeSummary: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly canonicalUrl: string | null;
  readonly ogTitle: string | null;
  readonly ogDescription: string | null;
  readonly ogImageUrl: string | null;
  readonly primaryKeyword: string | null;
  readonly secondaryKeywords: string | null;
  readonly thingsToDo: ReadonlyArray<ChildThing>;
  readonly experiences: ReadonlyArray<ChildThing>;
  readonly culinaryItems: ReadonlyArray<ChildThing>;
  readonly airports: ReadonlyArray<Airport>;
  readonly seasons: ReadonlyArray<{
    readonly season: string;
    readonly months: string;
    readonly description: string;
    readonly sortOrder: number;
  }>;
  readonly faqs: ReadonlyArray<Faq>;
  readonly galleryImages: ReadonlyArray<{
    readonly imageUrl: string;
    readonly imageAlt: string;
    readonly sortOrder: number;
  }>;
  readonly relatedRouteIdeas: ReadonlyArray<string>;
  readonly internalLinkNotes: ReadonlyArray<string>;
};

const AIRPORT_NAMES: Readonly<Record<string, string>> = {
  JFK: "John F. Kennedy International Airport",
  LGA: "LaGuardia Airport",
  EWR: "Newark Liberty International Airport",
  MCO: "Orlando International Airport",
  LAS: "Harry Reid International Airport",
  MIA: "Miami International Airport",
  LAX: "Los Angeles International Airport",
  HNL: "Daniel K. Inouye International Airport",
  DEN: "Denver International Airport",
  ORD: "O'Hare International Airport",
  MDW: "Chicago Midway International Airport",
};

const HERO_IMAGES: Readonly<
  Record<string, { readonly url: string; readonly alt: string }>
> = {
  "new-york": {
    url: "/images/destinations/newYork.png",
    alt: "New York City skyline and major landmarks",
  },
  orlando: {
    url: "/images/destinations/miami.png",
    alt: "Orlando Florida travel destination view",
  },
  "las-vegas": {
    url: "/images/destinations/lasVegas.png",
    alt: "Las Vegas skyline and major landmarks",
  },
  miami: {
    url: "/images/destinations/miami.png",
    alt: "Miami beach and skyline travel destination view",
  },
  "los-angeles": {
    url: "/images/destinations/cancun.png",
    alt: "Los Angeles travel destination view",
  },
  honolulu: {
    url: "/images/destinations/cancun.png",
    alt: "Honolulu and Oahu coastal travel destination view",
  },
  denver: {
    url: "/images/destinations/montreal.png",
    alt: "Denver Colorado travel destination view",
  },
  chicago: {
    url: "/images/destinations/newYork.png",
    alt: "Chicago skyline and major landmarks",
  },
};

const SLUG_META: Readonly<
  Record<
    string,
    {
      readonly destinationName: string;
      readonly state: string;
      readonly navigationOrder: number;
      readonly featured: boolean;
    }
  >
> = {
  "new-york": {
    destinationName: "New York",
    state: "New York",
    navigationOrder: 1,
    featured: true,
  },
  orlando: {
    destinationName: "Orlando",
    state: "Florida",
    navigationOrder: 2,
    featured: false,
  },
  "las-vegas": {
    destinationName: "Las Vegas",
    state: "Nevada",
    navigationOrder: 3,
    featured: false,
  },
  miami: {
    destinationName: "Miami",
    state: "Florida",
    navigationOrder: 4,
    featured: false,
  },
  "los-angeles": {
    destinationName: "Los Angeles",
    state: "California",
    navigationOrder: 5,
    featured: false,
  },
  honolulu: {
    destinationName: "Honolulu",
    state: "Hawaii",
    navigationOrder: 6,
    featured: false,
  },
  denver: {
    destinationName: "Denver",
    state: "Colorado",
    navigationOrder: 7,
    featured: false,
  },
  chicago: {
    destinationName: "Chicago",
    state: "Illinois",
    navigationOrder: 8,
    featured: false,
  },
};

function normalizeWhitespace(value: string): string {
  return value.replace(/\r\n/g, "\n").trim();
}

function fieldValue(block: string, label: string): string {
  const pattern = new RegExp(`\\*\\*${label}:\\*\\*\\s*(.+)$`, "im");
  const match = pattern.exec(block);
  return match?.[1]?.trim() ?? "";
}

function extractUrlSlug(block: string): string | null {
  const match = /\*\*Recommended URL:\*\*\s*`\/en\/destinations\/([a-z0-9-]+)`/i.exec(
    block,
  );
  return match?.[1] ?? null;
}

function sectionBody(block: string, headingPattern: RegExp): string {
  const match = headingPattern.exec(block);
  if (!match || match.index === undefined) {
    return "";
  }
  const start = match.index + match[0].length;
  const rest = block.slice(start);
  const next = /^##\s+/m.exec(rest);
  return normalizeWhitespace(next ? rest.slice(0, next.index) : rest);
}

function parseH3Items(section: string): ReadonlyArray<ChildThing> {
  const items: ChildThing[] = [];
  const parts = section.split(/^###\s+/m).slice(1);
  for (const [index, part] of parts.entries()) {
    const lines = part.split("\n");
    const title = (lines[0] ?? "").trim();
    const description = normalizeWhitespace(lines.slice(1).join("\n"));
    if (!title) {
      continue;
    }
    items.push({
      title,
      description,
      imageUrl: null,
      imageAlt: "",
      sortOrder: index + 1,
    });
  }
  return items;
}

function parseBulletTitles(section: string): ReadonlyArray<ChildThing> {
  const items: ChildThing[] = [];
  const lines = section.split("\n");
  let order = 0;
  for (const line of lines) {
    const match = /^-\s+(.+)$/.exec(line.trim());
    if (!match?.[1]) {
      continue;
    }
    order += 1;
    items.push({
      title: match[1].replace(/\*\*/g, "").trim(),
      description: "",
      imageUrl: null,
      imageAlt: "",
      sortOrder: order,
    });
  }
  return items;
}

function parseFaqs(section: string): ReadonlyArray<Faq> {
  const faqs: Faq[] = [];
  const parts = section.split(/^###\s+/m).slice(1);
  for (const [index, part] of parts.entries()) {
    const lines = part.split("\n");
    const question = (lines[0] ?? "").trim();
    const answer = normalizeWhitespace(lines.slice(1).join("\n"));
    if (!question || !answer) {
      continue;
    }
    faqs.push({
      question,
      answer,
      sortOrder: index + 1,
    });
  }
  return faqs;
}

function parseAirportCodes(targetLine: string): ReadonlyArray<string> {
  const cleaned = targetLine
    .replace(/\*\*Main airport target:\*\*/i, "")
    .replace(/\band\b/gi, ",")
    .replace(/&/g, ",");
  return cleaned
    .split(",")
    .map((part) => part.trim().toUpperCase())
    .filter((code) => /^[A-Z]{3}$/.test(code));
}

function firstParagraph(text: string): string {
  const parts = text
    .split(/\n\s*\n/)
    .map((part) => normalizeWhitespace(part))
    .filter(Boolean);
  return parts[0] ?? "";
}

function clamp(value: string, max: number): string {
  if (value.length <= max) {
    return value;
  }
  return `${value.slice(0, max - 1).trimEnd()}…`;
}

function parseDestinationBlock(
  block: string,
  warnings: string[],
): DestinationSeedRecord | null {
  const slug = extractUrlSlug(block);
  if (!slug || !(slug in SLUG_META)) {
    warnings.push(`Skipped destination block without known slug mapping.`);
    return null;
  }

  const meta = SLUG_META[slug];
  if (!meta) {
    return null;
  }

  const seoTitle = fieldValue(block, "SEO title");
  const metaDescription = fieldValue(block, "Meta description");
  const primaryKeyword = fieldValue(block, "Primary keyword");
  const secondaryKeywords = fieldValue(block, "Secondary keywords");

  const h1Match = /^#\s+Flights To .+$/m.exec(block);
  const heroHeading = h1Match?.[0]?.replace(/^#\s+/, "").trim() ?? `Flights To ${meta.destinationName}`;

  const introStart = h1Match?.index ?? 0;
  const introEnd = block.search(/^##\s+Why Visit/m);
  const intro =
    introEnd > introStart
      ? normalizeWhitespace(block.slice(introStart + (h1Match?.[0].length ?? 0), introEnd))
      : "";

  const whyVisit = sectionBody(block, /^##\s+Why Visit .+$/m);
  const thingsSection = sectionBody(block, /^##\s+Things to Do in .+$/m);
  const experiencesSection = sectionBody(
    block,
    /^##\s+More .+ Experiences$/m,
  );
  const culinarySection = sectionBody(
    block,
    /^##\s+Culinary Classics to Try in .+$/m,
  );
  const airportSection = sectionBody(
    block,
    /^##\s+Nearby Airport Information$/m,
  );
  const bestTimeSection = sectionBody(
    block,
    /^##\s+Best Time to Visit .+$/m,
  );
  const routeSection = sectionBody(
    block,
    /^##\s+Popular Domestic Route Ideas for .+$/m,
  );
  const compareSection = sectionBody(
    block,
    /^##\s+How to Compare .+$/m,
  );
  const faqSection = sectionBody(block, /^##\s+.+(Flight FAQs|FAQs)$/m);
  const internalLinksSection = sectionBody(
    block,
    /^##\s+Internal Links to Add$/m,
  );

  const whyVisitHeadingMatch = /^##\s+(Why Visit .+)$/m.exec(block);
  const whyVisitHeading =
    whyVisitHeadingMatch?.[1]?.trim() ?? `Why Visit ${meta.destinationName}?`;

  const bestTimeHeadingMatch = /^##\s+(Best Time to Visit .+)$/m.exec(block);
  const bestTimeHeading =
    bestTimeHeadingMatch?.[1]?.trim() ??
    `Best Time to Visit ${meta.destinationName}`;

  const airportTargetLine =
    airportSection
      .split("\n")
      .find((line) => /Main airport target/i.test(line)) ?? "";
  const airportCodes = parseAirportCodes(airportTargetLine);
  const airportNarrative = normalizeWhitespace(
    airportSection
      .split("\n")
      .filter((line) => !/Main airport target/i.test(line))
      .join("\n"),
  );

  const airports = airportCodes.map((code, index) => ({
    airportName: AIRPORT_NAMES[code] ?? `${code} Airport`,
    airportCode: code,
    description: airportNarrative,
    distanceOrArea: "",
    airportLink: null,
    sortOrder: index + 1,
  }));

  if (airports.length === 0) {
    warnings.push(`${slug}: no airports parsed from Main airport target.`);
  }

  const thingsToDo = parseH3Items(thingsSection);
  const experiences = parseBulletTitles(experiencesSection);
  const culinaryItems = parseBulletTitles(culinarySection);
  const faqs = parseFaqs(faqSection);
  const relatedRouteIdeas = parseBulletTitles(routeSection).map(
    (item) => item.title,
  );
  const internalLinkNotes = internalLinksSection
    .split("\n")
    .map((line) => line.replace(/^-\s+/, "").trim())
    .filter(Boolean);

  const heroImage = HERO_IMAGES[slug];
  const fullDescription = normalizeWhitespace(
    [intro, compareSection ? `How to compare\n\n${compareSection}` : ""]
      .filter(Boolean)
      .join("\n\n"),
  );

  const shortDescription = clamp(firstParagraph(intro).replace(/\*\*/g, ""), 500);
  const heroDescription = clamp(firstParagraph(intro).replace(/\*\*/g, ""), 2000);
  const cleanedFullDescription = fullDescription.replace(/\*\*/g, "");

  if (!seoTitle || !metaDescription || !intro || !whyVisit || faqs.length === 0) {
    warnings.push(`${slug}: missing required core content fields.`);
  }

  return {
    destinationName: meta.destinationName,
    slug,
    state: meta.state,
    country: "United States",
    shortDescription,
    fullDescription: cleanedFullDescription,
    published: true,
    featured: meta.featured,
    showInNavigation: true,
    navigationOrder: meta.navigationOrder,
    heroHeading,
    heroSubheading: primaryKeyword,
    heroDescription,
    heroImageUrl: heroImage?.url ?? null,
    heroImageAlt: heroImage?.alt ?? `${meta.destinationName} travel destination view`,
    heroCtaText: `Search flights to ${meta.destinationName}`,
    whyVisitHeading,
    whyVisitDescription: whyVisit.replace(/\*\*/g, ""),
    bestTimeHeading,
    bestTimeSummary: bestTimeSection,
    metaTitle: seoTitle,
    metaDescription,
    canonicalUrl: `https://flightbugs.com/en/destinations/${slug}`,
    ogTitle: seoTitle,
    ogDescription: metaDescription,
    ogImageUrl: heroImage?.url ?? null,
    primaryKeyword: primaryKeyword || null,
    secondaryKeywords: secondaryKeywords || null,
    thingsToDo,
    experiences,
    culinaryItems,
    airports,
    seasons: [],
    faqs,
    galleryImages: [],
    relatedRouteIdeas,
    internalLinkNotes,
  };
}

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const sourcePath = join(
  root,
  "flightbugs_us_domestic_seo_aeo_geo_content_master.md",
);
const outputPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/destinations-content.seed.json",
);

const markdown = readFileSync(sourcePath, "utf8");
const warnings: string[] = [];
const destinationBlocks = markdown
  .split(/(?=^# DESTINATION PAGE)/m)
  .map((part) => part.trim())
  .filter((part) => part.startsWith("# DESTINATION PAGE"));

const destinations: DestinationSeedRecord[] = [];
for (const block of destinationBlocks) {
  const parsed = parseDestinationBlock(block, warnings);
  if (parsed) {
    destinations.push(parsed);
  }
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(
  outputPath,
  `${JSON.stringify(
    {
      source: "flightbugs_us_domestic_seo_aeo_geo_content_master.md",
      generatedAt: new Date().toISOString(),
      hubNote:
        "Hub page /en/domestic-flights is not imported: no hub CMS model exists. Destinations index remains /en/destinations.",
      warnings,
      destinations,
    },
    null,
    2,
  )}\n`,
  "utf8",
);

console.log(
  JSON.stringify(
    {
      destinations: destinations.length,
      faqs: destinations.reduce((sum, item) => sum + item.faqs.length, 0),
      airports: destinations.reduce((sum, item) => sum + item.airports.length, 0),
      thingsToDo: destinations.reduce(
        (sum, item) => sum + item.thingsToDo.length,
        0,
      ),
      experiences: destinations.reduce(
        (sum, item) => sum + item.experiences.length,
        0,
      ),
      culinaryItems: destinations.reduce(
        (sum, item) => sum + item.culinaryItems.length,
        0,
      ),
      warnings,
      outputPath,
    },
    null,
    2,
  ),
);
