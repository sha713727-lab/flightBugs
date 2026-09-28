"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ADMIN_SESSION_COOKIE } from "@/lib/admin/session";
import {
  deleteSignedBackend,
  postSignedBackend,
  postSignedBackendBuffer,
  postSignedBackendWithSession,
  putSignedBackend,
} from "@/lib/backend-request";
import type {
  DestinationAirport,
  DestinationFaq,
  DestinationSeason,
} from "@/types/destinations";

function readIndexedRows(
  formData: FormData,
  prefix: string,
  fields: ReadonlyArray<string>,
): ReadonlyArray<Record<string, string>> {
  const rows: Array<Record<string, string>> = [];
  for (let index = 0; index < 50; index += 1) {
    const values: Record<string, string> = {};
    let hasAny = false;
    for (const field of fields) {
      const raw = formData.get(`${prefix}_${field}_${String(index)}`);
      const value = typeof raw === "string" ? raw.trim() : "";
      values[field] = value;
      if (value.length > 0) {
        hasAny = true;
      }
    }
    if (!hasAny) {
      continue;
    }
    rows.push(values);
  }
  return rows;
}

function parseThings(
  formData: FormData,
  prefix: string,
) {
  return readIndexedRows(formData, prefix, [
    "title",
    "description",
    "imageMediaAssetId",
    "imageAlt",
  ]).map((row, index) => ({
    title: row.title ?? "",
    description: row.description ?? "",
    imageMediaAssetId: row.imageMediaAssetId ? row.imageMediaAssetId : null,
    imageAlt: row.imageAlt ?? "",
    sortOrder: index + 1,
  }));
}

function parseFaqs(
  formData: FormData,
): ReadonlyArray<Omit<DestinationFaq, "id">> {
  return readIndexedRows(formData, "faq", ["question", "answer"]).map(
    (row, index) => ({
      question: row.question ?? "",
      answer: row.answer ?? "",
      sortOrder: index + 1,
    }),
  );
}

function parseAirports(
  formData: FormData,
): ReadonlyArray<Omit<DestinationAirport, "id">> {
  return readIndexedRows(formData, "airport", [
    "airportName",
    "airportCode",
    "description",
    "distanceOrArea",
    "airportLink",
  ]).map((row, index) => ({
    airportName: row.airportName ?? "",
    airportCode: row.airportCode ?? "",
    description: row.description ?? "",
    distanceOrArea: row.distanceOrArea ?? "",
    airportLink: row.airportLink ? row.airportLink : null,
    sortOrder: index + 1,
  }));
}

function parseSeasons(
  formData: FormData,
): ReadonlyArray<Omit<DestinationSeason, "id">> {
  return readIndexedRows(formData, "season", [
    "season",
    "months",
    "description",
  ]).map((row, index) => ({
    season: row.season ?? "",
    months: row.months ?? "",
    description: row.description ?? "",
    sortOrder: index + 1,
  }));
}

function parseGallery(formData: FormData) {
  return readIndexedRows(formData, "gallery", ["mediaAssetId", "imageAlt"])
    .filter((row) => (row.mediaAssetId ?? "").length > 0)
    .map((row, index) => ({
      mediaAssetId: row.mediaAssetId ?? "",
      imageAlt: row.imageAlt ?? "",
      sortOrder: index + 1,
    }));
}

export async function adminLoginAction(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const result = await postSignedBackend<{
    token: string;
    expiresAt: string;
  }>("/admin/sessions", { email, password });

  if (!result.ok) {
    redirect("/en/admin/login?error=1");
  }

  const jar = await cookies();
  jar.set(ADMIN_SESSION_COOKIE, result.data.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(result.data.expiresAt),
  });

  redirect("/en/admin/destinations");
}

export async function adminLogoutAction(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(ADMIN_SESSION_COOKIE)?.value;
  if (token) {
    await deleteSignedBackend(
      "/admin/sessions",
      {},
      { adminSessionToken: token },
    );
  }
  jar.delete(ADMIN_SESSION_COOKIE);
  redirect("/en/admin/login");
}

