import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { AdminDestinationForm } from "@/features/usa-destinations/admin-destination-form";
import { DeleteDestinationButton } from "@/features/usa-destinations/delete-destination-button";
import { getAdminSessionToken } from "@/lib/admin/session";
import { getSignedBackend } from "@/lib/backend-request";
import { saveDestinationAction } from "@/server/actions/admin-destinations";
import type { DestinationDetail } from "@/types/destinations";

type AdminDestinationEditPageProps = {
  readonly params: Promise<{ readonly id: string }>;
  readonly searchParams: Promise<{
    readonly saved?: string;
    readonly error?: string;
  }>;
};

export default async function AdminDestinationEditPage({
  params,
  searchParams,
}: AdminDestinationEditPageProps) {
  const token = await getAdminSessionToken();
  if (!token) {
    redirect("/en/admin/login");
  }

  const { id } = await params;
  const query = await searchParams;
  const isNew = id === "new";

  let destination: DestinationDetail | null = null;
  if (!isNew) {
    const result = await getSignedBackend<{ destination: DestinationDetail }>(
      `/destinations/details?id=${encodeURIComponent(id)}&scope=admin`,
      { adminSessionToken: token },
    );
    if (!result.ok) {
      notFound();
    }
    destination = result.data.destination;
  }

  return (
    <main className="min-h-screen bg-soft-section px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-primary-text">
            {isNew
              ? "Add destination"
              : `Edit ${destination?.destinationName ?? ""}`}
          </h1>
          <div className="flex items-center gap-4">
            {!isNew && destination ? (
              <DeleteDestinationButton
                id={destination.id}
                name={destination.destinationName}
              />
            ) : null}
            <Link
              href="/en/admin/destinations"
              className="text-sm text-aviation-blue"
            >
              Back to list
            </Link>
          </div>
        </div>

        {query.saved ? (
          <p className="mb-4 rounded-[var(--radius-sm)] bg-green-50 px-3 py-2 text-sm text-green-700">
            Saved.
          </p>
        ) : null}
        {query.error ? (
          <p className="mb-4 rounded-[var(--radius-sm)] bg-red-50 px-3 py-2 text-sm text-red-700">
            {query.error === "1"
              ? "Could not save. Check required fields and unique slug."
              : query.error}
          </p>
        ) : null}

        <AdminDestinationForm
          destination={destination}
          isNew={isNew}
          action={saveDestinationAction}
        />
      </div>
    </main>
  );
}
