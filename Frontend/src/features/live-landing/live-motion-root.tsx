"use client";

import "lenis/dist/lenis.css";

import Lenis from "lenis";
import { type ReactNode, useEffect } from "react";

import { gsap, ScrollTrigger } from "@/features/live-landing/live-gsap";

type LiveMotionRootProps = {
  readonly children: ReactNode;
};

export function LiveMotionRoot({ children }: LiveMotionRootProps) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("live-landing-active");
    ScrollTrigger.config({ ignoreMobileResize: true });

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      return () => {
        root.classList.remove("live-landing-active");
      };
    }

    const useLenis = window.matchMedia("(min-width: 768px)").matches;
    let lenis: Lenis | null = null;
    let onTick: ((time: number) => void) | null = null;
    let onScroll: (() => void) | null = null;

    if (useLenis) {
      lenis = new Lenis({
        autoRaf: false,
        anchors: true,
      });

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
      root.classList.remove("live-landing-active");
    };
  }, []);

  return (
    <div className="live-landing flex min-h-full flex-1 flex-col bg-white">
      {children}
    </div>
  );
}
