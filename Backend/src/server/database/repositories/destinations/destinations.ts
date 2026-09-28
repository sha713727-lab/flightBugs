import { pool } from "../../pool.js";
import type {
  DestinationAirport,
  DestinationChildThing,
  DestinationDetail,
  DestinationFaq,
  DestinationGalleryImage,
  DestinationMediaRef,
  DestinationNavItem,
  DestinationRecord,
  DestinationSeason,
} from "../../../../types/destinations/destination.js";

type DestinationRow = {
  id: string;
  destination_name: string;
  slug: string;
  state: string;
  country: string;
  short_description: string;
  full_description: string;
  published: boolean;
  featured: boolean;
  show_in_navigation: boolean;
  navigation_order: number;
  hero_heading: string;
  hero_subheading: string;
  hero_description: string;
  hero_media_asset_id: string | null;
  hero_image_alt: string;
  hero_cta_text: string | null;
  why_visit_heading: string;
  why_visit_description: string;
  best_time_heading: string;
  best_time_summary: string;
  meta_title: string;
  meta_description: string;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_media_asset_id: string | null;
  primary_keyword: string | null;
  secondary_keywords: string | null;
  created_at: Date;
  updated_at: Date;
};

function mediaRef(
  mediaAssetId: string | null,
  alt: string,
): DestinationMediaRef | null {
  if (!mediaAssetId) {
    return null;
  }
  return {
    mediaAssetId,
    publicPath: `/media/file?id=${mediaAssetId}`,
    alt,
  };
}

