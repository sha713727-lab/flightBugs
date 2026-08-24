import {
  homeAvailabilityLine,
  homeValueLine,
} from "@/constants/homeContent";
import { TestimonialsCarousel } from "@/features/home/testimonials-carousel";

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-main-bg">
      <div className="container-avion">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-section-heading">What our travelers say</h2>
          <p className="text-body-muted mt-4">
            {homeValueLine} {homeAvailabilityLine}.
          </p>
        </div>

        <TestimonialsCarousel />
      </div>
    </section>
  );
}
