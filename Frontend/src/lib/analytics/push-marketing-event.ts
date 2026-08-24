type MarketingEventName = "phone_call_click" | "flight_search";

type MarketingEventPayload = {
  readonly event: MarketingEventName;
  readonly [key: string]: string | number | boolean | undefined;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function pushMarketingEvent(payload: MarketingEventPayload): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);

  if (typeof window.gtag === "function") {
    const { event, ...params } = payload;
    window.gtag("event", event, params);
  }
}
