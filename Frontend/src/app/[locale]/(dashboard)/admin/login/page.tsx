import Link from "next/link";

import {
  adminLoginAction,
} from "@/server/actions/admin-destinations";

type AdminLoginPageProps = {
  readonly searchParams: Promise<{ readonly error?: string }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-soft-section px-6">
      <form
        action={adminLoginAction}
        className="w-full max-w-md rounded-[var(--radius-xl)] border border-border bg-main-bg p-8 shadow-float"
      >
        <h1 className="text-2xl font-bold text-primary-text">Admin login</h1>
        <p className="mt-2 text-sm text-secondary-text">
          Manage USA destination pages.
        </p>
        {params.error ? (
          <p className="mt-4 rounded-[var(--radius-sm)] bg-red-50 px-3 py-2 text-sm text-red-700">
            Invalid email or password.
          </p>
        ) : null}
        <label className="mt-6 block text-sm font-medium text-primary-text">
          Email
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-[var(--radius-sm)] border border-border px-3 py-2"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-primary-text">
          Password
          <input
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded-[var(--radius-sm)] border border-border px-3 py-2"
          />
        </label>
        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-aviation-blue px-4 py-3 text-sm font-semibold text-on-accent"
        >
          Sign in
        </button>
        <p className="mt-4 text-center text-sm text-secondary-text">
          <Link href="/en" className="text-aviation-blue">
            Back to site
          </Link>
        </p>
      </form>
    </main>
  );
}
