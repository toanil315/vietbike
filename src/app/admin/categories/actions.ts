"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { adminVehicleCategoryEndpoints } from "@/lib/api-endpoints";
import { getAdminAuthorizationHeader } from "@/lib/auth/require-admin-auth";
import { VehicleCategory } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

type ApiSuccess<T> = { success: true; data: T };
type ApiFailure = {
  success: false;
  error?: {
    message?: string;
  };
};

type ApiResult<T> = ApiSuccess<T> | ApiFailure;

export interface VehicleCategoryInput {
  name: string;
  description?: string;
  content?: string;
}

async function request<T>(
  endpoint: string,
  options: RequestInit,
): Promise<{ ok: boolean; data?: T; error?: string }> {
  const authorization = await getAdminAuthorizationHeader();
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  const payload = (await response.json()) as ApiResult<T>;

  if (!response.ok || !payload.success) {
    return {
      ok: false,
      error: payload.success ? "Request failed" : payload.error?.message,
    };
  }

  return { ok: true, data: payload.data };
}

function revalidateCategoryPaths() {
  revalidateTag("/admin/categories");
  revalidatePath("/admin/vehicles");
  revalidatePath("/bikes");
}

export async function createVehicleCategoryAction(input: VehicleCategoryInput) {
  const result = await request<VehicleCategory>(
    adminVehicleCategoryEndpoints.create(),
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );

  if (result.ok) {
    revalidateCategoryPaths();
  }

  return result;
}

export async function updateVehicleCategoryAction(
  categoryId: string,
  input: VehicleCategoryInput,
) {
  const result = await request<VehicleCategory>(
    adminVehicleCategoryEndpoints.update(categoryId),
    {
      method: "PATCH",
      body: JSON.stringify(input),
    },
  );

  if (result.ok) {
    revalidateCategoryPaths();
  }

  return result;
}

export async function deleteVehicleCategoryAction(categoryId: string) {
  const result = await request<{ id: string; message?: string }>(
    adminVehicleCategoryEndpoints.delete(categoryId),
    {
      method: "DELETE",
    },
  );

  if (result.ok) {
    revalidateCategoryPaths();
  }

  return result;
}