export async function saveDestinationAction(formData: FormData): Promise<void> {
  const jar = await cookies();
  const token = jar.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) {
    redirect("/en/admin/login");
  }

  const id = String(formData.get("id") ?? "");

  const payload = {
    destinationName: String(formData.get("destinationName") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    state: String(formData.get("state") ?? ""),
    country: String(formData.get("country") ?? "United States"),
    shortDescription: String(formData.get("shortDescription") ?? ""),
    fullDescription: String(formData.get("fullDescription") ?? ""),
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
    showInNavigation: formData.get("showInNavigation") === "on",
    navigationOrder: Number(formData.get("navigationOrder") ?? 0),
    heroHeading: String(formData.get("heroHeading") ?? ""),
    heroSubheading: String(formData.get("heroSubheading") ?? ""),
    heroDescription: String(formData.get("heroDescription") ?? ""),
    heroMediaAssetId: String(formData.get("heroMediaAssetId") ?? "") || null,
    heroImageAlt: String(formData.get("heroImageAlt") ?? ""),
    heroCtaText: String(formData.get("heroCtaText") ?? "") || null,
    whyVisitHeading: String(formData.get("whyVisitHeading") ?? ""),
    whyVisitDescription: String(formData.get("whyVisitDescription") ?? ""),
    bestTimeHeading: String(formData.get("bestTimeHeading") ?? ""),
    bestTimeSummary: String(formData.get("bestTimeSummary") ?? ""),
    metaTitle: String(formData.get("metaTitle") ?? ""),
    metaDescription: String(formData.get("metaDescription") ?? ""),
    canonicalUrl: String(formData.get("canonicalUrl") ?? "") || null,
    ogTitle: String(formData.get("ogTitle") ?? "") || null,
    ogDescription: String(formData.get("ogDescription") ?? "") || null,
    ogMediaAssetId: String(formData.get("ogMediaAssetId") ?? "") || null,
    primaryKeyword: String(formData.get("primaryKeyword") ?? "") || null,
    secondaryKeywords: String(formData.get("secondaryKeywords") ?? "") || null,
    thingsToDo: parseThings(formData, "thing"),
    experiences: parseThings(formData, "experience"),
    culinaryItems: parseThings(formData, "culinary"),
    airports: parseAirports(formData),
    seasons: parseSeasons(formData),
    faqs: parseFaqs(formData),
    galleryImages: parseGallery(formData),
  };

  if (id) {
    const result = await putSignedBackend(
      "/destinations",
      { id, ...payload },
      { adminSessionToken: token },
    );
    if (!result.ok) {
      redirect(`/en/admin/destinations/${id}?error=1`);
    }
    redirect(`/en/admin/destinations/${id}?saved=1`);
  }

  const created = await postSignedBackendWithSession(
    "/destinations",
    payload,
    token,
  );
  if (!created.ok) {
    redirect("/en/admin/destinations/new?error=1");
  }

  const destinationId = (
    created.data as { destination: { id: string } }
  ).destination.id;
  redirect(`/en/admin/destinations/${destinationId}?saved=1`);
}

export async function uploadMediaAction(formData: FormData): Promise<
  | {
      readonly ok: true;
      readonly mediaAssetId: string;
      readonly publicPath: string;
    }
  | { readonly ok: false; readonly message: string }
> {
  const jar = await cookies();
  const token = jar.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) {
    return { ok: false, message: "Not signed in" };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "Choose an image" };
  }

  const mime = file.type;
  const filename = file.name.replace(/^.*[/\\]/, "").slice(0, 200);
  const altText = String(formData.get("alt") ?? "").slice(0, 300);
  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await postSignedBackendBuffer<{
    media: { id: string; publicPath: string };
  }>("/media", buffer, {
    "Content-Type": "application/octet-stream",
    "X-Filename": filename,
    "X-Mime-Type": mime,
    "X-Alt-Text": altText,
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

export async function deleteDestinationAction(formData: FormData): Promise<void> {
  const jar = await cookies();
  const token = jar.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) {
    redirect("/en/admin/login");
  }

  const id = String(formData.get("id") ?? "");
  const result = await deleteSignedBackend(
    "/destinations",
    { id },
    { adminSessionToken: token },
  );
  if (!result.ok) {
    redirect("/en/admin/destinations?error=1");
  }
  redirect("/en/admin/destinations");
}
