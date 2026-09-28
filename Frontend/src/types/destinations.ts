export type DestinationMediaRef = {
  readonly mediaAssetId: string;
  readonly publicPath: string;
  readonly alt: string;
};

export type DestinationNavItem = {
  readonly id: string;
  readonly destinationName: string;
  readonly slug: string;
  readonly navigationOrder: number;
};

export type DestinationChildThing = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly image: DestinationMediaRef | null;
  readonly imageAlt: string;
  readonly sortOrder: number;
};

export type DestinationAirport = {
  readonly id: string;
  readonly airportName: string;
  readonly airportCode: string;
  readonly description: string;
  readonly distanceOrArea: string;
  readonly airportLink: string | null;
  readonly sortOrder: number;
};

export type DestinationSeason = {
  readonly id: string;
  readonly season: string;
  readonly months: string;
  readonly description: string;
  readonly sortOrder: number;
};

export type DestinationFaq = {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly sortOrder: number;
};

export type DestinationGalleryImage = {
  readonly id: string;
  readonly image: DestinationMediaRef;
  readonly imageAlt: string;
  readonly sortOrder: number;
};

export type DestinationSummary = {
  readonly id: string;
  readonly destinationName: string;
  readonly slug: string;
  readonly state: string;
  readonly country: string;
  readonly shortDescription: string;
  readonly published: boolean;
  readonly featured: boolean;
  readonly showInNavigation: boolean;
  readonly navigationOrder: number;
  readonly heroImage: DestinationMediaRef | null;
  readonly heroImageAlt: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
};

export type DestinationDetail = DestinationSummary & {
  readonly fullDescription: string;
  readonly heroHeading: string;
  readonly heroSubheading: string;
  readonly heroDescription: string;
  readonly heroCtaText: string | null;
  readonly whyVisitHeading: string;
  readonly whyVisitDescription: string;
  readonly bestTimeHeading: string;
  readonly bestTimeSummary: string;
  readonly canonicalUrl: string | null;
  readonly ogTitle: string | null;
  readonly ogDescription: string | null;
  readonly ogImage: DestinationMediaRef | null;
  readonly primaryKeyword: string | null;
  readonly secondaryKeywords: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly thingsToDo: ReadonlyArray<DestinationChildThing>;
  readonly experiences: ReadonlyArray<DestinationChildThing>;
  readonly culinaryItems: ReadonlyArray<DestinationChildThing>;
  readonly airports: ReadonlyArray<DestinationAirport>;
  readonly seasons: ReadonlyArray<DestinationSeason>;
  readonly faqs: ReadonlyArray<DestinationFaq>;
  readonly galleryImages: ReadonlyArray<DestinationGalleryImage>;
};
