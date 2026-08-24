import { z } from "zod";

const flightPlaceSuggestionSchema = z
  .object({
    id: z.string().min(1),
    iata: z.string().min(1),
    city: z.string().min(1),
    name: z.string().min(1),
    countryCode: z.string().min(1),
    kind: z.enum(["airport", "city"]),
  })
  .strict();

export const flightPlaceSuggestionsResponseSchema = z
  .object({
    places: z.array(flightPlaceSuggestionSchema),
  })
  .strict();
