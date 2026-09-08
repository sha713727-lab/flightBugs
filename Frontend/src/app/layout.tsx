import "./globals.css";

import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { headers } from "next/headers";

import { siteBrand } from "@/constants/siteBrand";
import { MarketingClickTracker } from "@/lib/analytics/marketing-click-tracker";
import { env } from "@/lib/env";
import { GoogleAds } from "@/lib/google-ads/google-ads";
import { GoogleTagManager } from "@/lib/google-tag-manager/google-tag-manager";
import { MicrosoftClarity } from "@/lib/microsoft-clarity/microsoft-clarity";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
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
  const clarityProjectId = env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  const gtmContainerIds = [
    env.NEXT_PUBLIC_GTM_ID,
    env.NEXT_PUBLIC_GTM_SECONDARY_ID,
  ].filter((containerId): containerId is string => containerId !== undefined);
  const googleAdsId = env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        {nonce !== null
          ? gtmContainerIds.map((containerId) => (
              <GoogleTagManager
                key={containerId}
                containerId={containerId}
                nonce={nonce}
              />
            ))
          : null}
        {googleAdsId !== undefined && nonce !== null ? (
          <GoogleAds conversionId={googleAdsId} nonce={nonce} />
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
