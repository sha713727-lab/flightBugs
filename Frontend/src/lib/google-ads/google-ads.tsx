import Script from "next/script";

type GoogleAdsProps = {
  readonly conversionId: string;
  readonly nonce: string;
};

export function GoogleAds({ conversionId, nonce }: GoogleAdsProps) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${conversionId}`}
        strategy="afterInteractive"
        nonce={nonce}
      />
      <Script id="google-ads-gtag" strategy="afterInteractive" nonce={nonce}>
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${conversionId}');`}
      </Script>
    </>
  );
}
