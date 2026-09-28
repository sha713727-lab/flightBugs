import { destinationIndexPath, destinationSlugPath } from "@/constants/destinationPaths";
import { env } from "@/lib/env";
import type { DestinationDetail } from "@/types/destinations";

type DestinationStructuredDataProps = {
  readonly destination: DestinationDetail;
};

export function DestinationStructuredData({
  destination,
}: DestinationStructuredDataProps) {
  const pageUrl = `${env.NEXT_PUBLIC_APP_URL}${destinationSlugPath("home", destination.slug)}`;
  const indexUrl = `${env.NEXT_PUBLIC_APP_URL}${destinationIndexPath("home")}`;

  const faqSchema =
    destination.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: destination.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${env.NEXT_PUBLIC_APP_URL}/en`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Destinations",
        item: indexUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: destination.destinationName,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: destination.metaTitle,
            description: destination.metaDescription,
            url: pageUrl,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
    </>
  );
}
