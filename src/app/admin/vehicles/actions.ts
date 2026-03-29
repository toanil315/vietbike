"use server";

import { revalidatePath } from "next/cache";
import { adminVehicleEndpoints } from "@/lib/api-endpoints";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

type ApiSuccess<T> = { success: true; data: T };
type ApiFailure = {
  success: false;
  error?: {
    message?: string;
    details?: unknown;
  };
};

type ApiResult<T> = ApiSuccess<T> | ApiFailure;

async function request<T>(
  endpoint: string,
  options: RequestInit,
): Promise<{ ok: boolean; data?: T; error?: string }> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
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

export interface VehicleFormInput {
  name: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  pricePerDay: number;
  description?: string;
  availableSeats: number;
  fuelType: string;
  transmission: "manual" | "automatic";
  type: "motorcycle" | "scooter" | "electric";
  categoryId: string;
  images?: Array<{ url: string; altText?: string }>;
  features?: Array<{ featureName: string; featureValue: string }>;
}

export async function createVehicleAction(input: VehicleFormInput) {
  const result = await request<{ id: string; name: string; slug: string }>(
    adminVehicleEndpoints.create(),
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );

  if (result.ok) {
    revalidatePath("/admin/vehicles");
  }

  return result;
}

export async function updateVehicleAction(
  vehicleId: string,
  input: Omit<
    VehicleFormInput,
    "type" | "images" | "features" | "categoryId"
  > & {
    categoryId?: string;
  },
) {
  const result = await request<{ id: string; name: string; slug: string }>(
    adminVehicleEndpoints.update(vehicleId),
    {
      method: "PATCH",
      body: JSON.stringify(input),
    },
  );

  if (result.ok) {
    revalidatePath("/admin/vehicles");
    revalidatePath(`/admin/vehicles/${vehicleId}`);
  }

  return result;
}

export async function updateVehicleStatusAction(
  vehicleId: string,
  status: "available" | "rented" | "maintenance" | "unavailable",
) {
  const result = await request<{ id: string; status: string }>(
    adminVehicleEndpoints.updateStatus(vehicleId),
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    },
  );

  if (result.ok) {
    revalidatePath("/admin/vehicles");
    revalidatePath(`/admin/vehicles/${vehicleId}`);
  }

  return result;
}

export async function addVehicleImageAction(
  vehicleId: string,
  input: { url: string; altText?: string },
) {
  const result = await request<{ id: string }>(
    adminVehicleEndpoints.addImages(vehicleId),
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );

  if (result.ok) {
    revalidatePath("/admin/vehicles");
    revalidatePath(`/admin/vehicles/${vehicleId}`);
  }

  return result;
}

export async function deleteVehicleImageAction(
  vehicleId: string,
  imageId: string,
) {
  const result = await request<{ message: string }>(
    adminVehicleEndpoints.deleteImage(vehicleId, imageId),
    {
      method: "DELETE",
    },
  );

  if (result.ok) {
    revalidatePath("/admin/vehicles");
    revalidatePath(`/admin/vehicles/${vehicleId}`);
  }

  return result;
}

export async function reorderVehicleImagesAction(
  vehicleId: string,
  reorderedImages: Array<{ id: string; displayOrder: number }>,
) {
  const result = await request<{ message: string }>(
    adminVehicleEndpoints.reorderImages(vehicleId),
    {
      method: "PATCH",
      body: JSON.stringify({ reorderedImages }),
    },
  );

  if (result.ok) {
    revalidatePath("/admin/vehicles");
    revalidatePath(`/admin/vehicles/${vehicleId}`);
  }

  return result;
}

export async function addVehicleFeatureAction(
  vehicleId: string,
  input: { featureName: string; featureValue: string },
) {
  const result = await request<{ id: string }>(
    adminVehicleEndpoints.addFeature(vehicleId),
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );

  if (result.ok) {
    revalidatePath("/admin/vehicles");
    revalidatePath(`/admin/vehicles/${vehicleId}`);
  }

  return result;
}

export async function deleteVehicleFeatureAction(
  vehicleId: string,
  featureId: string,
) {
  const result = await request<{ message: string }>(
    adminVehicleEndpoints.deleteFeature(vehicleId, featureId),
    {
      method: "DELETE",
    },
  );

  if (result.ok) {
    revalidatePath("/admin/vehicles");
    revalidatePath(`/admin/vehicles/${vehicleId}`);
  }

  return result;
}
