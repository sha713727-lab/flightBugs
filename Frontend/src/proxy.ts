import { type NextRequest, NextResponse } from "next/server";

function buildContentSecurityPolicy(nonce: string, isDev: boolean): string {
  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    ...(isDev ? ["'unsafe-eval'"] : []),
  ].join(" ");

  const connectSrc = [
    "'self'",
    "https://*.google-analytics.com",
    "https://*.analytics.google.com",
    "https://*.googletagmanager.com",
    "https://*.clarity.ms",
    "https://c.bing.com",
    ...(isDev ? ["ws:", "wss:", "http://127.0.0.1:*", "http://localhost:*"] : []),
  ].join(" ");

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com https://*.clarity.ms https://c.bing.com",
    "font-src 'self' data:",
    `style-src-elem 'self' 'nonce-${nonce}'`,
    "style-src-attr 'unsafe-inline'",
    `script-src ${scriptSrc}`,
    `connect-src ${connectSrc}`,
    "media-src 'self'",
    "form-action 'self'",
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");
}

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV !== "production";
  const contentSecurityPolicy = buildContentSecurityPolicy(nonce, isDev);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", contentSecurityPolicy);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("Content-Security-Policy", contentSecurityPolicy);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
  );

  return response;
}

export const config = {
  matcher: [
    {
      source:
        "/((?!_next/static|_next/image|favicon.ico|google[^/]+\\.html|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
