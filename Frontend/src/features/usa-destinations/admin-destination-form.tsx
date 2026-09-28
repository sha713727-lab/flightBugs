import {
  AirportRows,
  FaqRows,
  GalleryRows,
  SeasonRows,
  ThingRows,
} from "@/features/usa-destinations/admin-destination-child-rows";
import { MediaUploadField } from "@/features/usa-destinations/media-upload-field";
import type { DestinationDetail } from "@/types/destinations";

type AdminDestinationFormProps = {
  readonly destination: DestinationDetail | null;
  readonly isNew: boolean;
  readonly action: (formData: FormData) => Promise<void>;
};

function Field(props: {
  readonly name: string;
  readonly label: string;
  readonly defaultValue?: string;
  readonly required?: boolean;
  readonly type?: string;
}) {
  return (
    <label className="block text-sm font-medium text-primary-text">
      {props.label}
      <input
        name={props.name}
        type={props.type ?? "text"}
        required={props.required}
        defaultValue={props.defaultValue ?? ""}
        className="mt-1 w-full rounded-[var(--radius-sm)] border border-border px-3 py-2"
      />
    </label>
  );
}

function TextArea(props: {
  readonly name: string;
  readonly label: string;
  readonly defaultValue?: string;
  readonly required?: boolean;
  readonly rows?: number;
}) {
  return (
    <label className="block text-sm font-medium text-primary-text">
      {props.label}
      <textarea
        name={props.name}
        required={props.required}
        defaultValue={props.defaultValue ?? ""}
        rows={props.rows ?? 4}
        className="mt-1 w-full rounded-[var(--radius-sm)] border border-border px-3 py-2"
      />
    </label>
  );
}

export function AdminDestinationForm({
  destination,
  isNew,
  action,
}: AdminDestinationFormProps) {
  return (
    <form
      action={action}
      className="space-y-4 rounded-[var(--radius-lg)] border border-border bg-main-bg p-6"
    >
      {!isNew ? (
        <input type="hidden" name="id" value={destination?.id ?? ""} />
      ) : null}
      <Field
        name="destinationName"
        label="Destination name"
        defaultValue={destination?.destinationName ?? ""}
        required
      />
      <Field
        name="slug"
        label="Slug"
        defaultValue={destination?.slug ?? ""}
        required
      />
      <Field
        name="state"
        label="State"
        defaultValue={destination?.state ?? ""}
        required
      />
      <Field
        name="country"
        label="Country"
        defaultValue={destination?.country ?? "United States"}
        required
      />
      <TextArea
        name="shortDescription"
        label="Short description"
        defaultValue={destination?.shortDescription ?? ""}
        required
      />
      <TextArea
        name="fullDescription"
        label="Full description"
        defaultValue={destination?.fullDescription ?? ""}
        required
        rows={8}
      />
      <Field
        name="heroHeading"
        label="Hero heading"
        defaultValue={destination?.heroHeading ?? ""}
        required
      />
      <Field
        name="heroSubheading"
        label="Hero subheading"
        defaultValue={destination?.heroSubheading ?? ""}
      />
      <TextArea
        name="heroDescription"
        label="Hero description"
        defaultValue={destination?.heroDescription ?? ""}
      />
      <MediaUploadField
        name="heroMediaAssetId"
        label="Hero photo"
        initial={destination?.heroImage ?? null}
      />
      <Field
        name="heroImageAlt"
        label="Hero image alt"
        defaultValue={destination?.heroImageAlt ?? ""}
      />
      <Field
        name="heroCtaText"
        label="Hero CTA text"
        defaultValue={destination?.heroCtaText ?? ""}
      />
      <Field
        name="whyVisitHeading"
        label="Why visit heading"
        defaultValue={destination?.whyVisitHeading ?? ""}
        required
      />
      <TextArea
        name="whyVisitDescription"
        label="Why visit description"
        defaultValue={destination?.whyVisitDescription ?? ""}
        rows={6}
      />
      <Field
        name="bestTimeHeading"
        label="Best time heading"
        defaultValue={destination?.bestTimeHeading ?? ""}
        required
      />
      <TextArea
        name="bestTimeSummary"
        label="Best time summary"
        defaultValue={destination?.bestTimeSummary ?? ""}
        rows={5}
      />
      <Field
        name="metaTitle"
        label="Meta title"
        defaultValue={destination?.metaTitle ?? ""}
        required
      />
      <TextArea
        name="metaDescription"
        label="Meta description"
        defaultValue={destination?.metaDescription ?? ""}
        required
      />
      <Field
        name="canonicalUrl"
        label="Canonical URL"
        defaultValue={destination?.canonicalUrl ?? ""}
      />
      <Field
        name="ogTitle"
        label="OG title"
        defaultValue={destination?.ogTitle ?? ""}
      />
      <TextArea
        name="ogDescription"
        label="OG description"
        defaultValue={destination?.ogDescription ?? ""}
      />
      <MediaUploadField
        name="ogMediaAssetId"
        label="OG photo"
        initial={destination?.ogImage ?? null}
      />
      <Field
        name="primaryKeyword"
        label="Primary keyword"
        defaultValue={destination?.primaryKeyword ?? ""}
      />
      <Field
        name="secondaryKeywords"
        label="Secondary keywords"
        defaultValue={destination?.secondaryKeywords ?? ""}
      />
      <Field
        name="navigationOrder"
        label="Navigation order"
        type="number"
        defaultValue={String(destination?.navigationOrder ?? 0)}
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          name="published"
          type="checkbox"
          defaultChecked={destination?.published ?? false}
        />
        Published
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          name="featured"
          type="checkbox"
          defaultChecked={destination?.featured ?? false}
        />
        Featured
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          name="showInNavigation"
          type="checkbox"
          defaultChecked={destination?.showInNavigation ?? false}
        />
        Show in navigation
      </label>

      <ThingRows
        prefix="thing"
        title="Things to do"
        items={destination?.thingsToDo ?? []}
      />
      <ThingRows
        prefix="experience"
        title="More experiences"
        items={destination?.experiences ?? []}
      />
      <ThingRows
        prefix="culinary"
        title="Culinary classics"
        items={destination?.culinaryItems ?? []}
      />
      <AirportRows items={destination?.airports ?? []} />
      <SeasonRows items={destination?.seasons ?? []} />
      <FaqRows items={destination?.faqs ?? []} />
      <GalleryRows items={destination?.galleryImages ?? []} />

      <button
        type="submit"
        className="rounded-full bg-aviation-blue px-5 py-3 text-sm font-semibold text-on-accent"
      >
        Save destination
      </button>
    </form>
  );
}
