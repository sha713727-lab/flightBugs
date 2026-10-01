import Link from "next/link";
import { redirect } from "next/navigation";

import { DeleteDestinationButton } from "@/features/usa-destinations/delete-destination-button";
import { getAdminSessionToken } from "@/lib/admin/session";
import { getSignedBackend } from "@/lib/backend-request";
import { adminLogoutAction } from "@/server/actions/admin-destinations";
import type { DestinationSummary } from "@/types/destinations";

type AdminDestinationsListPageProps = {
  readonly searchParams: Promise<{ readonly error?: string }>;
};

export default async function AdminDestinationsListPage({
  searchParams,
}: AdminDestinationsListPageProps) {
  const token = await getAdminSessionToken();
  if (!token) {
    redirect("/en/admin/login");
  }

  const query = await searchParams;
  const result = await getSignedBackend<{
    destinations: ReadonlyArray<DestinationSummary>;
  }>("/destinations/list?scope=admin", { adminSessionToken: token });

  if (!result.ok) {
    return (
      <main className="min-h-screen bg-soft-section px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary-text">
                Destinations
              </h1>
              <p className="mt-2 text-sm text-secondary-text">
                Create and publish USA destination pages.
              </p>
            </div>
            <form action={adminLogoutAction}>
              <button
                type="submit"
                className="rounded-full border border-border px-4 py-2 text-sm font-medium text-primary-text"
              >
                Log out
              </button>
            </form>
          </div>
          <p className="mt-8 rounded-[var(--radius-sm)] bg-red-50 px-3 py-2 text-sm text-red-700">
            Destinations could not be loaded. Reload to try again.
          </p>
        </div>
      </main>
    );
  }

  const destinations = result.data.destinations;

  return (
    <main className="min-h-screen bg-soft-section px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary-text">Destinations</h1>
            <p className="mt-2 text-sm text-secondary-text">
              Create and publish USA destination pages.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/en/admin/destinations/new"
              className="rounded-full bg-aviation-blue px-4 py-2 text-sm font-semibold text-on-accent"
            >
              Add destination
            </Link>
            <form action={adminLogoutAction}>
              <button
                type="submit"
                className="rounded-full border border-border px-4 py-2 text-sm font-medium text-primary-text"
              >
                Log out
              </button>
            </form>
          </div>
        </div>

        {query.error ? (
          <p className="mt-4 rounded-[var(--radius-sm)] bg-red-50 px-3 py-2 text-sm text-red-700">
            Destination could not be deleted.
          </p>
        ) : null}

        <div className="mt-8 overflow-hidden rounded-[var(--radius-lg)] border border-border bg-main-bg">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-soft-section">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Slug</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Nav</th>
                <th className="px-4 py-3 font-semibold">Order</th>
                <th className="px-4 py-3 font-semibold">Edit</th>
                <th className="px-4 py-3 font-semibold">Delete</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((destination) => (
                <tr key={destination.id} className="border-b border-border">
                  <td className="px-4 py-3">{destination.destinationName}</td>
                  <td className="px-4 py-3">{destination.slug}</td>
                  <td className="px-4 py-3">
                    {destination.published ? "Published" : "Draft"}
                  </td>
                  <td className="px-4 py-3">
                    {destination.showInNavigation ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-3">{destination.navigationOrder}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/en/admin/destinations/${destination.id}`}
                      className="font-medium text-aviation-blue"
                    >
                      Edit
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <DeleteDestinationButton
                      id={destination.id}
                      name={destination.destinationName}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
