"use server";

import { revalidatePath } from "next/cache";
import { adminBookingEndpoints } from "@/lib/api-endpoints";
import { getAdminAuthorizationHeader } from "@/lib/auth/require-admin-auth";
import { SetSyncTargetPayload, UpdateBookingPayload } from "@/types";

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
  const authorization = await getAdminAuthorizationHeader();
  const response = await fetch(
    `${API_BASE_URL}${adminBookingEndpoints.updateStatus(bookingId)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
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

export async function updateBookingAction(
  bookingId: string,
  payload: UpdateBookingPayload,
) {
  const authorization = await getAdminAuthorizationHeader();
  const response = await fetch(
    `${API_BASE_URL}${adminBookingEndpoints.update(bookingId)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    },
  );

  const parsed = (await response.json()) as ApiResult<{
    bookingId: string;
    reference: string;
  }>;

  if (!response.ok || !parsed.success) {
    return {
      ok: false,
      error: parsed.success
        ? "Failed to update booking"
        : parsed.error?.message,
    };
  }

  revalidatePath("/admin/bookings");
  return { ok: true, data: parsed.data };
}

export async function setSyncTargetAction(payload: SetSyncTargetPayload) {
  const authorization = await getAdminAuthorizationHeader();
  const response = await fetch(
    `${API_BASE_URL}${adminBookingEndpoints.setSyncTarget()}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    },
  );

  const parsed = (await response.json()) as ApiResult<{
    spreadsheetId: string;
  }>;

  if (!response.ok || !parsed.success) {
    return {
      ok: false,
      error: parsed.success
        ? "Failed to set sync target"
        : parsed.error?.message,
    };
  }

  revalidatePath("/admin/bookings");
  return { ok: true, data: parsed.data };
}

export async function pullBookingSyncAction(batchSize: number = 200) {
  const authorization = await getAdminAuthorizationHeader();
  const response = await fetch(
    `${API_BASE_URL}${adminBookingEndpoints.syncPull()}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      body: JSON.stringify({ batchSize }),
      cache: "no-store",
    },
  );

  const parsed = (await response.json()) as ApiResult<{ processed: number }>;

  if (!response.ok || !parsed.success) {
    return {
      ok: false,
      error: parsed.success
        ? "Failed to pull booking sync"
        : parsed.error?.message,
    };
  }

  revalidatePath("/admin/bookings");
  return { ok: true, data: parsed.data };
}
