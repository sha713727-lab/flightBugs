import { z } from "zod";

const flightLegSummarySchema = z
  .object({
    departureAt: z.string().min(1),
    arrivalAt: z.string().min(1),
    originCode: z.string().min(1),
    originCity: z.string().min(1),
    destinationCode: z.string().min(1),
    destinationCity: z.string().min(1),
    durationMinutes: z.number().int().nonnegative(),
    stops: z.number().int().nonnegative(),
    flightNumbers: z.array(z.string().min(1)),
  })
  .strict();

const flightOfferSummarySchema = z
  .object({
    id: z.string().min(1),
    airlineName: z.string().min(1),
    cabinClass: z.string().min(1),
    outbound: flightLegSummarySchema,
    return: flightLegSummarySchema.nullable(),
  })
  .strict();

export const flightSearchResponseSchema = z
  .object({
    offerRequestId: z.string().min(1),
    offers: z.array(flightOfferSummarySchema),
  })
  .strict();
