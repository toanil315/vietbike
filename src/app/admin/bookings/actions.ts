"use server";

import { revalidatePath } from "next/cache";
import { adminBookingEndpoints } from "@/lib/api-endpoints";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

type ApiSuccess<T> = { success: true; data: T };
type ApiFailure = {
  success: false;
  error?: {
    message?: string;
  };
};

type ApiResult<T> = ApiSuccess<T> | ApiFailure;

export async function updateBookingStatusAction(
  bookingId: string,
  status: "confirmed" | "active" | "completed" | "cancelled",
  reason?: string,
) {
  const response = await fetch(
    `${API_BASE_URL}${adminBookingEndpoints.updateStatus(bookingId)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status, reason }),
      cache: "no-store",
    },
  );

  const payload = (await response.json()) as ApiResult<{ bookingId: string }>;

  if (!response.ok || !payload.success) {
    return {
      ok: false,
      error: payload.success
        ? "Failed to update booking status"
        : payload.error?.message,
    };
  }

  revalidatePath("/admin/bookings");

  return { ok: true, data: payload.data };
}
