import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_HOME_PATH,
  ADMIN_LOGIN_PATH,
  ADMIN_SESSION_COOKIE_NAME,
} from "@/lib/auth/admin-auth-constants";
import {
  buildAdminLoginRedirect,
  sanitizeAdminNextPath,
} from "@/lib/auth/admin-next-redirect";
import { isValidAdminToken } from "@/lib/auth/admin-jwt";
import { getRequestAdminSessionToken } from "@/lib/auth/admin-request-session";
import { getAdminSessionCookieOptions } from "@/lib/auth/admin-session-cookie-options";

function clearSessionCookie(response: NextResponse) {
  response.cookies.set(ADMIN_SESSION_COOKIE_NAME, "", {
    ...getAdminSessionCookieOptions(),
    maxAge: 0,
  });
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = getRequestAdminSessionToken(request);
  const isLoginPath = pathname === ADMIN_LOGIN_PATH;

  const validation = token ? isValidAdminToken(token) : { valid: false };

  if (isLoginPath) {
    if (validation.valid) {
      const requested = request.nextUrl.searchParams.get("next");
      const destination = sanitizeAdminNextPath(requested);
      return NextResponse.redirect(new URL(destination, request.url));
    }

    if (token && !validation.valid) {
      const response = NextResponse.next();
      clearSessionCookie(response);
      return response;
    }

    return NextResponse.next();
  }

  if (!validation.valid) {
    const nextPath = `${pathname}${search}`;
    const loginPath = buildAdminLoginRedirect(nextPath);
    const response = NextResponse.redirect(new URL(loginPath, request.url));

    if (token) {
      clearSessionCookie(response);
    }

    return response;
  }

  if (pathname === "/admin") {
    return NextResponse.next();
  }

  if (pathname.startsWith(ADMIN_HOME_PATH)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
