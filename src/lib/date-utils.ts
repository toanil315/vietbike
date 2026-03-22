/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Date utility functions for booking calculations
 */

/**
 * Calculate number of days between two dates
 */
export function calculateDays(startDate: Date, endDate: Date): number {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return Math.ceil(
    (endDate.getTime() - startDate.getTime()) / millisecondsPerDay,
  );
}

/**
 * Calculate rental total price
 */
export function calculateRentalPrice(
  dailyRate: number,
  startDate: Date,
  endDate: Date,
  addonsTotal: number = 0,
  discountAmount: number = 0,
): number {
  const days = calculateDays(startDate, endDate);
  const basePrice = dailyRate * days;
  const total = Math.max(0, basePrice + addonsTotal - discountAmount);
  return Math.round(total * 100) / 100;
}

/**
 * Format date to YYYY-MM-DD string
 */
export function formatDateToString(date: Date | string): string {
  if (typeof date === "string") return date;
  return date.toISOString().split("T")[0];
}

/**
 * Parse date string to Date object
 */
export function parseDateString(dateString: string): Date {
  return new Date(`${dateString}T00:00:00`);
}

/**
 * Check if a date is in the past
 */
export function isDateInPast(date: Date): boolean {
  return date < new Date();
}

/**
 * Get minimum rental date (today or tomorrow based on config)
 */
export function getMinimumRentalDate(): Date {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}

/**
 * Get default end date (3 days from start date)
 */
export function getDefaultEndDate(startDate: Date): Date {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 3);
  return endDate;
}

/**
 * Format date for display (e.g., "Jan 15, 2026")
 */
export function formatDateForDisplay(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return d.toLocaleDateString("en-US", options);
}

/**
 * Format date range for display (e.g., "Jan 15 - 18, 2026")
 */
export function formatDateRangeForDisplay(
  startDate: Date | string,
  endDate: Date | string,
): string {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return `${start.toLocaleDateString("en-US", options)} - ${end.toLocaleDateString("en-US", options)}`;
}

/**
 * Get number of days for display
 */
export function formatDaysForDisplay(days: number): string {
  if (days === 1) return "1 day";
  return `${days} days`;
}

/**
 * Check if rental dates are valid
 */
export function isValidRentalPeriod(startDate: Date, endDate: Date): boolean {
  return endDate > startDate;
}
