import { PopularDestinationsSlider } from "@/features/home/popular-destinations-slider";

export function PopularDestinationsSection() {
  return (
    <section id="destinations" className="section-padding scroll-mt-28 bg-main-bg">
      <div className="container-avion">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-section-heading">Popular international destinations</h2>
          <p className="text-body-muted mt-4">
            London, Paris, Tokyo, and more — search a route, then call. We
            ticket international flights by phone 24/7.
          </p>
        </div>

        <PopularDestinationsSlider />
      </div>
    </section>
  );
}
