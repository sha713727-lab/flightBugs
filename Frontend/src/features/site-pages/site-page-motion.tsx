"use client";

import { type ReactNode, useEffect, useRef } from "react";

import { gsap, ScrollTrigger } from "@/features/site-pages/site-pages-gsap";

type SitePageMotionProps = {
  readonly children: ReactNode;
  readonly mode?: "stagger" | "rise" | "scale" | "slide" | "fade";
  readonly className?: string;
};

export function SitePageMotion({
  children,
  mode = "stagger",
  className,
}: SitePageMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const items = root.querySelectorAll<HTMLElement>("[data-reveal]");
    if (items.length === 0) {
      return;
    }

    const fromVars: gsap.TweenVars =
      mode === "scale"
        ? { opacity: 0, scale: 0.9 }
        : mode === "slide"
          ? { opacity: 0, x: 48 }
          : mode === "fade"
            ? { opacity: 0 }
            : { opacity: 0, y: 40 };

    const tween = gsap.fromTo(items, fromVars, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration: 0.75,
      stagger: mode === "stagger" ? 0.12 : 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: root,
        start: "top 82%",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      ScrollTrigger.refresh();
    };
  }, [mode]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
