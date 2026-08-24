"use client";

import { type ReactNode, useEffect } from "react";

type LiveMotionRootProps = {
  readonly children: ReactNode;
};

export function LiveMotionRoot({ children }: LiveMotionRootProps) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("live-landing-active");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => {
        root.classList.remove("live-landing-active");
      };
    }

    if (!window.matchMedia("(min-width: 768px)").matches) {
      return () => {
        root.classList.remove("live-landing-active");
      };
    }

    let dispose: (() => void) | undefined;
    let cancelled = false;

    void import("@/features/live-landing/live-motion-desktop").then((module) => {
      if (cancelled) {
        return;
      }

      dispose = module.startLiveDesktopMotion();
    });

    return () => {
      cancelled = true;
      dispose?.();
      root.classList.remove("live-landing-active");
    };
  }, []);

  return (
    <div className="live-landing flex min-h-full flex-1 flex-col bg-white">
      {children}
    </div>
  );
}
