import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

import { env } from "../../../config/env.js";
import { pool } from "../../pool.js";

const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);

const EXT_BY_MIME: Readonly<Record<string, string>> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const FILENAME_PATTERN = /\.(jpe?g|png|webp)$/i;

export type MediaAsset = {
  readonly id: string;
  readonly storageKey: string;
  readonly originalFilename: string;
  readonly mimeType: string;
  readonly byteSize: number;
  readonly altText: string;
  readonly publicPath: string;
};

function sniffMime(buffer: Buffer): string | null {
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return "image/jpeg";
  }
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return "image/png";
  }
  if (
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
    buffer.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "image/webp";
  }
  if (buffer.length >= 6 && buffer.subarray(0, 6).toString("ascii") === "GIF87a") {
    return "image/gif";
  }
  if (buffer.length >= 6 && buffer.subarray(0, 6).toString("ascii") === "GIF89a") {
    return "image/gif";
  }
  return null;
}

function filenameMatchesMime(filename: string, mime: string): boolean {
  const match = FILENAME_PATTERN.exec(filename);
  if (!match) {
    return false;
  }
  const ext = match[0].toLowerCase();
  if (mime === "image/jpeg") {
    return ext === ".jpg" || ext === ".jpeg";
  }
  if (mime === "image/png") {
    return ext === ".png";
  }
  if (mime === "image/webp") {
    return ext === ".webp";
  }
  return false;
}

export async function createMediaAsset(input: {
  readonly buffer: Buffer;
  readonly originalFilename: string;
  readonly declaredMime: string;
  readonly altText: string;
}): Promise<MediaAsset | { error: "invalid_type" | "empty" }> {
  if (input.buffer.byteLength === 0) {
    return { error: "empty" };
  }

  if (!ALLOWED_MIME.has(input.declaredMime)) {
    return { error: "invalid_type" };
  }

  const sniffed = sniffMime(input.buffer);
  if (!sniffed || sniffed !== input.declaredMime || !ALLOWED_MIME.has(sniffed)) {
    return { error: "invalid_type" };
  }

  if (!filenameMatchesMime(input.originalFilename, sniffed)) {
    return { error: "invalid_type" };
  }

  const extension = EXT_BY_MIME[sniffed];
  if (!extension) {
    return { error: "invalid_type" };
  }

  const storageKey = `${randomUUID()}.${extension}`;
  await mkdir(env.UPLOAD_ROOT, { recursive: true });
  await writeFile(join(env.UPLOAD_ROOT, storageKey), input.buffer);

  const result = await pool.query<{
    id: string;
    storage_key: string;
    original_filename: string;
    mime_type: string;
    byte_size: number;
    alt_text: string;
  }>(
    `INSERT INTO media_assets (storage_key, original_filename, mime_type, byte_size, alt_text)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, storage_key, original_filename, mime_type, byte_size, alt_text`,
    [
      storageKey,
      input.originalFilename.slice(0, 200),
      sniffed,
      input.buffer.byteLength,
      input.altText.slice(0, 300),
    ],
  );

  const row = result.rows[0];
  if (!row) {
    throw new Error("Media insert failed");
  }

  return {
    id: row.id,
    storageKey: row.storage_key,
    originalFilename: row.original_filename,
    mimeType: row.mime_type,
    byteSize: row.byte_size,
    altText: row.alt_text,
    publicPath: `/media/file?id=${row.id}`,
  };
}

export async function getMediaAssetById(
  id: string,
): Promise<
  | {
      readonly id: string;
      readonly storageKey: string;
      readonly mimeType: string;
      readonly originalFilename: string;
    }
  | null
> {
  const result = await pool.query<{
    id: string;
    storage_key: string;
    mime_type: string;
    original_filename: string;
  }>(
    `SELECT id, storage_key, mime_type, original_filename
     FROM media_assets
     WHERE id = $1
     LIMIT 1`,
    [id],
  );
  const row = result.rows[0];
  if (!row) {
    return null;
  }
  return {
    id: row.id,
    storageKey: row.storage_key,
    mimeType: row.mime_type,
    originalFilename: row.original_filename,
  };
}
