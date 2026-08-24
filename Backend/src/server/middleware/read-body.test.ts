import assert from "node:assert/strict";
import type { IncomingMessage } from "node:http";
import { Readable } from "node:stream";
import test from "node:test";

import { readRequestBody } from "./read-body.js";

function asIncomingMessage(stream: Readable): IncomingMessage {
  return stream as unknown as IncomingMessage;
}

test("readRequestBody accepts bodies under the limit", async () => {
  const stream = Readable.from([Buffer.from('{"ok":true}')]);
  const result = await readRequestBody(asIncomingMessage(stream), 1024);
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.rawBody, '{"ok":true}');
  }
});

test("readRequestBody rejects bodies over the limit without buffering all", async () => {
  const stream = Readable.from([
    Buffer.from("a".repeat(100)),
    Buffer.from("b".repeat(100)),
  ]);
  const result = await readRequestBody(asIncomingMessage(stream), 50);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.code, "payload_too_large");
  }
});
