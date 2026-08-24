import { z } from "zod";

export const suggestPlacesQuerySchema = z
  .object({
    query: z
      .string()
      .trim()
      .min(2, "Search query must be at least 2 characters")
      .max(64, "Search query is too long"),
  })
  .strict();

export type SuggestPlacesQuery = z.infer<typeof suggestPlacesQuerySchema>;

export function buildSuggestPlacesPath(query: string): string {
  return `/flights/places/suggestions?query=${encodeURIComponent(query)}`;
}
