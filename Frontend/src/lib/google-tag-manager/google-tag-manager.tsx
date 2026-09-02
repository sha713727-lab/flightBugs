import Script from "next/script";

type GoogleTagManagerProps = {
  readonly containerId: string;
  readonly nonce: string;
};

export function GoogleTagManager({
  containerId,
  nonce,
}: GoogleTagManagerProps) {
  return (
    <>
      <Script
        id={`gtm-loader-${containerId}`}
        strategy="lazyOnload"
        nonce={nonce}
      >
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;var n=d.querySelector('[nonce]');n&&j.setAttribute('nonce',n.nonce||n.getAttribute('nonce'));f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${containerId}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
          height="0"
          width="0"
          className="hidden"
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
