/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApiError } from "./api";

/**
 * Application-level error type with user-friendly messages
 */
export interface AppError {
  code: string;
  message: string;
  userMessage: string;
  statusCode: number;
  details?: Record<string, any>;
  timestamp: Date;
}

/**
 * Error code to user-friendly message mapping
 */
const ERROR_MESSAGES: Record<string, string> = {
  // Network errors
  NETWORK_ERROR:
    "Network error. Please check your internet connection and try again.",
  REQUEST_TIMEOUT:
    "The request took too long. Please check your connection and try again.",

  // Vehicle errors
  VEHICLE_NOT_FOUND: "The bike you are looking for is no longer available.",
  VEHICLE_UNAVAILABLE:
    "Sorry, this bike is not available for the selected dates.",
  VEHICLE_ALREADY_BOOKED: "This bike is already booked for the selected dates.",

  // Booking errors
  BOOKING_NOT_FOUND: "The booking you are looking for does not exist.",
  BOOKING_INVALID_DATES:
    "Invalid rental dates. End date must be after start date.",
  BOOKING_DATES_IN_PAST: "Rental dates must be in the future.",
  BOOKING_ALREADY_CANCELLED: "This booking has already been cancelled.",
  BOOKING_MINIMUM_PRICE: "Booking amount is below the minimum required amount.",

  // Customer errors
  CUSTOMER_NOT_FOUND: "Customer information not found.",
  CUSTOMER_INVALID_LICENSE: "License information is invalid or expired.",
  CUSTOMER_BLOCKED: "Your account has been blocked. Please contact support.",

  // Voucher errors
  VOUCHER_NOT_FOUND: "The voucher code you entered is not found.",
  VOUCHER_INVALID: "This voucher code is no longer valid.",
  VOUCHER_EXPIRED: "This voucher code has expired.",
  VOUCHER_LIMIT_EXCEEDED: "This voucher code has reached its usage limit.",
  VOUCHER_MINIMUM_NOT_MET:
    "Your booking amount does not meet the minimum for this voucher.",

  // Location errors
  LOCATION_NOT_FOUND: "The selected location is not available.",

  // Addon errors
  ADDON_NOT_FOUND: "The selected addon is not available.",
  ADDON_UNAVAILABLE: "The selected addon is no longer available.",

  // Validation errors
  VALIDATION_ERROR: "Please check your input and try again.",
  INVALID_EMAIL: "Please enter a valid email address.",
  INVALID_PHONE: "Please enter a valid phone number.",
  INVALID_LICENSE: "Please enter a valid license number.",

  // Payment errors
  PAYMENT_FAILED:
    "Payment processing failed. Please try again or use a different payment method.",
  PAYMENT_CANCELLED:
    "Payment was cancelled. Your booking has not been created.",
  PAYMENT_INVALID_METHOD: "The selected payment method is not available.",

  // Server errors
  INTERNAL_SERVER_ERROR:
    "An error occurred on our server. Please try again later.",
  SERVICE_UNAVAILABLE:
    "Our service is temporarily unavailable. Please try again later.",

  // Default
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
  API_ERROR: "An error occurred. Please try again.",
};

/**
 * Convert API error to application error with user-friendly message
 */
export function handleApiError(err: any): AppError {
  // If already an API error
  if (isApiError(err)) {
    return {
      code: err.code,
      message: err.message,
      userMessage: ERROR_MESSAGES[err.code] || ERROR_MESSAGES["API_ERROR"],
      statusCode: err.status,
      details: err.details,
      timestamp: new Date(),
    };
  }

  // If it's our custom error structure
  if (isCustomError(err)) {
    return {
      code: err.code || "UNKNOWN_ERROR",
      message: err.message || "An unexpected error occurred",
      userMessage:
        ERROR_MESSAGES[err.code || "UNKNOWN_ERROR"] ||
        ERROR_MESSAGES["UNKNOWN_ERROR"],
      statusCode: err.statusCode || 500,
      details: err.details,
      timestamp: new Date(),
    };
  }

  // Fallback for unknown error types
  return {
    code: "UNKNOWN_ERROR",
    message:
      err instanceof Error ? err.message : "An unexpected error occurred",
    userMessage: ERROR_MESSAGES["UNKNOWN_ERROR"],
    statusCode: 500,
    details: err,
    timestamp: new Date(),
  };
}

/**
 * Type guard for API errors
 */
function isApiError(err: any): err is ApiError {
  return (
    err &&
    typeof err === "object" &&
    "status" in err &&
    "code" in err &&
    "message" in err
  );
}

/**
 * Type guard for custom errors
 */
function isCustomError(err: any): err is {
  code?: string;
  message?: string;
  statusCode?: number;
  details?: Record<string, any>;
} {
  return (
    err &&
    typeof err === "object" &&
    ("code" in err || "message" in err || "statusCode" in err)
  );
}

/**
 * Log error for debugging (in development only)
 */
export function logError(err: AppError | ApiError | Error, context?: string) {
  if (process.env.NEXT_PUBLIC_ENABLE_DEBUG === "true") {
    const prefix = context ? `[${context}]` : "[Error]";
    console.error(`${prefix}`, err);
  }
}

/**
 * Determine if error is retryable
 */
export function isRetryableError(err: AppError): boolean {
  const retryableStatuses = [408, 429, 500, 502, 503, 504];
  return retryableStatuses.includes(err.statusCode);
}

/**
 * Get retry delay in milliseconds (exponential backoff)
 */
export function getRetryDelay(attempt: number): number {
  // 1st retry: 1s, 2nd: 2s, 3rd: 4s, etc.
  return Math.min(1000 * Math.pow(2, attempt - 1), 10000);
}

/**
 * Formats error for display in toast/notifications
 */
export function formatErrorForDisplay(err: AppError): {
  title: string;
  message: string;
} {
  return {
    title: "Error",
    message: err.userMessage || err.message,
  };
}

/**
 * Checks if error is a validation error (contains field-level errors)
 */
export function isValidationError(err: AppError): boolean {
  return Boolean(
    err.code === "VALIDATION_ERROR" &&
    err.details &&
    typeof err.details === "object",
  );
}

/**
 * Get validation errors as field error map
 */
export function getValidationErrors(err: AppError): Record<string, string> {
  if (isValidationError(err)) {
    return err.details as Record<string, string>;
  }
  return {};
}