function mapDestination(row: DestinationRow): DestinationRecord {
  return {
    id: row.id,
    destinationName: row.destination_name,
    slug: row.slug,
    state: row.state,
    country: row.country,
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    published: row.published,
    featured: row.featured,
    showInNavigation: row.show_in_navigation,
    navigationOrder: row.navigation_order,
    heroHeading: row.hero_heading,
    heroSubheading: row.hero_subheading,
    heroDescription: row.hero_description,
    heroImage: mediaRef(row.hero_media_asset_id, row.hero_image_alt),
    heroImageAlt: row.hero_image_alt,
    heroCtaText: row.hero_cta_text,
    whyVisitHeading: row.why_visit_heading,
    whyVisitDescription: row.why_visit_description,
    bestTimeHeading: row.best_time_heading,
    bestTimeSummary: row.best_time_summary,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    canonicalUrl: row.canonical_url,
    ogTitle: row.og_title,
    ogDescription: row.og_description,
    ogImage: mediaRef(row.og_media_asset_id, row.hero_image_alt),
    primaryKeyword: row.primary_keyword,
    secondaryKeywords: row.secondary_keywords,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

const destinationSelect = `
  id, destination_name, slug, state, country, short_description, full_description,
  published, featured, show_in_navigation, navigation_order,
  hero_heading, hero_subheading, hero_description, hero_media_asset_id, hero_image_alt, hero_cta_text,
  why_visit_heading, why_visit_description, best_time_heading, best_time_summary,
  meta_title, meta_description, canonical_url, og_title, og_description, og_media_asset_id,
  primary_keyword, secondary_keywords, created_at, updated_at
`;

export async function listDestinations(options: {
  readonly publishedOnly: boolean;
}): Promise<ReadonlyArray<DestinationRecord>> {
  const result = options.publishedOnly
    ? await pool.query<DestinationRow>(
        `SELECT ${destinationSelect}
         FROM destinations
         WHERE published = TRUE
         ORDER BY navigation_order ASC, destination_name ASC`,
      )
    : await pool.query<DestinationRow>(
        `SELECT ${destinationSelect}
         FROM destinations
         ORDER BY navigation_order ASC, destination_name ASC`,
      );

  return result.rows.map(mapDestination);
}

export async function listNavDestinations(): Promise<
  ReadonlyArray<DestinationNavItem>
> {
  const result = await pool.query<{
    id: string;
    destination_name: string;
    slug: string;
    navigation_order: number;
  }>(
    `SELECT id, destination_name, slug, navigation_order
     FROM destinations
     WHERE published = TRUE AND show_in_navigation = TRUE
     ORDER BY navigation_order ASC, destination_name ASC`,
  );

  return result.rows.map((row) => ({
    id: row.id,
    destinationName: row.destination_name,
    slug: row.slug,
    navigationOrder: row.navigation_order,
  }));
}

export async function getDestinationBySlug(
  slug: string,
  options: { readonly publishedOnly: boolean },
): Promise<DestinationDetail | null> {
  const result = options.publishedOnly
    ? await pool.query<DestinationRow>(
        `SELECT ${destinationSelect}
         FROM destinations
         WHERE slug = $1 AND published = TRUE
         LIMIT 1`,
        [slug],
      )
    : await pool.query<DestinationRow>(
        `SELECT ${destinationSelect}
         FROM destinations
         WHERE slug = $1
         LIMIT 1`,
        [slug],
      );

  const row = result.rows[0];
  if (!row) {
    return null;
  }

  return loadDetail(mapDestination(row));
}

export async function getDestinationById(
  id: string,
): Promise<DestinationDetail | null> {
  const result = await pool.query<DestinationRow>(
    `SELECT ${destinationSelect}
     FROM destinations
     WHERE id = $1
     LIMIT 1`,
    [id],
  );
  const row = result.rows[0];
  if (!row) {
    return null;
  }
  return loadDetail(mapDestination(row));
}

type ChildRow = {
  id: string;
  title: string;
  description: string;
  image_media_asset_id: string | null;
  image_alt: string;
  sort_order: number;
};

async function loadDetail(
  destination: DestinationRecord,
): Promise<DestinationDetail> {
  const [things, experiences, culinary, airports, seasons, faqs, gallery] =
    await Promise.all([
      pool.query<ChildRow>(
        `SELECT id, title, description, image_media_asset_id, image_alt, sort_order
         FROM destination_things_to_do
         WHERE destination_id = $1
         ORDER BY sort_order ASC`,
        [destination.id],
      ),
      pool.query<ChildRow>(
        `SELECT id, title, description, image_media_asset_id, image_alt, sort_order
         FROM destination_experiences
         WHERE destination_id = $1
         ORDER BY sort_order ASC`,
        [destination.id],
      ),
      pool.query<ChildRow>(
        `SELECT id, title, description, image_media_asset_id, image_alt, sort_order
         FROM destination_culinary_items
         WHERE destination_id = $1
         ORDER BY sort_order ASC`,
        [destination.id],
      ),
      pool.query<{
        id: string;
        airport_name: string;
        airport_code: string;
        description: string;
        distance_or_area: string;
        airport_link: string | null;
        sort_order: number;
      }>(
        `SELECT id, airport_name, airport_code, description, distance_or_area, airport_link, sort_order
         FROM destination_airports
         WHERE destination_id = $1
         ORDER BY sort_order ASC`,
        [destination.id],
      ),
      pool.query<{
        id: string;
        season: string;
        months: string;
        description: string;
        sort_order: number;
      }>(
        `SELECT id, season, months, description, sort_order
         FROM destination_seasons
         WHERE destination_id = $1
         ORDER BY sort_order ASC`,
        [destination.id],
      ),
      pool.query<{
        id: string;
        question: string;
        answer: string;
        sort_order: number;
      }>(
        `SELECT id, question, answer, sort_order
         FROM destination_faqs
         WHERE destination_id = $1
         ORDER BY sort_order ASC`,
        [destination.id],
      ),
      pool.query<{
        id: string;
        media_asset_id: string;
        image_alt: string;
        sort_order: number;
      }>(
        `SELECT id, media_asset_id, image_alt, sort_order
         FROM destination_gallery_images
         WHERE destination_id = $1
         ORDER BY sort_order ASC`,
        [destination.id],
      ),
    ]);

  const mapChild = (rows: ReadonlyArray<ChildRow>): DestinationChildThing[] =>
    rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      image: mediaRef(row.image_media_asset_id, row.image_alt),
      imageAlt: row.image_alt,
      sortOrder: row.sort_order,
    }));

  return {
    ...destination,
    thingsToDo: mapChild(things.rows),
    experiences: mapChild(experiences.rows),
    culinaryItems: mapChild(culinary.rows),
    airports: airports.rows.map(
      (row): DestinationAirport => ({
        id: row.id,
        airportName: row.airport_name,
        airportCode: row.airport_code,
        description: row.description,
        distanceOrArea: row.distance_or_area,
        airportLink: row.airport_link,
        sortOrder: row.sort_order,
      }),
    ),
    seasons: seasons.rows.map(
      (row): DestinationSeason => ({
        id: row.id,
        season: row.season,
        months: row.months,
        description: row.description,
        sortOrder: row.sort_order,
      }),
    ),
    faqs: faqs.rows.map(
      (row): DestinationFaq => ({
        id: row.id,
        question: row.question,
        answer: row.answer,
        sortOrder: row.sort_order,
      }),
    ),
    galleryImages: gallery.rows.map(
      (row): DestinationGalleryImage => ({
        id: row.id,
        image: {
          mediaAssetId: row.media_asset_id,
          publicPath: `/media/file?id=${row.media_asset_id}`,
          alt: row.image_alt,
        },
        imageAlt: row.image_alt,
        sortOrder: row.sort_order,
      }),
    ),
  };
}

