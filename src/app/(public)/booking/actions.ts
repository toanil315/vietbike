"use server";

import { bookingEndpoints } from "@/lib/api-endpoints";

export interface CreateBookingActionInput {
  customerName: string;
  customerPhone: string;
  sourceApp: string;
  licensePlate: string;
  startDate: string;
  rentalDays: number;
  totalAmount: number;
  depositAmount: number;
  extensionInfo?: string;
  note?: string;
  documents?: Array<{
    name: string;
    url?: string;
    mimeType?: string;
    sizeBytes?: number;
  }>;
  voucherCode?: string;
}

export interface CreateBookingActionResult {
  success: boolean;
  data?: {
    bookingId: string;
    reference: string;
  };
  error?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export async function createBookingAction(
  input: CreateBookingActionInput,
): Promise<CreateBookingActionResult> {
  const response = await fetch(`${API_BASE_URL}${bookingEndpoints.create()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
    cache: "no-store",
  });

  console.log("Create Booking Response:", JSON.stringify(input));

  const payload = (await response.json()) as
    | {
        success: true;
        data: { bookingId: string; reference: string };
      }
    | {
        success: false;
        error?: { message?: string };
      };

  if (!response.ok || !payload.success) {
    return {
      success: false,
      error: payload.success
        ? "Failed to create booking"
        : payload.error?.message || "Failed to create booking",
    };
  }

  return {
    success: true,
    data: payload.data,
  };
}
