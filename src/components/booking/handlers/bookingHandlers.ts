/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Vehicle } from "@/types";

export interface BookingFormData {
  vehicleId: string;
  pickupDate: string;
  dropoffDate: string;
  pickupLocationId: string;
  dropoffLocationId: string;
  addons: Array<{ addonId: string; quantity: number }>;
  paymentMethod: "cash" | "card" | "bank_transfer" | "wallet";
}

/**
 * Calculate total days between two dates
 */
export function calculateRentalDays(
  startDate: string,
  endDate: string,
): number {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
}

/**
 * Calculate total booking cost
 */
export function calculateBookingTotal(
  vehicle: Vehicle,
  startDate: string,
  endDate: string,
  selectedAddons: string[],
  addons: any[],
): number {
  const days = calculateRentalDays(startDate, endDate);
  if (days <= 0) return 0;

  let total = vehicle.pricePerDay * days;
  selectedAddons.forEach((id) => {
    const addon = addons.find((a) => a.id === id);
    if (addon) total += addon.price * days;
  });
  return total;
}

/**
 * Prepare booking data for API submission
 */
export function prepareBookingData(
  vehicle: Vehicle,
  _customerInfo: Record<string, string>,
  startDate: string,
  endDate: string,
  pickupLocation: string,
  dropoffLocation: string,
  selectedAddons: string[],
  paymentMethod: string,
): BookingFormData {
  return {
    vehicleId: vehicle?.id || "",
    pickupDate: startDate
      ? new Date(startDate).toISOString()
      : new Date().toISOString(),
    dropoffDate: endDate
      ? new Date(endDate).toISOString()
      : new Date().toISOString(),
    pickupLocationId: pickupLocation || "",
    dropoffLocationId: dropoffLocation || "",
    addons: (selectedAddons || []).map((addonId) => ({
      addonId,
      quantity: 1,
    })),
    paymentMethod: (paymentMethod || "cash") as
      | "cash"
      | "card"
      | "bank_transfer"
      | "wallet",
  };
}
