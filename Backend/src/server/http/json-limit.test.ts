import assert from "node:assert/strict";
import test from "node:test";

import { MAX_JSON_BYTES, serializeJsonWithinLimit } from "./json-limit.js";

test("serializeJsonWithinLimit accepts small payloads", () => {
  const result = serializeJsonWithinLimit({ data: { ok: true } });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.ok(result.byteLength > 0);
    assert.ok(result.byteLength <= MAX_JSON_BYTES);
  }
});

test("serializeJsonWithinLimit rejects oversized payloads", () => {
  const oversized = { data: { blob: "x".repeat(MAX_JSON_BYTES) } };
  const result = serializeJsonWithinLimit(oversized);
  assert.equal(result.ok, false);
});
