import { serverEnv } from "@/lib/server-env";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return new Response("Missing id", { status: 400 });
  }

  const upstream = await fetch(
    `${serverEnv.BACKEND_URL}/media/file?id=${encodeURIComponent(id)}`,
    { cache: "no-store" },
  );

  if (!upstream.ok || !upstream.body) {
    return new Response("Not found", {
      status: upstream.ok ? 404 : upstream.status,
    });
  }

  const contentType =
    upstream.headers.get("Content-Type") ?? "application/octet-stream";

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
