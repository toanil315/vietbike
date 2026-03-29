/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Application-wide constants
 */

// ============================================================================
// VEHICLE CATEGORIES & TYPES
// ============================================================================

export const VEHICLE_TYPES = ["motorcycle", "scooter", "electric"] as const;

export const TRANSMISSION_TYPES = [
  "manual",
  "automatic",
  "semi-automatic",
] as const;

export const VEHICLE_STATUS = [
  "available",
  "rented",
  "maintenance",
  "unavailable",
] as const;

// Display names for vehicle types
export const VEHICLE_TYPE_LABELS: Record<
  (typeof VEHICLE_TYPES)[number],
  string
> = {
  motorcycle: "Motorbike",
  scooter: "Scooter",
  electric: "Electric Vehicle",
};

export const TRANSMISSION_LABELS: Record<
  (typeof TRANSMISSION_TYPES)[number],
  string
> = {
  manual: "Manual",
  automatic: "Automatic",
  "semi-automatic": "Semi-Automatic",
};

export const VEHICLE_STATUS_LABELS: Record<
  (typeof VEHICLE_STATUS)[number],
  string
> = {
  available: "Available",
  rented: "Rented",
  maintenance: "Maintenance",
  unavailable: "Unavailable",
};

// Fuel types
export const FUEL_TYPES = ["petrol", "diesel", "electric"] as const;

export const FUEL_TYPE_LABELS: Record<(typeof FUEL_TYPES)[number], string> = {
  petrol: "Petrol",
  diesel: "Diesel",
  electric: "Electric",
};

// ============================================================================
// BOOKING CONSTANTS
// ============================================================================

export const BOOKING_STATUS = [
  "pending",
  "confirmed",
  "active",
  "completed",
  "cancelled",
] as const;

export const BOOKING_STATUS_LABELS: Record<
  (typeof BOOKING_STATUS)[number],
  string
> = {
  pending: "Pending",
  confirmed: "Confirmed",
  active: "Active",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const PAYMENT_METHODS = ["cash", "bank_transfer"] as const;

export const PAYMENT_METHOD_LABELS: Record<
  (typeof PAYMENT_METHODS)[number],
  string
> = {
  cash: "Cash Payment",
  bank_transfer: "Bank Transfer",
};

export const PAYMENT_STATUS = ["pending", "paid", "refunded"] as const;

export const PAYMENT_STATUS_LABELS: Record<
  (typeof PAYMENT_STATUS)[number],
  string
> = {
  pending: "Pending",
  paid: "Paid",
  refunded: "Refunded",
};

// Minimum and default booking parameters
export const BOOKING_CONFIG = {
  minimumRentalDays: 1,
  defaultRentalDays: 3,
  allowedRentalDays: 365,
  cancellationDeadlineHours: 24,
} as const;

// ============================================================================
// CUSTOMER CONSTANTS
// ============================================================================

export const CUSTOMER_STATUS = ["active", "flagged", "blocked"] as const;

export const CUSTOMER_STATUS_LABELS: Record<
  (typeof CUSTOMER_STATUS)[number],
  string
> = {
  active: "Active",
  flagged: "Flagged",
  blocked: "Blocked",
};

export const NATIONALITIES = [
  "Vietnam",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "France",
  "Germany",
  "Japan",
  "China",
  "Thailand",
  "Other",
] as const;

// ============================================================================
// LOCATION CONSTANTS
// ============================================================================

export const VIETNAM_REGIONS = ["North", "Central", "South"] as const;

export const VIETNAM_CITIES = [
  "Hanoi",
  "Ha Long",
  "Da Nang",
  "Hoi An",
  "Ho Chi Minh City",
  "Da Lat",
  "Nha Trang",
  "Can Tho",
] as const;

// ============================================================================
// ADDON TYPES
// ============================================================================

export const ADDON_TYPES = [
  "insurance",
  "gps",
  "helmet",
  "lock",
  "phone_holder",
  "fuel_service",
] as const;

export const ADDON_TYPE_LABELS: Record<(typeof ADDON_TYPES)[number], string> = {
  insurance: "Insurance",
  gps: "GPS Device",
  helmet: "Extra Helmet",
  lock: "Anti-theft Lock",
  phone_holder: "Phone Holder",
  fuel_service: "Fuel Service",
};

// ============================================================================
// DATE & TIME CONSTANTS
// ============================================================================

export const DATE_FORMAT = "yyyy-MM-dd";
export const DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
export const DISPLAY_DATE_FORMAT = "MMM dd, yyyy";
export const DISPLAY_TIME_FORMAT = "HH:mm";

// ============================================================================
// PAGINATION CONSTANTS
// ============================================================================

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
export const PAGINATION_OPTIONS = [10, 20, 50, 100] as const;

// ============================================================================
// SEARCH & FILTER CONSTANTS
// ============================================================================

export const PRICE_FILTER_PRESETS = [
  { label: "Budget (< ₫500k)", max: 500000 },
  { label: "Moderate (₫500k - ₫1M)", min: 500000, max: 1000000 },
  { label: "Premium (> ₫1M)", min: 1000000 },
] as const;

export const RATING_THRESHOLDS = {
  excellent: 4.5,
  good: 4.0,
  average: 3.0,
  poor: 2.0,
} as const;

// ============================================================================
// APP CONFIGURATION
// ============================================================================

export const APP_CONFIG = {
  appName: "VietBike",
  appVersion: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001",
  apiTimeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "30000"),
  debug: process.env.NEXT_PUBLIC_ENABLE_DEBUG === "true",
} as const;

// ============================================================================
// VALIDATION RULES
// ============================================================================

export const VALIDATION_RULES = {
  name: {
    minLength: 2,
    maxLength: 255,
  },
  email: {
    minLength: 5,
    maxLength: 255,
  },
  password: {
    minLength: 8,
    maxLength: 255,
  },
  phone: {
    minLength: 10,
    maxLength: 20,
  },
  licenseNumber: {
    minLength: 5,
    maxLength: 50,
  },
  voucherCode: {
    minLength: 3,
    maxLength: 50,
  },
  slug: {
    minLength: 2,
    maxLength: 255,
    pattern: /^[a-z0-9-]+$/,
  },
} as const;

// ============================================================================
// ERROR CODES
// ============================================================================

export const ERROR_CODES = {
  // Network
  NETWORK_ERROR: "NETWORK_ERROR",
  REQUEST_TIMEOUT: "REQUEST_TIMEOUT",

  // Vehicle
  VEHICLE_NOT_FOUND: "VEHICLE_NOT_FOUND",
  VEHICLE_UNAVAILABLE: "VEHICLE_UNAVAILABLE",
  VEHICLE_ALREADY_BOOKED: "VEHICLE_ALREADY_BOOKED",

  // Booking
  BOOKING_NOT_FOUND: "BOOKING_NOT_FOUND",
  BOOKING_INVALID_DATES: "BOOKING_INVALID_DATES",
  BOOKING_DATES_IN_PAST: "BOOKING_DATES_IN_PAST",

  // Voucher
  VOUCHER_NOT_FOUND: "VOUCHER_NOT_FOUND",
  VOUCHER_INVALID: "VOUCHER_INVALID",
  VOUCHER_EXPIRED: "VOUCHER_EXPIRED",

  // Validation
  VALIDATION_ERROR: "VALIDATION_ERROR",

  // Server
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
} as const;
