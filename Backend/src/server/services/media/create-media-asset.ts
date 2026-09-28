import {
  createMediaAsset,
  type MediaAsset,
} from "../../database/repositories/media/media-assets.js";

export async function createUploadedMediaAsset(input: {
  readonly buffer: Buffer;
  readonly originalFilename: string;
  readonly declaredMime: string;
  readonly altText: string;
}): Promise<MediaAsset | { error: "invalid_type" | "empty" }> {
  return createMediaAsset(input);
}
