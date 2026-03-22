/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Currency formatting utilities
 */

/**
 * Format number as Vietnamese Dong currency
 * @param value - Amount in VND
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export function formatVND(
  value: number,
  options?: {
    showSymbol?: boolean;
    showCode?: boolean;
    minimumFractionDigits?: number;
  },
): string {
  const {
    showSymbol = true,
    showCode = false,
    minimumFractionDigits = 0,
  } = options || {};

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits,
    maximumFractionDigits: 0,
  });

  let formatted = formatter.format(value);

  // Remove the ₫ symbol and format manually
  formatted = formatted.replace(/₫/g, "").trim();
  formatted = formatted.replace(/\./g, ",");

  if (showCode) {
    return `${formatted} VND`;
  }

  if (showSymbol) {
    return `₫${formatted}`;
  }

  return formatted;
}

/**
 * Format number as currency (generic)
 * @param value - Amount
 * @param currency - Currency code (default: VND)
 * @returns Formatted currency string
 */
export function formatCurrency(
  value: number,
  currency: string = "VND",
): string {
  if (currency === "VND") {
    return formatVND(value);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value);
}

/**
 * Parse currency string to number
 * @param currencyString - Currency string (e.g., "₫1,234,567")
 * @returns Parsed number
 */
export function parseCurrency(currencyString: string): number {
  // Remove currency symbols and commas
  const cleaned = currencyString.replace(/₫/g, "").replace(/[,\s]/g, "").trim();
  return parseFloat(cleaned) || 0;
}

/**
 * Calculate discount amount based on discount type
 * @param originalPrice - Original price
 * @param discountType - Type of discount (fixed or percentage)
 * @param discountValue - Discount value
 * @returns Discount amount
 */
export function calculateDiscount(
  originalPrice: number,
  discountType: "fixed" | "percentage",
  discountValue: number,
): number {
  if (discountType === "fixed") {
    return Math.min(discountValue, originalPrice);
  }

  if (discountType === "percentage") {
    return (originalPrice * discountValue) / 100;
  }

  return 0;
}

/**
 * Calculate final price after discount
 * @param originalPrice - Original price
 * @param discountType - Type of discount
 * @param discountValue - Discount value
 * @returns Final price
 */
export function calculateFinalPrice(
  originalPrice: number,
  discountType?: "fixed" | "percentage",
  discountValue?: number,
): number {
  if (!discountType || !discountValue) {
    return originalPrice;
  }

  const discount = calculateDiscount(
    originalPrice,
    discountType,
    discountValue,
  );
  return Math.max(0, originalPrice - discount);
}

/**
 * Format price range (e.g., "₫500,000 - ₫1,000,000")
 */
export function formatPriceRange(minPrice: number, maxPrice: number): string {
  return `${formatVND(minPrice)} - ${formatVND(maxPrice)}`;
}

/**
 * Check if price is within range
 */
export function isPriceInRange(
  price: number,
  minPrice?: number,
  maxPrice?: number,
): boolean {
  if (minPrice && price < minPrice) return false;
  if (maxPrice && price > maxPrice) return false;
  return true;
}
