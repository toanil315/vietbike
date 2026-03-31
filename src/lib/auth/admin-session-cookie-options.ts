export type AdminSessionCookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax";
  path: string;
  maxAge: number;
};

export function getAdminSessionCookieOptions(): AdminSessionCookieOptions {
  return {
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    sameSite: "lax",
    path: "/",
    maxAge: 4 * 60 * 60,
  };
}
