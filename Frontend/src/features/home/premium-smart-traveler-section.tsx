import { CallPhoneButton } from "@/components/call-phone-button";
import { SmartTravelerGlobe } from "@/components/smart-traveler-globe";
import { marketingImages } from "@/constants/brandAssets";
import {
  homeAvailabilityLine,
  homeValueLine,
} from "@/constants/homeContent";
import { cn } from "@/utils/cn";

export function PremiumSmartTravelerSection() {
  const { smartTravelerAircraftVideo, smartTravelerCabinVideo } = marketingImages;

  return (
    <section className="section-padding bg-main-bg">
      <div className="container-avion grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <h2 className="text-section-heading max-w-md">
            Premium Flights for the
            <br />
            Smart Traveler
          </h2>
          <p className="text-body-muted mt-5 max-w-md">
            {homeValueLine} {homeAvailabilityLine}. Exclusive cabins, priority
            options, and a specialist who confirms the live fare before
            ticketing.
          </p>
          <div className="mt-8">
            <CallPhoneButton size="lg" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            <VideoFrame
              src={smartTravelerAircraftVideo.src}
              poster={smartTravelerAircraftVideo.poster}
              label={smartTravelerAircraftVideo.alt}
              className="aspect-square"
            />
            <div className="relative mt-8 sm:mt-12">
              <VideoFrame
                src={smartTravelerCabinVideo.src}
                poster={smartTravelerCabinVideo.poster}
                label={smartTravelerCabinVideo.alt}
                className="aspect-square"
              />
              <SmartTravelerGlobe className="pointer-events-none absolute bottom-2 right-2 z-10 w-[20%] sm:bottom-3 sm:right-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type VideoFrameProps = {
  src: string;
  poster: string;
  label: string;
  className?: string;
};

function VideoFrame({ src, poster, label, className }: VideoFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-lg)] shadow-card",
        className,
      )}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
