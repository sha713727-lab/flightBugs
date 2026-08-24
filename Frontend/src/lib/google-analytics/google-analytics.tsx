"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

type GoogleAnalyticsProps = {
  measurementId: string;
  nonce: string;
};

export function GoogleAnalytics({
  measurementId,
  nonce,
}: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window.gtag !== "function") {
      return;
    }

    const query = searchParams.toString();
    const pagePath = query.length > 0 ? `${pathname}?${query}` : pathname;
    window.gtag("config", measurementId, { page_path: pagePath });
  }, [measurementId, pathname, searchParams]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        nonce={nonce}
      />
      <Script id="ga4-init" strategy="afterInteractive" nonce={nonce}>
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}');`}
      </Script>
    </>
  );
}
