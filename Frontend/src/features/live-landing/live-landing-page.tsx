import { LiveClose } from "@/features/live-landing/live-close";
import { LiveDesk } from "@/features/live-landing/live-desk";
import { LiveFaq } from "@/features/live-landing/live-faq";
import { LiveFilmstrip } from "@/features/live-landing/live-filmstrip";
import { LiveHeader } from "@/features/live-landing/live-header";
import { LiveMotionRoot } from "@/features/live-landing/live-motion-root";
import { LiveOpening } from "@/features/live-landing/live-opening";
import { LiveProof } from "@/features/live-landing/live-proof";
import { LiveRitual } from "@/features/live-landing/live-ritual";

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
