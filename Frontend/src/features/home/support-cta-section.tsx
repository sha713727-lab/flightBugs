import { AirplaneAccent } from "@/components/airplane-accent";
import { CallPhoneButton } from "@/components/call-phone-button";
import {
  homeAvailabilityLine,
  homeValueLine,
} from "@/constants/homeContent";

export function SupportCtaSection() {
  return (
    <section className="pb-[var(--spacing-section)]">
      <div className="container-avion">
        <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-light-blue-gray px-6 py-12 text-center sm:px-10">
          <AirplaneAccent
            className="absolute left-4 top-1/2 hidden -translate-y-1/2 lg:left-8 lg:block"
            width={100}
          />
          <AirplaneAccent
            className="absolute right-4 top-1/2 hidden -translate-y-1/2 lg:right-8 lg:block"
            mirrored
            width={100}
          />
          <h2 className="text-section-heading">Still have questions?</h2>
          <p className="text-body-muted mx-auto mt-3 max-w-xl">
            {homeValueLine} {homeAvailabilityLine}.
          </p>
          <div className="mt-7">
            <CallPhoneButton size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
