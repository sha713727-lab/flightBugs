"use client";

import Lenis from "lenis";
import { type ReactNode, useEffect } from "react";

import { gsap, ScrollTrigger } from "@/features/explore-landing/explore-gsap";

type ExploreMotionRootProps = {
  readonly children: ReactNode;
};

export function ExploreMotionRoot({ children }: ExploreMotionRootProps) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("explore-landing-active");
    ScrollTrigger.config({ ignoreMobileResize: true });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) {
      return () => {
        root.classList.remove("explore-landing-active");
      };
    }

    const useLenis = window.matchMedia("(min-width: 768px)").matches;
    let lenis: Lenis | null = null;
    let onTick: ((time: number) => void) | null = null;
    let onScroll: (() => void) | null = null;

    if (useLenis) {
      lenis = new Lenis({ autoRaf: false, anchors: true });
      onScroll = () => {
        ScrollTrigger.update();
      };
      lenis.on("scroll", onScroll);
      const instance = lenis;
      onTick = (time: number) => {
        instance.raf(time * 1000);
      };
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
    }

    const refresh = () => {
      ScrollTrigger.refresh();
    };
    refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      if (onTick) {
        gsap.ticker.remove(onTick);
      }
      if (lenis && onScroll) {
        lenis.off("scroll", onScroll);
        lenis.destroy();
      }
      root.classList.remove("explore-landing-active");
    };
  }, []);

  return (
    <div className="explore-landing flex min-h-full flex-1 flex-col bg-[var(--explore-bg)] text-[var(--explore-text)]">
      {children}
    </div>
  );
}