export type DestinationWriteInput = {
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
  readonly heroMediaAssetId: string | null;
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
  readonly ogMediaAssetId: string | null;
  readonly primaryKeyword: string | null;
  readonly secondaryKeywords: string | null;
  readonly thingsToDo: ReadonlyArray<{
    readonly title: string;
    readonly description: string;
    readonly imageMediaAssetId: string | null;
    readonly imageAlt: string;
    readonly sortOrder: number;
  }>;
  readonly experiences: ReadonlyArray<{
    readonly title: string;
    readonly description: string;
    readonly imageMediaAssetId: string | null;
    readonly imageAlt: string;
    readonly sortOrder: number;
  }>;
  readonly culinaryItems: ReadonlyArray<{
    readonly title: string;
    readonly description: string;
    readonly imageMediaAssetId: string | null;
    readonly imageAlt: string;
    readonly sortOrder: number;
  }>;
  readonly airports: ReadonlyArray<{
    readonly airportName: string;
    readonly airportCode: string;
    readonly description: string;
    readonly distanceOrArea: string;
    readonly airportLink: string | null;
    readonly sortOrder: number;
  }>;
  readonly seasons: ReadonlyArray<{
    readonly season: string;
    readonly months: string;
    readonly description: string;
    readonly sortOrder: number;
  }>;
  readonly faqs: ReadonlyArray<{
    readonly question: string;
    readonly answer: string;
    readonly sortOrder: number;
  }>;
  readonly galleryImages: ReadonlyArray<{
    readonly mediaAssetId: string;
    readonly imageAlt: string;
    readonly sortOrder: number;
  }>;
};

