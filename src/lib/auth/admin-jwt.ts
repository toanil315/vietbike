import {
  ADMIN_REQUIRED_ROLE,
  ADMIN_TOKEN_CLOCK_SKEW_SECONDS,
} from "@/lib/auth/admin-auth-constants";

export interface AdminTokenClaims {
  exp?: number;
  roleKey?: string;
  sub?: string;
  email?: string;
  fullName?: string;
  [key: string]: unknown;
}

function decodeBase64Url(input: string): string {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");

  if (typeof atob === "function") {
    return atob(padded);
  }

  return Buffer.from(padded, "base64").toString("utf-8");
}

export function decodeJwtClaims(token: string): AdminTokenClaims | null {
  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }

  try {
    const payload = decodeBase64Url(parts[1]);
    const parsed = JSON.parse(payload) as AdminTokenClaims;
    return typeof parsed === "object" && parsed !== null ? parsed : null;
  } catch {
    return null;
  }
}

export function hasRequiredAdminRole(claims: AdminTokenClaims): boolean {
  if (!claims.roleKey) return false;

  return claims.roleKey === ADMIN_REQUIRED_ROLE;
}

export function isTokenExpired(
  claims: AdminTokenClaims,
  nowEpochSeconds: number = Math.floor(Date.now() / 1000),
): boolean {
  if (typeof claims.exp !== "number") {
    return true;
  }

  return nowEpochSeconds > claims.exp + ADMIN_TOKEN_CLOCK_SKEW_SECONDS;
}

export function isValidAdminToken(token: string): {
  valid: boolean;
  claims: AdminTokenClaims | null;
} {
  const claims = decodeJwtClaims(token);

  if (!claims) {
    return { valid: false, claims: null };
  }

  if (!hasRequiredAdminRole(claims) || isTokenExpired(claims)) {
    return { valid: false, claims };
  }

  return { valid: true, claims };
}
