import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE_NAME } from "@/lib/auth/admin-auth-constants";
import { buildAdminSessionResponse } from "@/lib/auth/admin-auth-response";
import { isValidAdminToken } from "@/lib/auth/admin-jwt";
import { getRequestAdminSessionToken } from "@/lib/auth/admin-request-session";
import { getAdminSessionCookieOptions } from "@/lib/auth/admin-session-cookie-options";

export async function GET(request: NextRequest) {
  const finalToken = getRequestAdminSessionToken(request);

  if (!finalToken) {
    return NextResponse.json({
      success: true,
      data: { authenticated: false, user: null, accessToken: null },
    });
  }

  const validation = isValidAdminToken(finalToken);
  if (!validation.valid || !validation.claims) {
    const response = NextResponse.json({
      success: true,
      data: { authenticated: false, user: null, accessToken: null },
    });

    response.cookies.set(ADMIN_SESSION_COOKIE_NAME, "", {
      ...getAdminSessionCookieOptions(),
      maxAge: 0,
    });
    return response;
  }

  return NextResponse.json({
    success: true,
    data: buildAdminSessionResponse(finalToken, validation.claims),
  });
}
