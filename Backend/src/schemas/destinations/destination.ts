import { z } from "zod";

const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be a URL-safe lowercase slug");

const optionalUuid = z.string().uuid().nullable().optional();

const childThingSchema = z
  .object({
    id: z.string().uuid().optional(),
    title: z.string().trim().min(1).max(200),
    description: z.string().trim().max(4000),
    imageMediaAssetId: optionalUuid,
    imageAlt: z.string().trim().max(300).optional(),
    sortOrder: z.number().int().min(0).max(9999),
  })
  .strict();

const airportSchema = z
  .object({
    id: z.string().uuid().optional(),
    airportName: z.string().trim().min(1).max(200),
    airportCode: z.string().trim().min(3).max(8),
    description: z.string().trim().max(2000),
    distanceOrArea: z.string().trim().max(200),
    airportLink: z.string().trim().max(500).nullable().optional(),
    sortOrder: z.number().int().min(0).max(9999),
  })
  .strict();

const seasonSchema = z
  .object({
    id: z.string().uuid().optional(),
    season: z.string().trim().min(1).max(100),
    months: z.string().trim().max(100),
    description: z.string().trim().max(2000),
    sortOrder: z.number().int().min(0).max(9999),
  })
  .strict();

const faqSchema = z
  .object({
    id: z.string().uuid().optional(),
    question: z.string().trim().min(1).max(300),
    answer: z.string().trim().min(1).max(4000),
    sortOrder: z.number().int().min(0).max(9999),
  })
  .strict();

const gallerySchema = z
  .object({
    id: z.string().uuid().optional(),
    mediaAssetId: z.string().uuid(),
    imageAlt: z.string().trim().max(300),
    sortOrder: z.number().int().min(0).max(9999),
  })
  .strict();

export const destinationWriteSchema = z
  .object({
    destinationName: z.string().trim().min(1).max(120),
    slug: slugSchema,
    state: z.string().trim().min(1).max(120),
    country: z.string().trim().min(1).max(120),
    shortDescription: z.string().trim().min(1).max(1000),
    fullDescription: z.string().trim().min(1).max(20000),
    published: z.boolean(),
    featured: z.boolean(),
    showInNavigation: z.boolean(),
    navigationOrder: z.number().int().min(0).max(9999),
    heroHeading: z.string().trim().min(1).max(200),
    heroSubheading: z.string().trim().max(300),
    heroDescription: z.string().trim().max(5000),
    heroMediaAssetId: optionalUuid,
    heroImageAlt: z.string().trim().max(300),
    heroCtaText: z.string().trim().max(100).nullable().optional(),
    whyVisitHeading: z.string().trim().min(1).max(200),
    whyVisitDescription: z.string().trim().max(10000),
    bestTimeHeading: z.string().trim().min(1).max(200),
    bestTimeSummary: z.string().trim().max(10000),
    metaTitle: z.string().trim().min(1).max(160),
    metaDescription: z.string().trim().min(1).max(500),
    canonicalUrl: z.string().trim().max(500).nullable().optional(),
    ogTitle: z.string().trim().max(160).nullable().optional(),
    ogDescription: z.string().trim().max(500).nullable().optional(),
    ogMediaAssetId: optionalUuid,
    primaryKeyword: z.string().trim().max(120).nullable().optional(),
    secondaryKeywords: z.string().trim().max(1000).nullable().optional(),
    thingsToDo: z.array(childThingSchema).max(50),
    experiences: z.array(childThingSchema).max(50),
    culinaryItems: z.array(childThingSchema).max(50),
    airports: z.array(airportSchema).max(20),
    seasons: z.array(seasonSchema).max(20),
    faqs: z.array(faqSchema).max(50),
    galleryImages: z.array(gallerySchema).max(50),
  })
  .strict();

export const destinationUpdateSchema = destinationWriteSchema
  .extend({
    id: z.string().uuid(),
  })
  .strict();

export const adminSessionCreateSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(1).max(200),
  })
  .strict();
