import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { Pool, type PoolClient } from "pg";

import type { DestinationSeedRecord } from "./parse-destination-content-master.js";

const backendRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const seedPath = join(backendRoot, "data/destinations-content.seed.json");

type SeedFile = {
  readonly destinations: ReadonlyArray<DestinationSeedRecord>;
  readonly warnings?: ReadonlyArray<string>;
};

export type DestinationImportCounts = {
  created: number;
  updated: number;
  faqs: number;
  airports: number;
  thingsToDo: number;
  experiences: number;
  culinaryItems: number;
};

type QueryClient = Pick<PoolClient, "query">;

function loadSeedFile(): SeedFile {
  if (!existsSync(seedPath)) {
    throw new Error(
      `Seed file missing at ${seedPath}. Run: npx tsx scripts/parse-destination-content-master.ts`,
    );
  }

  return JSON.parse(readFileSync(seedPath, "utf8")) as SeedFile;
}

function loadEnvFile(): void {
  const envPath = join(backendRoot, ".env");
  if (!existsSync(envPath)) {
    return;
  }

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

async function replaceChildren(
  client: QueryClient,
  destinationId: string,
  input: DestinationSeedRecord,
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
        null,
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
        null,
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
        null,
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
}

async function upsertDestination(
  client: QueryClient,
  input: DestinationSeedRecord,
  counts: DestinationImportCounts,
): Promise<void> {
  const existing = await client.query<{
    id: string;
  }>(`SELECT id FROM destinations WHERE slug = $1 LIMIT 1`, [input.slug]);

  const existingRow = existing.rows[0];
  let destinationId = existingRow?.id;

  if (destinationId) {
    await client.query(
      `UPDATE destinations SET
          destination_name = $2, state = $3, country = $4,
          short_description = $5, full_description = $6,
          published = $7, featured = $8, show_in_navigation = $9, navigation_order = $10,
          hero_heading = $11, hero_subheading = $12, hero_description = $13,
          hero_image_alt = $14, hero_cta_text = $15,
          why_visit_heading = $16, why_visit_description = $17,
          best_time_heading = $18, best_time_summary = $19,
          meta_title = $20, meta_description = $21, canonical_url = $22,
          og_title = $23, og_description = $24,
          primary_keyword = $25, secondary_keywords = $26
         WHERE id = $1`,
      [
        destinationId,
        input.destinationName,
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
        input.primaryKeyword,
        input.secondaryKeywords,
      ],
    );
    counts.updated += 1;
  } else {
    const inserted = await client.query<{ id: string }>(
      `INSERT INTO destinations (
          destination_name, slug, state, country, short_description, full_description,
          published, featured, show_in_navigation, navigation_order,
          hero_heading, hero_subheading, hero_description, hero_image_alt, hero_cta_text,
          why_visit_heading, why_visit_description, best_time_heading, best_time_summary,
          meta_title, meta_description, canonical_url, og_title, og_description,
          primary_keyword, secondary_keywords
        ) VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26
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
        input.primaryKeyword,
        input.secondaryKeywords,
      ],
    );
    destinationId = inserted.rows[0]?.id;
    if (!destinationId) {
      throw new Error(`Insert failed for slug ${input.slug}`);
    }
    counts.created += 1;
  }

  await replaceChildren(client, destinationId, input);
  counts.faqs += input.faqs.length;
  counts.airports += input.airports.length;
  counts.thingsToDo += input.thingsToDo.length;
  counts.experiences += input.experiences.length;
  counts.culinaryItems += input.culinaryItems.length;
}

export async function importDestinationMasterContent(
  client: QueryClient,
): Promise<DestinationImportCounts> {
  const seed = loadSeedFile();
  const counts: DestinationImportCounts = {
    created: 0,
    updated: 0,
    faqs: 0,
    airports: 0,
    thingsToDo: 0,
    experiences: 0,
    culinaryItems: 0,
  };

  for (const destination of seed.destinations) {
    await upsertDestination(client, destination, counts);
  }

  return counts;
}

function invokedAsCli(): boolean {
  return (process.argv[1] ?? "")
    .replaceAll("\\", "/")
    .includes("import-destination-content");
}

if (invokedAsCli()) {
  loadEnvFile();
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const counts = await importDestinationMasterContent(client);
    await client.query("COMMIT");
    process.stdout.write(`${JSON.stringify(counts, null, 2)}\n`);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}
