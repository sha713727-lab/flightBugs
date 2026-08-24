import dynamic from "next/dynamic";
import { Suspense } from "react";

import { liveLandingCopy } from "@/constants/liveLandingContent";

const LiveSearchPanel = dynamic(
  () =>
    import("@/features/live-landing/live-search-panel").then((module) => ({
      default: module.LiveSearchPanel,
    })),
  {
    loading: () => (
      <div className="live-search-panel min-h-[88px] animate-pulse rounded-[24px] border border-border bg-white" />
    ),
  },
);

export function LiveDesk() {
  return (
    <section id="desk" className="scroll-mt-20 bg-white py-20 md:py-28 xl:py-32">
      <div className="container-avion">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-aviation-blue">
          Live desk
        </p>
        <h2 className="mt-4 max-w-xl text-[clamp(36px,5vw,64px)] font-bold leading-[1.05] tracking-[-0.04em] text-primary-text">
          {liveLandingCopy.deskTitle}
        </h2>
        <p className="mt-4 max-w-lg text-[15px] text-secondary-text">
          {liveLandingCopy.deskBody}
        </p>
        <div className="mt-10">
          <Suspense
            fallback={
              <div className="live-search-panel min-h-[88px] animate-pulse rounded-[24px] border border-border bg-white" />
            }
          >
            <LiveSearchPanel />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
