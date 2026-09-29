import { MAX_DESTINATION_IMAGE_BYTES } from "@/constants/media-upload";
import { getAdminSessionToken } from "@/lib/admin/session";
import { postSignedBackendBuffer } from "@/lib/backend-request";

export type DestinationMediaUploadResult =
  | {
      readonly ok: true;
      readonly mediaAssetId: string;
      readonly publicPath: string;
    }
  | { readonly ok: false; readonly message: string };

const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function uploadDestinationMedia(
  formData: FormData,
): Promise<DestinationMediaUploadResult> {
  const token = await getAdminSessionToken();
  if (!token) {
    return { ok: false, message: "Not signed in" };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "Choose a JPEG, PNG, or WebP image" };
  }

  const filename = file.name.replace(/^.*[/\\]/, "").slice(0, 200);
  if (!ALLOWED_MIME.has(file.type) || !/\.(jpe?g|png|webp)$/i.test(filename)) {
    return {
      ok: false,
      message:
        "Only JPEG, PNG, or WebP images are allowed. Videos are not accepted.",
    };
  }
  if (file.size > MAX_DESTINATION_IMAGE_BYTES) {
    return { ok: false, message: "Image must be 50 MB or smaller" };
  }

  const result = await postSignedBackendBuffer<{
    media: { id: string; publicPath: string };
  }>("/media", Buffer.from(await file.arrayBuffer()), {
    "Content-Type": "application/octet-stream",
    "X-Filename": filename,
    "X-Mime-Type": file.type,
    "X-Alt-Text": String(formData.get("alt") ?? "").slice(0, 300),
    "X-Admin-Session": token,
  });

  if (!result.ok) {
    return { ok: false, message: result.message };
  }

  return {
    ok: true,
    mediaAssetId: result.data.media.id,
    publicPath: result.data.media.publicPath,
  };
}
