import assert from "node:assert/strict";
import test from "node:test";

import {
  buildHmacSignaturePayload,
  hmacSignaturesEqual,
  signHmacPayload,
} from "./hmac-crypto.ts";

const secret = "test-hmac-signing-secret-at-least-32-chars";

test("HMAC signatures are stable for identical payloads", () => {
  const payload = buildHmacSignaturePayload({
    method: "POST",
    path: "/flights/search",
    timestamp: "1710000000",
    nonce: "nonce-one",
    rawBody: '{"origin":"YUL"}',
  });

  const first = signHmacPayload(secret, payload);
  const second = signHmacPayload(secret, payload);
  assert.equal(first, second);
  assert.equal(hmacSignaturesEqual(first, second), true);
});

test("HMAC signatures diverge when the body changes", () => {
  const base = {
    method: "POST",
    path: "/flights/search",
    timestamp: "1710000000",
    nonce: "nonce-one",
  } as const;

  const first = signHmacPayload(
    secret,
    buildHmacSignaturePayload({ ...base, rawBody: '{"a":1}' }),
  );
  const second = signHmacPayload(
    secret,
    buildHmacSignaturePayload({ ...base, rawBody: '{"a":2}' }),
  );

  assert.notEqual(first, second);
  assert.equal(hmacSignaturesEqual(first, second), false);
});

test("HMAC signatures diverge when the nonce changes", () => {
  const first = signHmacPayload(
    secret,
    buildHmacSignaturePayload({
      method: "GET",
      path: "/flights/places/suggestions?query=lon",
      timestamp: "1710000000",
      nonce: "nonce-a",
      rawBody: "",
    }),
  );
  const second = signHmacPayload(
    secret,
    buildHmacSignaturePayload({
      method: "GET",
      path: "/flights/places/suggestions?query=lon",
      timestamp: "1710000000",
      nonce: "nonce-b",
      rawBody: "",
    }),
  );

  assert.notEqual(first, second);
});
