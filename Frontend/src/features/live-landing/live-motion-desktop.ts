import Lenis from "lenis";

import { gsap, ScrollTrigger } from "@/features/live-landing/live-gsap";

export function startLiveDesktopMotion(): () => void {
  ScrollTrigger.config({ ignoreMobileResize: true });

  const lenis = new Lenis({
    autoRaf: false,
    anchors: true,
  });

  const onScroll = () => {
    ScrollTrigger.update();
  };

  lenis.on("scroll", onScroll);

  const onTick = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(onTick);
  gsap.ticker.lagSmoothing(0);

  const refresh = () => {
    ScrollTrigger.refresh();
  };

  refresh();
  window.addEventListener("load", refresh);

  return () => {
    window.removeEventListener("load", refresh);
    gsap.ticker.remove(onTick);
    lenis.off("scroll", onScroll);
    lenis.destroy();
  };
}
