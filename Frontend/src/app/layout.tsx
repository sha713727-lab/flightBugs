import "./globals.css";

import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { headers } from "next/headers";
import { Suspense } from "react";

import { siteBrand } from "@/constants/siteBrand";
import { MarketingClickTracker } from "@/lib/analytics/marketing-click-tracker";
import { env } from "@/lib/env";
import { GoogleAnalytics } from "@/lib/google-analytics/google-analytics";
import { GoogleTagManager } from "@/lib/google-tag-manager/google-tag-manager";
import { MicrosoftClarity } from "@/lib/microsoft-clarity/microsoft-clarity";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
  const measurementId = env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const clarityProjectId = env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  const gtmId = env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        {gtmId !== undefined && nonce !== null ? (
          <GoogleTagManager containerId={gtmId} nonce={nonce} />
        ) : null}
        {measurementId !== undefined && nonce !== null ? (
          <Suspense fallback={null}>
            <GoogleAnalytics measurementId={measurementId} nonce={nonce} />
          </Suspense>
        ) : null}
        {clarityProjectId !== undefined && nonce !== null ? (
          <MicrosoftClarity projectId={clarityProjectId} nonce={nonce} />
        ) : null}
        <MarketingClickTracker />
        {children}
      </body>
    </html>
  );
}
