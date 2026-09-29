import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { headers } from "next/headers";

import { siteBrand } from "@/constants/siteBrand";
import { MarketingClickTracker } from "@/lib/analytics/marketing-click-tracker";
import { env } from "@/lib/env";
import { GoogleAds } from "@/lib/google-ads/google-ads";
import { GoogleTagManager } from "@/lib/google-tag-manager/google-tag-manager";
import { MicrosoftClarity } from "@/lib/microsoft-clarity/microsoft-clarity";

const plusJakarta = localFont({
  src: [
    {
      path: "../fonts/plus-jakarta-sans-latin-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/plus-jakarta-sans-latin-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/plus-jakarta-sans-latin-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteBrand.metadataTitle,
  description:
    "International flights by phone — search live fares worldwide, then call a specialist 24/7.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/favicon32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon48.png", sizes: "48x48", type: "image/png" },
      { url: "/images/favicon192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/images/appleTouchIcon.png" }],
    shortcut: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const nonce = requestHeaders.get("x-nonce");
  const pathname = requestHeaders.get("x-pathname") ?? "";
  const isAdminRoute = /(?:^|\/)admin(?:\/|$)/.test(pathname);
  const clarityProjectId = env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  const gtmId = env.NEXT_PUBLIC_GTM_ID;
  const googleAdsId = env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${plusJakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        {!isAdminRoute && gtmId !== undefined && nonce !== null ? (
          <GoogleTagManager containerId={gtmId} nonce={nonce} />
        ) : null}
        {!isAdminRoute && googleAdsId !== undefined && nonce !== null ? (
          <GoogleAds conversionId={googleAdsId} nonce={nonce} />
        ) : null}
        {!isAdminRoute && clarityProjectId !== undefined && nonce !== null ? (
          <MicrosoftClarity projectId={clarityProjectId} nonce={nonce} />
        ) : null}
        <MarketingClickTracker />
        {children}
      </body>
    </html>
  );
}
