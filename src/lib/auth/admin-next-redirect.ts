import {
  ADMIN_HOME_PATH,
  ADMIN_LOGIN_PATH,
} from "@/lib/auth/admin-auth-constants";

export function sanitizeAdminNextPath(
  rawNext: string | null | undefined,
): string {
  if (!rawNext) {
    return ADMIN_HOME_PATH;
  }

  if (!rawNext.startsWith("/admin")) {
    return ADMIN_HOME_PATH;
  }

  if (rawNext.startsWith(ADMIN_LOGIN_PATH)) {
    return ADMIN_HOME_PATH;
  }

  return rawNext;
}

export function buildAdminLoginRedirect(nextPath: string): string {
  const params = new URLSearchParams({ next: nextPath });
  return `${ADMIN_LOGIN_PATH}?${params.toString()}`;
}
