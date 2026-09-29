"use client";

import { useState } from "react";

import { MAX_DESTINATION_IMAGE_BYTES } from "@/constants/media-upload";
import { DestinationCmsImage } from "@/features/usa-destinations/destination-cms-image";
import type { DestinationMediaRef } from "@/types/destinations";

type MediaUploadFieldProps = {
  readonly name: string;
  readonly label: string;
  readonly initial: DestinationMediaRef | null;
};

type UploadJson =
  | {
      readonly ok: true;
      readonly mediaAssetId: string;
      readonly publicPath: string;
    }
  | { readonly ok: false; readonly message: string };

function parseUploadJson(value: unknown): UploadJson | null {
  if (typeof value !== "object" || value === null || !("ok" in value)) {
    return null;
  }
  if (value.ok === false) {
    if (!("message" in value) || typeof value.message !== "string") {
      return null;
    }
    return { ok: false, message: value.message };
  }
  if (
    value.ok !== true ||
    !("mediaAssetId" in value) ||
    !("publicPath" in value) ||
    typeof value.mediaAssetId !== "string" ||
    typeof value.publicPath !== "string"
  ) {
    return null;
  }
  return {
    ok: true,
    mediaAssetId: value.mediaAssetId,
    publicPath: value.publicPath,
  };
}

export function MediaUploadField({
  name,
  label,
  initial,
}: MediaUploadFieldProps) {
  const [media, setMedia] = useState<{
    readonly id: string;
    readonly publicPath: string;
  } | null>(
    initial
      ? { id: initial.mediaAssetId, publicPath: initial.publicPath }
      : null,
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  return (
    <div className="block text-sm font-medium text-primary-text">
      <span>{label}</span>
      <input type="hidden" name={name} value={media?.id ?? ""} />
      {media ? (
        <div className="relative mt-1 h-32 w-full overflow-hidden rounded-[var(--radius-sm)] border border-border">
          <DestinationCmsImage
            src={media.publicPath}
            alt=""
            className="object-cover"
            sizes="400px"
          />
        </div>
      ) : null}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="mt-1 w-full text-sm"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (!file) {
            return;
          }
          const allowedMime = new Set([
            "image/jpeg",
            "image/png",
            "image/webp",
          ]);
          const filename = file.name.replace(/^.*[/\\]/, "");
          if (
            !allowedMime.has(file.type) ||
            !/\.(jpe?g|png|webp)$/i.test(filename)
          ) {
            setError(
              "Only JPEG, PNG, or WebP images are allowed. Videos are not accepted.",
            );
            return;
          }
          if (file.size > MAX_DESTINATION_IMAGE_BYTES) {
            setError("Image must be 50 MB or smaller");
            return;
          }
          const data = new FormData();
          data.set("file", file);
          setPending(true);
          void fetch("/api/admin/media", {
            method: "POST",
            body: data,
            credentials: "same-origin",
          })
            .then(async (response) => {
              const result = parseUploadJson(await response.json());
              if (!result) {
                setError("Upload failed");
                return;
              }
              if (!result.ok) {
                setError(result.message);
                return;
              }
              setError(null);
              setMedia({
                id: result.mediaAssetId,
                publicPath: result.publicPath,
              });
            })
            .catch(() => {
              setError("Upload failed");
            })
            .finally(() => {
              setPending(false);
            });
        }}
      />
      {media ? (
        <button
          type="button"
          className="mt-2 text-sm font-medium text-aviation-blue"
          onClick={() => {
            setMedia(null);
            setError(null);
          }}
        >
          Remove photo
        </button>
      ) : null}
      {pending ? (
        <p className="mt-1 text-sm text-secondary-text">Uploading…</p>
      ) : null}
      {error ? (
        <p className="mt-1 text-sm text-red-700">{error}</p>
      ) : null}
    </div>
  );
}
