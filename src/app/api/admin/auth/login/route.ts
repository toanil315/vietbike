import { NextResponse } from "next/server";
import { adminAuthEndpoints } from "@/lib/api-endpoints";
import { ADMIN_SESSION_COOKIE_NAME } from "@/lib/auth/admin-auth-constants";
import { buildAdminSessionResponse } from "@/lib/auth/admin-auth-response";
import { isValidAdminToken } from "@/lib/auth/admin-jwt";
import { sanitizeAdminNextPath } from "@/lib/auth/admin-next-redirect";
import { getAdminSessionCookieOptions } from "@/lib/auth/admin-session-cookie-options";
import { extractAccessToken } from "@/lib/auth/extract-access-token";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export async function POST(request: Request) {
  let credentials: unknown;

  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: { message: "Invalid request body" } },
      { status: 400 },
    );
  }

  const upstream = await fetch(`${API_BASE_URL}${adminAuthEndpoints.login()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    cache: "no-store",
  });

  let payload: unknown = null;

  if (!upstream.ok) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.",
        },
      },
      { status: upstream.status },
    );
  }

  try {
    payload = await upstream.json();
  } catch {
    payload = null;
  }

  const token = extractAccessToken(payload);

  console.log("Admin login successful, token obtained:", token);

  if (!token) {
    return NextResponse.json(
      { success: false, error: { message: "Auth token was not returned" } },
      { status: 502 },
    );
  }

  const validation = isValidAdminToken(token);
  if (!validation.valid || !validation.claims) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Tài khoản không có quyền quản trị hoặc token không hợp lệ.",
        },
      },
      { status: 403 },
    );
  }

  const nextUrl = new URL(request.url).searchParams.get("next");
  const response = NextResponse.json({
    success: true,
    data: {
      ...buildAdminSessionResponse(token, validation.claims),
      next: sanitizeAdminNextPath(nextUrl),
    },
  });

  response.cookies.set(
    ADMIN_SESSION_COOKIE_NAME,
    token,
    getAdminSessionCookieOptions(),
  );

  return response;
}
