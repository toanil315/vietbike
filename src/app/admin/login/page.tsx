"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ADMIN_HOME_PATH,
  ADMIN_LOGIN_PATH,
} from "@/lib/auth/admin-auth-constants";
import { sanitizeAdminNextPath } from "@/lib/auth/admin-next-redirect";

type LoginResponse = {
  success: boolean;
  data?: {
    next?: string;
  };
  error?: {
    message?: string;
  };
};

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const nextPath = useMemo(() => {
    const next = searchParams.get("next");
    const sanitized = sanitizeAdminNextPath(next);
    return sanitized.startsWith(ADMIN_LOGIN_PATH) ? ADMIN_HOME_PATH : sanitized;
  }, [searchParams]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `/api/admin/auth/login?next=${encodeURIComponent(nextPath)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const payload = (await response.json()) as LoginResponse;

      if (!response.ok || !payload.success) {
        setErrorMessage(
          payload.error?.message || "Không thể đăng nhập. Vui lòng thử lại.",
        );
        return;
      }

      const destination = sanitizeAdminNextPath(payload.data?.next ?? nextPath);
      router.replace(destination);
      router.refresh();
    } catch {
      setErrorMessage("Không thể kết nối đến hệ thống. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white border border-outline-variant/15 shadow-sm p-8 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-on-surface">
            Đăng nhập Admin
          </h1>
          <p className="text-sm text-secondary">
            Sử dụng tài khoản quản trị để truy cập hệ thống nội bộ.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-on-surface"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-outline-variant/20 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25"
              placeholder="admin@vietbike.vn"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-on-surface"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-outline-variant/20 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          {errorMessage ? (
            <p className="text-sm text-red-600 rounded-lg bg-red-50 border border-red-100 px-3 py-2">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-xl bg-[#006D5B] text-white font-semibold py-3 hover:bg-[#005a4b] transition-default disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
