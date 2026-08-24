"use client";

import { useEffect } from "react";

import { pushMarketingEvent } from "@/lib/analytics/push-marketing-event";

export function MarketingClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a[href^='tel:']");
      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      pushMarketingEvent({
        event: "phone_call_click",
        phone_href: anchor.href,
        link_text: anchor.textContent?.trim().slice(0, 80) ?? "",
        page_path: window.location.pathname,
      });
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
