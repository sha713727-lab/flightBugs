import type { IncomingMessage, ServerResponse } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { assertAllowedOrigin } from "../middleware/origin.js";
import { withErrorBoundary } from "../middleware/error-boundary.js";
import {
  discoverRoutes,
  resolveRoute,
  type RouteHandler,
} from "./route-resolver.js";
import { sendError } from "./response.js";

type DiscoveredRoute = {
  readonly method: string;
  readonly path: string;
  readonly handler: RouteHandler;
};

let routesPromise: Promise<ReadonlyArray<DiscoveredRoute>> | null = null;

function getApiRoot(): string {
  return join(dirname(fileURLToPath(import.meta.url)), "../api");
}

export async function loadRoutes(): Promise<ReadonlyArray<DiscoveredRoute>> {
  if (!routesPromise) {
    routesPromise = discoverRoutes(getApiRoot());
  }

  return routesPromise;
}

function setSecurityHeaders(response: ServerResponse): void {
  response.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
  );
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  response.setHeader(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()",
  );
}

export async function dispatchRequest(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  await withErrorBoundary(request, response, async () => {
    setSecurityHeaders(response);

    const originCheck = assertAllowedOrigin(request, response);
    if (!originCheck.ok) {
      return;
    }

    if (request.method === "OPTIONS") {
      response.writeHead(204);
      response.end();
      return;
    }

    const routes = await loadRoutes();
    const url = new URL(request.url ?? "/", "http://localhost");
    const route = resolveRoute(
      routes,
      request.method ?? "GET",
      url.pathname,
    );

    if (!route) {
      sendError(response, 404, "not_found", "Route not found");
      return;
    }

    await route.handler(request, response);
  });
}
