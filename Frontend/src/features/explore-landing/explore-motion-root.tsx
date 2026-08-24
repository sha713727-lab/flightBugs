"use client";

import { type ReactNode, useEffect } from "react";

type ExploreMotionRootProps = {
  readonly children: ReactNode;
};

export function ExploreMotionRoot({ children }: ExploreMotionRootProps) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("explore-landing-active");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => {
        root.classList.remove("explore-landing-active");
      };
    }

    if (!window.matchMedia("(min-width: 768px)").matches) {
      return () => {
        root.classList.remove("explore-landing-active");
      };
    }

    let dispose: (() => void) | undefined;
    let cancelled = false;

    void import("@/features/explore-landing/explore-motion-desktop").then(
      (module) => {
        if (cancelled) {
          return;
        }

        dispose = module.startExploreDesktopMotion();
      },
    );

    return () => {
      cancelled = true;
      dispose?.();
      root.classList.remove("explore-landing-active");
    };
  }, []);

  return (
    <div className="explore-landing flex min-h-full flex-1 flex-col bg-[var(--explore-bg)] text-[var(--explore-text)]">
      {children}
    </div>
  );
}
