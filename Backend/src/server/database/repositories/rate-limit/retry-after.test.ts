import assert from "node:assert/strict";
import test from "node:test";

import { computeRetryAfterSeconds } from "./retry-after.js";

test("computeRetryAfterSeconds derives ceil of one token refill", () => {
  assert.equal(computeRetryAfterSeconds(0.2), 5);
  assert.equal(computeRetryAfterSeconds(0.5), 2);
  assert.equal(computeRetryAfterSeconds(1), 1);
});

test("computeRetryAfterSeconds guards non-positive rates", () => {
  assert.equal(computeRetryAfterSeconds(0), 60);
  assert.equal(computeRetryAfterSeconds(-1), 60);
});
