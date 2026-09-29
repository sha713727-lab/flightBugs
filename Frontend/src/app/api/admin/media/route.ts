import { env } from "@/lib/env";
import { uploadDestinationMedia } from "@/lib/admin/upload-destination-media";

function isAllowedBrowserOrigin(request: Request): boolean {
  const allowed = new URL(env.NEXT_PUBLIC_APP_URL).origin;
  const originHeader = request.headers.get("origin");
  if (originHeader) {
    return originHeader === allowed;
  }
  const referer = request.headers.get("referer");
  if (!referer) {
    return false;
  }
  try {
    return new URL(referer).origin === allowed;
  } catch {
    return false;
  }
}

export async function POST(request: Request): Promise<Response> {
  if (!isAllowedBrowserOrigin(request)) {
    return Response.json(
      { ok: false, message: "Invalid origin" },
      { status: 403 },
    );
  }

  const formData = await request.formData();
  const result = await uploadDestinationMedia(formData);
  return Response.json(result, { status: result.ok ? 201 : 400 });
}