async function replaceChildren(
  client: {
    query: (
      text: string,
      values?: ReadonlyArray<unknown>,
    ) => Promise<unknown>;
  },
  destinationId: string,
  input: DestinationWriteInput,
): Promise<void> {
  await client.query(
    `DELETE FROM destination_things_to_do WHERE destination_id = $1`,
    [destinationId],
  );
  await client.query(
    `DELETE FROM destination_experiences WHERE destination_id = $1`,
    [destinationId],
  );
  await client.query(
    `DELETE FROM destination_culinary_items WHERE destination_id = $1`,
    [destinationId],
  );
  await client.query(
    `DELETE FROM destination_airports WHERE destination_id = $1`,
    [destinationId],
  );
  await client.query(
    `DELETE FROM destination_seasons WHERE destination_id = $1`,
    [destinationId],
  );
  await client.query(`DELETE FROM destination_faqs WHERE destination_id = $1`, [
    destinationId,
  ]);
  await client.query(
    `DELETE FROM destination_gallery_images WHERE destination_id = $1`,
    [destinationId],
  );

  for (const item of input.thingsToDo) {
    await client.query(
      `INSERT INTO destination_things_to_do
        (destination_id, title, description, image_media_asset_id, image_alt, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        destinationId,
        item.title,
        item.description,
        item.imageMediaAssetId,
        item.imageAlt,
        item.sortOrder,
      ],
    );
  }

  for (const item of input.experiences) {
    await client.query(
      `INSERT INTO destination_experiences
        (destination_id, title, description, image_media_asset_id, image_alt, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        destinationId,
        item.title,
        item.description,
        item.imageMediaAssetId,
        item.imageAlt,
        item.sortOrder,
      ],
    );
  }

  for (const item of input.culinaryItems) {
    await client.query(
      `INSERT INTO destination_culinary_items
        (destination_id, title, description, image_media_asset_id, image_alt, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        destinationId,
        item.title,
        item.description,
        item.imageMediaAssetId,
        item.imageAlt,
        item.sortOrder,
      ],
    );
  }

  for (const item of input.airports) {
    await client.query(
      `INSERT INTO destination_airports
        (destination_id, airport_name, airport_code, description, distance_or_area, airport_link, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        destinationId,
        item.airportName,
        item.airportCode,
        item.description,
        item.distanceOrArea,
        item.airportLink,
        item.sortOrder,
      ],
    );
  }

  for (const item of input.seasons) {
    await client.query(
      `INSERT INTO destination_seasons
        (destination_id, season, months, description, sort_order)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        destinationId,
        item.season,
        item.months,
        item.description,
        item.sortOrder,
      ],
    );
  }

  for (const item of input.faqs) {
    await client.query(
      `INSERT INTO destination_faqs
        (destination_id, question, answer, sort_order)
       VALUES ($1, $2, $3, $4)`,
      [destinationId, item.question, item.answer, item.sortOrder],
    );
  }

  for (const item of input.galleryImages) {
    await client.query(
      `INSERT INTO destination_gallery_images
        (destination_id, media_asset_id, image_alt, sort_order)
       VALUES ($1, $2, $3, $4)`,
      [destinationId, item.mediaAssetId, item.imageAlt, item.sortOrder],
    );
  }
}

export async function createDestination(
  input: DestinationWriteInput,
): Promise<DestinationDetail> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const inserted = await client.query<{ id: string }>(
      `INSERT INTO destinations (
        destination_name, slug, state, country, short_description, full_description,
        published, featured, show_in_navigation, navigation_order,
        hero_heading, hero_subheading, hero_description, hero_media_asset_id, hero_image_alt, hero_cta_text,
        why_visit_heading, why_visit_description, best_time_heading, best_time_summary,
        meta_title, meta_description, canonical_url, og_title, og_description, og_media_asset_id,
        primary_keyword, secondary_keywords
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28
      ) RETURNING id`,
      [
        input.destinationName,
        input.slug,
        input.state,
        input.country,
        input.shortDescription,
        input.fullDescription,
        input.published,
        input.featured,
        input.showInNavigation,
        input.navigationOrder,
        input.heroHeading,
        input.heroSubheading,
        input.heroDescription,
        input.heroMediaAssetId,
        input.heroImageAlt,
        input.heroCtaText,
        input.whyVisitHeading,
        input.whyVisitDescription,
        input.bestTimeHeading,
        input.bestTimeSummary,
        input.metaTitle,
        input.metaDescription,
        input.canonicalUrl,
        input.ogTitle,
        input.ogDescription,
        input.ogMediaAssetId,
        input.primaryKeyword,
        input.secondaryKeywords,
      ],
    );
    const id = inserted.rows[0]?.id;
    if (!id) {
      throw new Error("Destination insert failed");
    }
    await replaceChildren(client, id, input);
    await client.query("COMMIT");
    const detail = await getDestinationById(id);
    if (!detail) {
      throw new Error("Destination not found after create");
    }
    return detail;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function updateDestination(
  id: string,
  input: DestinationWriteInput,
): Promise<DestinationDetail | null> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const updated = await client.query<{ id: string }>(
      `UPDATE destinations SET
        destination_name = $2, slug = $3, state = $4, country = $5,
        short_description = $6, full_description = $7,
        published = $8, featured = $9, show_in_navigation = $10, navigation_order = $11,
        hero_heading = $12, hero_subheading = $13, hero_description = $14,
        hero_media_asset_id = $15, hero_image_alt = $16, hero_cta_text = $17,
        why_visit_heading = $18, why_visit_description = $19,
        best_time_heading = $20, best_time_summary = $21,
        meta_title = $22, meta_description = $23, canonical_url = $24,
        og_title = $25, og_description = $26, og_media_asset_id = $27,
        primary_keyword = $28, secondary_keywords = $29
       WHERE id = $1
       RETURNING id`,
      [
        id,
        input.destinationName,
        input.slug,
        input.state,
        input.country,
        input.shortDescription,
        input.fullDescription,
        input.published,
        input.featured,
        input.showInNavigation,
        input.navigationOrder,
        input.heroHeading,
        input.heroSubheading,
        input.heroDescription,
        input.heroMediaAssetId,
        input.heroImageAlt,
        input.heroCtaText,
        input.whyVisitHeading,
        input.whyVisitDescription,
        input.bestTimeHeading,
        input.bestTimeSummary,
        input.metaTitle,
        input.metaDescription,
        input.canonicalUrl,
        input.ogTitle,
        input.ogDescription,
        input.ogMediaAssetId,
        input.primaryKeyword,
        input.secondaryKeywords,
      ],
    );
    if (!updated.rows[0]) {
      await client.query("ROLLBACK");
      return null;
    }
    await replaceChildren(client, id, input);
    await client.query("COMMIT");
    return getDestinationById(id);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function deleteDestination(id: string): Promise<boolean> {
  const result = await pool.query(`DELETE FROM destinations WHERE id = $1`, [
    id,
  ]);
  return (result.rowCount ?? 0) > 0;
}
