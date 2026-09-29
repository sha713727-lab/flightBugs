"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ADMIN_SESSION_COOKIE } from "@/lib/admin/session";
import {
  deleteSignedBackend,
  postSignedBackend,
  postSignedBackendWithSession,
  putSignedBackend,
  type BackendResult,
} from "@/lib/backend-request";
import type {
  DestinationAirport,
  DestinationFaq,
  DestinationSeason,
} from "@/types/destinations";

class DestinationSaveValidationError extends Error {
  constructor(detail: string) {
    super(detail);
    this.name = "DestinationSaveValidationError";
  }
}

function formatBackendSaveError(result: Extract<BackendResult<unknown>, { ok: false }>): string {
  if (result.fields && result.fields.length > 0) {
    return result.fields
      .map((field) => `${field.path}: ${field.message}`)
      .join(" ")
      .slice(0, 280);
  }
  return result.message.slice(0, 280);
}

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
  const rows = readIndexedRows(formData, prefix, [
    "title",
    "description",
    "imageMediaAssetId",
    "imageAlt",
  ]);

  if (
    rows.some(
      (row) =>
        (row.imageMediaAssetId ?? "").length > 0 &&
        (row.title ?? "").trim().length === 0,
    )
  ) {
    throw new DestinationSaveValidationError(
      "Each photo needs a title in that same row. Remove the extra blank photo row or add a title.",
    );
  }

  return rows
    .filter((row) => (row.title ?? "").trim().length > 0)
    .map((row, index) => ({
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
  return readIndexedRows(formData, "faq", ["question", "answer"])
    .filter(
      (row) =>
        (row.question ?? "").trim().length > 0 &&
        (row.answer ?? "").trim().length > 0,
    )
    .map((row, index) => ({
      question: row.question ?? "",
      answer: row.answer ?? "",
      sortOrder: index + 1,
    }));
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
  ])
    .filter(
      (row) =>
        (row.airportName ?? "").trim().length > 0 &&
        (row.airportCode ?? "").trim().length >= 3,
    )
    .map((row, index) => ({
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
  ])
    .filter((row) => (row.season ?? "").trim().length > 0)
    .map((row, index) => ({
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
  const failPath = id
    ? `/en/admin/destinations/${id}`
    : "/en/admin/destinations/new";

  let payload;
  try {
    payload = {
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
  } catch (error) {
    if (error instanceof DestinationSaveValidationError) {
      redirect(`${failPath}?error=${encodeURIComponent(error.message)}`);
    }
    throw error;
  }

  if (id) {
    const result = await putSignedBackend(
      "/destinations",
      { id, ...payload },
      { adminSessionToken: token },
    );
    if (!result.ok) {
      const detail = formatBackendSaveError(result);
      redirect(`${failPath}?error=${encodeURIComponent(detail)}`);
    }
    redirect(`/en/admin/destinations/${id}?saved=1`);
  }

  const created = await postSignedBackendWithSession(
    "/destinations",
    payload,
    token,
  );
  if (!created.ok) {
    const detail = formatBackendSaveError(created);
    redirect(`${failPath}?error=${encodeURIComponent(detail)}`);
  }

  const destinationId = (
    created.data as { destination: { id: string } }
  ).destination.id;
  redirect(`/en/admin/destinations/${destinationId}?saved=1`);
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
