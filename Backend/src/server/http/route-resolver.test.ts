import assert from "node:assert/strict";
import { join } from "node:path";
import test from "node:test";

import { filePathToRoute } from "./route-resolver.js";

test("filePathToRoute maps create.ts to POST /flights/search", () => {
  const apiRoot = join("app", "src", "server", "api");
  const mapped = filePathToRoute(
    apiRoot,
    join(apiRoot, "flights", "search", "create.ts"),
  );
  assert.deepEqual(mapped, { method: "POST", path: "/flights/search" });
});

test("filePathToRoute maps nested get.ts to GET path", () => {
  const apiRoot = join("app", "src", "server", "api");
  const mapped = filePathToRoute(
    apiRoot,
    join(apiRoot, "flights", "places", "suggestions", "get.ts"),
  );
  assert.deepEqual(mapped, {
    method: "GET",
    path: "/flights/places/suggestions",
  });
});

test("filePathToRoute ignores test files", () => {
  const apiRoot = join("app", "src", "server", "api");
  const mapped = filePathToRoute(
    apiRoot,
    join(apiRoot, "flights", "search", "create.test.ts"),
  );
  assert.equal(mapped, null);
});
