import { MediaUploadField } from "@/features/usa-destinations/media-upload-field";
import type {
  DestinationAirport,
  DestinationChildThing,
  DestinationFaq,
  DestinationGalleryImage,
  DestinationSeason,
} from "@/types/destinations";

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

export function ThingRows(props: {
  readonly prefix: string;
  readonly title: string;
  readonly items: ReadonlyArray<DestinationChildThing>;
}) {
  const rows = [...props.items, null, null];
  return (
    <section className="space-y-3 rounded-[var(--radius-md)] border border-border p-4">
      <h2 className="text-lg font-semibold text-primary-text">{props.title}</h2>
      {rows.map((item, index) => (
        <div
          key={`${props.prefix}-${item?.id ?? `new-${String(index)}`}`}
          className="grid gap-2 rounded-[var(--radius-sm)] border border-border/70 p-3"
        >
          <Field
            name={`${props.prefix}_title_${String(index)}`}
            label="Title"
            defaultValue={item?.title ?? ""}
          />
          <TextArea
            name={`${props.prefix}_description_${String(index)}`}
            label="Description"
            defaultValue={item?.description ?? ""}
            rows={3}
          />
          <MediaUploadField
            name={`${props.prefix}_imageMediaAssetId_${String(index)}`}
            label="Photo"
            initial={item?.image ?? null}
          />
          <Field
            name={`${props.prefix}_imageAlt_${String(index)}`}
            label="Image alt"
            defaultValue={item?.imageAlt ?? ""}
          />
        </div>
      ))}
    </section>
  );
}

export function AirportRows(props: {
  readonly items: ReadonlyArray<DestinationAirport>;
}) {
  const rows = [...props.items, null, null];
  return (
    <section className="space-y-3 rounded-[var(--radius-md)] border border-border p-4">
      <h2 className="text-lg font-semibold text-primary-text">Nearby airports</h2>
      {rows.map((item, index) => (
        <div
          key={`airport-${item?.id ?? `new-${String(index)}`}`}
          className="grid gap-2 rounded-[var(--radius-sm)] border border-border/70 p-3"
        >
          <Field
            name={`airport_airportName_${String(index)}`}
            label="Airport name"
            defaultValue={item?.airportName ?? ""}
          />
          <Field
            name={`airport_airportCode_${String(index)}`}
            label="Airport code"
            defaultValue={item?.airportCode ?? ""}
          />
          <TextArea
            name={`airport_description_${String(index)}`}
            label="Description"
            defaultValue={item?.description ?? ""}
            rows={3}
          />
          <Field
            name={`airport_distanceOrArea_${String(index)}`}
            label="Distance / area"
            defaultValue={item?.distanceOrArea ?? ""}
          />
          <Field
            name={`airport_airportLink_${String(index)}`}
            label="Airport link"
            defaultValue={item?.airportLink ?? ""}
          />
        </div>
      ))}
    </section>
  );
}

export function SeasonRows(props: {
  readonly items: ReadonlyArray<DestinationSeason>;
}) {
  const rows = [...props.items, null, null];
  return (
    <section className="space-y-3 rounded-[var(--radius-md)] border border-border p-4">
      <h2 className="text-lg font-semibold text-primary-text">Seasons</h2>
      {rows.map((item, index) => (
        <div
          key={`season-${item?.id ?? `new-${String(index)}`}`}
          className="grid gap-2 rounded-[var(--radius-sm)] border border-border/70 p-3"
        >
          <Field
            name={`season_season_${String(index)}`}
            label="Season"
            defaultValue={item?.season ?? ""}
          />
          <Field
            name={`season_months_${String(index)}`}
            label="Months"
            defaultValue={item?.months ?? ""}
          />
          <TextArea
            name={`season_description_${String(index)}`}
            label="Description"
            defaultValue={item?.description ?? ""}
            rows={3}
          />
        </div>
      ))}
    </section>
  );
}

export function FaqRows(props: { readonly items: ReadonlyArray<DestinationFaq> }) {
  const rows = [...props.items, null, null];
  return (
    <section className="space-y-3 rounded-[var(--radius-md)] border border-border p-4">
      <h2 className="text-lg font-semibold text-primary-text">FAQs</h2>
      {rows.map((item, index) => (
        <div
          key={`faq-${item?.id ?? `new-${String(index)}`}`}
          className="grid gap-2 rounded-[var(--radius-sm)] border border-border/70 p-3"
        >
          <Field
            name={`faq_question_${String(index)}`}
            label="Question"
            defaultValue={item?.question ?? ""}
          />
          <TextArea
            name={`faq_answer_${String(index)}`}
            label="Answer"
            defaultValue={item?.answer ?? ""}
            rows={3}
          />
        </div>
      ))}
    </section>
  );
}

export function GalleryRows(props: {
  readonly items: ReadonlyArray<DestinationGalleryImage>;
}) {
  const rows = [...props.items, null, null, null];
  return (
    <section className="space-y-3 rounded-[var(--radius-md)] border border-border p-4">
      <h2 className="text-lg font-semibold text-primary-text">Gallery</h2>
      {rows.map((item, index) => (
        <div
          key={`gallery-${item?.id ?? `new-${String(index)}`}`}
          className="grid gap-2 rounded-[var(--radius-sm)] border border-border/70 p-3"
        >
          <MediaUploadField
            name={`gallery_mediaAssetId_${String(index)}`}
            label="Photo"
            initial={item?.image ?? null}
          />
          <Field
            name={`gallery_imageAlt_${String(index)}`}
            label="Image alt"
            defaultValue={item?.imageAlt ?? ""}
          />
        </div>
      ))}
    </section>
  );
}
