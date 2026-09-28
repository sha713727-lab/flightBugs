import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "avion_admin_session";

export async function getAdminSessionToken(): Promise<string | null> {
  const jar = await cookies();
  const value = jar.get(ADMIN_SESSION_COOKIE)?.value;
  return value && value.length > 0 ? value : null;
}
