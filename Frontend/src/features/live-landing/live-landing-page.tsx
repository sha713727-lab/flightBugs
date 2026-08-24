import dynamic from "next/dynamic";

import { LiveHeader } from "@/features/live-landing/live-header";
import { LiveMotionRoot } from "@/features/live-landing/live-motion-root";
import { LiveOpening } from "@/features/live-landing/live-opening";

const LiveRitual = dynamic(
  () =>
    import("@/features/live-landing/live-ritual").then((module) => ({
      default: module.LiveRitual,
    })),
);

const LiveFilmstrip = dynamic(
  () =>
    import("@/features/live-landing/live-filmstrip").then((module) => ({
      default: module.LiveFilmstrip,
    })),
);

const LiveDesk = dynamic(
  () =>
    import("@/features/live-landing/live-desk").then((module) => ({
      default: module.LiveDesk,
    })),
);

const LiveProof = dynamic(
  () =>
    import("@/features/live-landing/live-proof").then((module) => ({
      default: module.LiveProof,
    })),
);

const LiveFaq = dynamic(
  () =>
    import("@/features/live-landing/live-faq").then((module) => ({
      default: module.LiveFaq,
    })),
);

const LiveClose = dynamic(
  () =>
    import("@/features/live-landing/live-close").then((module) => ({
      default: module.LiveClose,
    })),
);

export function LiveLandingPage() {
  return (
    <LiveMotionRoot>
      <LiveHeader />
      <main>
        <LiveOpening />
        <LiveRitual />
        <LiveFilmstrip />
        <LiveDesk />
        <LiveProof />
        <LiveFaq />
      </main>
      <LiveClose />
    </LiveMotionRoot>
  );
}
