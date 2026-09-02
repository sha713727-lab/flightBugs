"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

type GoogleAnalyticsProps = {
  readonly measurementId: string;
  readonly nonce: string;
  readonly loadGtagScript?: boolean;
};

export function GoogleAnalytics({
  measurementId,
  nonce,
  loadGtagScript = true,
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
      {loadGtagScript ? (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
          strategy="lazyOnload"
          nonce={nonce}
        />
      ) : null}
      <Script
        id={`ga4-init-${measurementId}`}
        strategy="lazyOnload"
        nonce={nonce}
      >
        {loadGtagScript
          ? `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}');`
          : `gtag('config','${measurementId}');`}
      </Script>
    </>
  );
}
