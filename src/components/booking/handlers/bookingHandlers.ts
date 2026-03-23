/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Vehicle } from "@/types";

export interface BookingFormData {
  customerName: string;
  customerPhone: string;
  sourceApp: string;
  licensePlate: string;
  startDate: string;
  rentalDays: number;
  totalAmount: number;
  depositAmount: number;
  note?: string;
  documents?: Array<{
    name: string;
    url?: string;
    mimeType?: string;
    sizeBytes?: number;
  }>;
  voucherCode?: string;
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
): number {
  const days = calculateRentalDays(startDate, endDate);
  if (days <= 0) return 0;

  return vehicle.pricePerDay * days;
}

/**
 * Prepare booking data for API submission
 */
export function prepareBookingData(
  vehicle: Vehicle,
  customerInfo: Record<string, string>,
  startDate: string,
  endDate: string,
  sourceApp: string,
  customerNote?: string,
): BookingFormData {
  const rentalDays = calculateRentalDays(startDate, endDate) || 1;
  const totalAmount = calculateBookingTotal(vehicle, startDate, endDate);

  const noteParts = [
    customerInfo.email ? `Email: ${customerInfo.email}` : "",
    customerInfo.nationality ? `Nationality: ${customerInfo.nationality}` : "",
    customerInfo.licenseNumber ? `License: ${customerInfo.licenseNumber}` : "",
    customerNote ? `Note: ${customerNote}` : "",
  ].filter(Boolean);

  return {
    customerName: customerInfo.name || "",
    customerPhone: customerInfo.phone || "",
    sourceApp: sourceApp || "web",
    licensePlate: vehicle?.licensePlate || "",
    startDate: startDate
      ? new Date(startDate).toISOString()
      : new Date().toISOString(),
    rentalDays,
    totalAmount,
    depositAmount: 0,
    note: noteParts.length > 0 ? noteParts.join(" | ") : undefined,
  };
}
