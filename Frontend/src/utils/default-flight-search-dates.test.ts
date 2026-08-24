import assert from "node:assert/strict";
import test from "node:test";

import { defaultFlightSearchDates, formatIsoDate } from "./default-flight-search-dates.ts";

test("formatIsoDate formats YYYY-MM-DD", () => {
  assert.equal(formatIsoDate(new Date(2026, 7, 24)), "2026-08-24");
});

test("defaultFlightSearchDates uses +7 and +14 days", () => {
  const dates = defaultFlightSearchDates(new Date(2026, 7, 24));
  assert.equal(dates.departDate, "2026-08-31");
  assert.equal(dates.returnDate, "2026-09-07");
});
