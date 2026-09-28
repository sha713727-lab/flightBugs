"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type DestinationRevealProps = {
  readonly children: ReactNode;
  readonly mode?: "stagger" | "rise";
  readonly className?: string;
};

export function DestinationReveal({
  children,
  mode = "stagger",
  className,
}: DestinationRevealProps) {
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

    const tween = gsap.fromTo(
      items,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: mode === "stagger" ? 0.12 : 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 82%",
        },
      },
    );

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
