import { redirect } from "next/navigation";
import { ADMIN_LOGIN_PATH } from "@/lib/auth/admin-auth-constants";
import { isValidAdminToken, type AdminTokenClaims } from "@/lib/auth/admin-jwt";
import {
  clearServerAdminSessionToken,
  getServerAdminSessionToken,
} from "@/lib/auth/admin-session";

export interface AdminAuthContext {
  accessToken: string;
  claims: AdminTokenClaims;
}

export async function requireAdminAuth(): Promise<AdminAuthContext> {
  const accessToken = await getServerAdminSessionToken();

  if (!accessToken) {
    redirect(ADMIN_LOGIN_PATH);
  }

  const validation = isValidAdminToken(accessToken);
  if (!validation.valid || !validation.claims) {
    await clearServerAdminSessionToken();
    redirect(ADMIN_LOGIN_PATH);
  }

  return {
    accessToken,
    claims: validation.claims,
  };
}

export async function getAdminAuthorizationHeader(): Promise<string> {
  const auth = await requireAdminAuth();
  return `Bearer ${auth.accessToken}`;
}
