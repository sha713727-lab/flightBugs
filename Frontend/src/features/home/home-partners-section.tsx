import { PartnersMarquee } from "@/components/partners-marquee";

export function HomePartnersSection() {
  return (
    <section className="section-padding border-y border-border bg-soft-section pt-10 pb-10 md:pt-12 md:pb-12">
      <PartnersMarquee variant="home" />
    </section>
  );
}
