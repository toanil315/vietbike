import { NextRequest, NextResponse } from "next/server";
import { adminAuthEndpoints } from "@/lib/api-endpoints";
import { ADMIN_SESSION_COOKIE_NAME } from "@/lib/auth/admin-auth-constants";
import { getRequestAdminSessionToken } from "@/lib/auth/admin-request-session";
import { getAdminSessionCookieOptions } from "@/lib/auth/admin-session-cookie-options";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export async function POST(request: NextRequest) {
  const token = getRequestAdminSessionToken(request);

  if (token) {
    try {
      await fetch(`${API_BASE_URL}${adminAuthEndpoints.logout()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });
    } catch {
      // Best effort backend logout; local cookie clear is authoritative for frontend access.
    }
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE_NAME, "", {
    ...getAdminSessionCookieOptions(),
    maxAge: 0,
  });

  return response;
}
