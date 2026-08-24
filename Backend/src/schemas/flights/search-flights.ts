import { z } from "zod";

const iataCodeSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[A-Z]{3}$/);

const isoDateSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/);

const cabinClassSchema = z.enum([
  "economy",
  "premium_economy",
  "business",
  "first",
]);

const tripTypeSchema = z.enum(["one_way", "round_trip"]);

export const flightSearchRequestSchema = z
  .object({
    origin: iataCodeSchema,
    destination: iataCodeSchema,
    departDate: isoDateSchema,
    returnDate: isoDateSchema.optional(),
    adults: z.number().int().min(1).max(9),
    cabinClass: cabinClassSchema,
    tripType: tripTypeSchema,
  })
  .strict()
  .refine((value) => value.origin !== value.destination, {
    message: "Origin and destination must differ",
    path: ["destination"],
  })
  .refine((value) => value.tripType !== "round_trip" || value.returnDate, {
    message: "Return date is required for round trip",
    path: ["returnDate"],
  })
  .refine((value) => value.tripType !== "one_way" || !value.returnDate, {
    message: "Return date must not be sent for one way trips",
    path: ["returnDate"],
  })
  .refine(
    (value) =>
      !value.returnDate || value.returnDate >= value.departDate,
    {
      message: "Return date must be on or after departure date",
      path: ["returnDate"],
    },
  );

export type FlightSearchRequest = z.infer<typeof flightSearchRequestSchema>;
