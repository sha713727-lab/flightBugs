"use client";

import Image from "next/image";
import { useState, useTransition } from "react";

import { uploadMediaAction } from "@/server/actions/admin-destinations";
import type { DestinationMediaRef } from "@/types/destinations";

type MediaUploadFieldProps = {
  readonly name: string;
  readonly label: string;
  readonly initial: DestinationMediaRef | null;
};

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
  const [pending, startTransition] = useTransition();

  return (
    <div className="block text-sm font-medium text-primary-text">
      <span>{label}</span>
      <input type="hidden" name={name} value={media?.id ?? ""} />
      {media ? (
        <div className="relative mt-1 h-32 w-full overflow-hidden rounded-[var(--radius-sm)] border border-border">
          <Image
            src={media.publicPath}
            alt=""
            fill
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
          if (file.size > 5 * 1024 * 1024) {
            setError("Image must be 5 MB or smaller");
            return;
          }
          const data = new FormData();
          data.set("file", file);
          startTransition(async () => {
            const result = await uploadMediaAction(data);
            if (!result.ok) {
              setError(result.message);
              return;
            }
            setError(null);
            setMedia({
              id: result.mediaAssetId,
              publicPath: result.publicPath,
            });
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
