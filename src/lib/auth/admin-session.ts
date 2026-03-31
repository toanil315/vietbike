import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE_NAME } from "@/lib/auth/admin-auth-constants";
import { getAdminSessionCookieOptions } from "@/lib/auth/admin-session-cookie-options";

export async function getServerAdminSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value ?? null;
}

export async function clearServerAdminSessionToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE_NAME);
}

export { getAdminSessionCookieOptions };
