import type { AdminTokenClaims } from "@/lib/auth/admin-jwt";

export type AdminSessionData = {
  authenticated: boolean;
  user: {
    id: string | null;
    email: string | null;
    name: string | null;
    roleKey: string[];
  } | null;
  accessToken: string | null;
};

export interface AdminSessionResponse {
  success: boolean;
  data: AdminSessionData | null;
}

export function buildAdminSessionResponse(
  token: string,
  claims: AdminTokenClaims,
): AdminSessionData {
  return {
    authenticated: true,
    user: {
      id: typeof claims.sub === "string" ? claims.sub : null,
      email: typeof claims.email === "string" ? claims.email : null,
      name: typeof claims.fullName === "string" ? claims.fullName : null,
      roleKey: Array.isArray(claims.roleKey) ? claims.roleKey : [],
    },
    accessToken: token,
  };
}
