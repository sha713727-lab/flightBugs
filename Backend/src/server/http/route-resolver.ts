import { readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { pathToFileURL } from "node:url";
import type { IncomingMessage, ServerResponse } from "node:http";

export type RouteHandler = (
  request: IncomingMessage,
  response: ServerResponse,
) => Promise<void>;

type DiscoveredRoute = {
  readonly method: string;
  readonly path: string;
  readonly handler: RouteHandler;
};

const VERB_TO_METHOD: Readonly<Record<string, string>> = {
  get: "GET",
  list: "GET",
  details: "GET",
  create: "POST",
  post: "POST",
  update: "PUT",
  delete: "DELETE",
};

async function listFilesRecursive(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFilesRecursive(fullPath)));
      continue;
    }

    if (entry.isFile() && /\.(ts|js|mts|mjs)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

export function filePathToRoute(
  apiRoot: string,
  filePath: string,
): { method: string; path: string } | null {
  const relativePath = relative(apiRoot, filePath).split(sep).join("/");
  const match = /^(.*)\/([^/]+)\.(?:ts|js|mts|mjs)$/.exec(relativePath);

  if (!match) {
    return null;
  }

  const directoryPath = match[1];
  const verb = match[2];

  if (!directoryPath || !verb) {
    return null;
  }

  if (verb.endsWith(".test") || verb.endsWith(".spec")) {
    return null;
  }

  const method = VERB_TO_METHOD[verb];
  if (!method) {
    return null;
  }

  return {
    method,
    path: `/${directoryPath}`,
  };
}

export async function discoverRoutes(apiRoot: string): Promise<
  ReadonlyArray<DiscoveredRoute>
> {
  const files = await listFilesRecursive(apiRoot);
  const routes: DiscoveredRoute[] = [];

  for (const filePath of files) {
    const mapped = filePathToRoute(apiRoot, filePath);
    if (!mapped) {
      continue;
    }

    const moduleUrl = pathToFileURL(filePath).href;
    const loaded = (await import(moduleUrl)) as {
      handler?: RouteHandler;
    };

    if (typeof loaded.handler !== "function") {
      throw new Error(`Route module missing handler export: ${filePath}`);
    }

    routes.push({
      method: mapped.method,
      path: mapped.path,
      handler: loaded.handler,
    });
  }

  return routes;
}

export function resolveRoute(
  routes: ReadonlyArray<DiscoveredRoute>,
  method: string,
  pathname: string,
): DiscoveredRoute | undefined {
  return routes.find(
    (route) => route.method === method && route.path === pathname,
  );
}
