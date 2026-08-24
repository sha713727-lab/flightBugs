import {
  faqItems,
  homeAvailabilityLine,
  homeValueLine,
} from "@/constants/homeContent";
import { siteBrand } from "@/constants/siteBrand";
import { supportEmail, supportPhone } from "@/constants/supportContact";

export function HomeStructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        name: siteBrand.legal,
        description: `${homeValueLine} ${homeAvailabilityLine} for Canada and the USA.`,
        telephone: supportPhone.href.replace("tel:", ""),
        email: supportEmail.display,
        areaServed: ["CA", "US"],
        openingHours: "Mo-Su 00:00-24:00",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
