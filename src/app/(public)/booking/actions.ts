"use server";

import { bookingEndpoints } from "@/lib/api-endpoints";

export interface CreateBookingActionInput {
  vehicleId: string;
  pickupLocationId: string;
  dropoffLocationId: string;
  pickupDate: string;
  dropoffDate: string;
  paymentMethod: "cash" | "card" | "bank_transfer" | "wallet";
  addons: Array<{ addonId: string; quantity: number }>;
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
  const customerId = process.env.BOOKING_CUSTOMER_ID;
  if (!customerId) {
    return {
      success: false,
      error:
        "Server config missing BOOKING_CUSTOMER_ID. Set this env var to an existing customer UUID before creating bookings.",
    };
  }

  const response = await fetch(`${API_BASE_URL}${bookingEndpoints.create()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...input,
      customerId,
    }),
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
