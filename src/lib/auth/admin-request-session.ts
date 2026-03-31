import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE_NAME } from "@/lib/auth/admin-auth-constants";

export function getRequestAdminSessionToken(
  request: NextRequest,
): string | null {
  return request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value ?? null;
}
