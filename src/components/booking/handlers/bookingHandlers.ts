/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Vehicle, BookingAddon } from "@/types";

export interface BookingFormData {
  vehicleId: string;
  startDate: string;
  endDate: string;
  pickupLocationId: string;
  dropoffLocationId: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    nationality: string;
    licenseNumber: string;
  };
  addons: string[];
  paymentMethod: "cash" | "bank_transfer";
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
  customerInfo: Record<string, string>,
  startDate: string,
  endDate: string,
  pickupLocation: string,
  dropoffLocation: string,
  selectedAddons: string[],
  paymentMethod: string,
): BookingFormData {
  return {
    vehicleId: vehicle?.id || "",
    startDate: startDate
      ? new Date(startDate).toISOString()
      : new Date().toISOString(),
    endDate: endDate
      ? new Date(endDate).toISOString()
      : new Date().toISOString(),
    pickupLocationId: pickupLocation || "",
    dropoffLocationId: dropoffLocation || "",
    customerInfo: {
      name: customerInfo?.name || "",
      email: customerInfo?.email || "",
      phone: customerInfo?.phone || "",
      nationality: customerInfo?.nationality || "",
      licenseNumber: customerInfo?.licenseNumber || "",
    },
    addons: selectedAddons || [],
    paymentMethod: (paymentMethod || "cash") as "cash" | "bank_transfer",
  };
}
