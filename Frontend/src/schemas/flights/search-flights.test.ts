import assert from "node:assert/strict";
import test from "node:test";

import { flightSearchInputSchema } from "./search-flights.ts";
import { suggestPlacesQuerySchema } from "./suggest-places.ts";

test("flightSearchInputSchema accepts a valid one-way search", () => {
  const parsed = flightSearchInputSchema.safeParse({
    origin: "yul",
    destination: "lhr",
    departDate: "2026-09-01",
    adults: 1,
    cabinClass: "economy",
    tripType: "one_way",
  });

  assert.equal(parsed.success, true);
  if (parsed.success) {
    assert.equal(parsed.data.origin, "YUL");
    assert.equal(parsed.data.destination, "LHR");
  }
});

test("flightSearchInputSchema rejects round trip without return date", () => {
  const parsed = flightSearchInputSchema.safeParse({
    origin: "YUL",
    destination: "LHR",
    departDate: "2026-09-01",
    adults: 1,
    cabinClass: "economy",
    tripType: "round_trip",
  });

  assert.equal(parsed.success, false);
});

test("suggestPlacesQuerySchema rejects short queries", () => {
  const parsed = suggestPlacesQuerySchema.safeParse({ query: "a" });
  assert.equal(parsed.success, false);
});
