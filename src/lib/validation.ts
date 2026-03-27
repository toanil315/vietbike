/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { z } from "zod";

/**
 * Validation schemas for forms and API requests
 * Used for both client-side validation and type inference
 */

// ============================================================================
// COMMON SCHEMAS
// ============================================================================

export const dateSchema = z.date().refine((date) => date > new Date(), {
  message: "Date must be in the future",
});

export const priceSchema = z
  .number()
  .positive("Price must be positive")
  .finite("Price must be a valid number");

export const phoneSchema = z
  .string()
  .regex(/^(\+\d{1,3}[- ]?)?\d{1,14}$/, "Please enter a valid phone number");

export const emailSchema = z
  .string()
  .email("Please enter a valid email address");

// ============================================================================
// VEHICLE SCHEMAS
// ============================================================================

export const vehicleFilterSchema = z.object({
  search: z.string().trim().optional(),
  type: z.enum(["motorcycle", "scooter", "electric"]).optional(),
  category: z.enum(["economy", "comfort", "premium"]).optional(),
  transmission: z.enum(["manual", "automatic", "semi-automatic"]).optional(),
  priceMin: z.number().positive("Minimum price must be positive").optional(),
  priceMax: z.number().positive("Maximum price must be positive").optional(),
  sortBy: z
    .enum(["price_asc", "price_desc", "rating", "newest"])
    .optional()
    .default("newest"),
  page: z.number().positive("Page must be positive").optional().default(1),
  limit: z
    .number()
    .positive("Limit must be positive")
    .max(100)
    .optional()
    .default(20),
});

export type VehicleFilterInput = z.infer<typeof vehicleFilterSchema>;

// ============================================================================
// BOOKING SCHEMAS
// ============================================================================

export const rentalDateSchema = z
  .object({
    startDate: dateSchema,
    endDate: dateSchema,
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export const locationSchema = z.object({
  pickupLocationId: z.string().uuid("Invalid pickup location"),
  dropoffLocationId: z.string().uuid("Invalid dropoff location"),
});

export const customerInfoSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(255, "Name must be less than 255 characters"),
  email: emailSchema,
  phone: phoneSchema,
  nationality: z.string().min(2, "Nationality must be valid"),
  licenseNumber: z
    .string()
    .min(5, "License number must be at least 5 characters")
    .max(50, "License number must be less than 50 characters"),
  licenseExpiry: z
    .date()
    .refine((date) => date > new Date(), {
      message: "License must not be expired",
    })
    .optional(),
});

export type CustomerInfoInput = z.infer<typeof customerInfoSchema>;

export const addonSelectionSchema = z.object({
  addonIds: z.array(z.string().uuid()).optional().default([]),
});

export const paymentMethodSchema = z.object({
  method: z.enum(["cash", "bank_transfer", "credit_card"]).refine(
    (method) => {
      // Currently only cash and bank_transfer are available
      return ["cash", "bank_transfer"].includes(method);
    },
    {
      message: "Payment method not available",
    },
  ),
});

export const voucherCodeSchema = z.object({
  code: z
    .string()
    .trim()
    .min(3, "Voucher code must be at least 3 characters")
    .max(50, "Voucher code must be less than 50 characters")
    .optional(),
});

export const bookingRequestSchema = z
  .object({
    vehicleId: z.string().uuid("Invalid vehicle ID"),
    startDate: dateSchema,
    endDate: dateSchema,
    pickupLocationId: z.string().uuid("Invalid pickup location"),
    dropoffLocationId: z.string().uuid("Invalid dropoff location"),
    customerInfo: customerInfoSchema,
    addons: z.array(z.string().uuid()).optional().default([]),
    voucherCode: z.string().trim().optional(),
    paymentMethod: z.enum(["cash", "bank_transfer"]).default("cash"),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;

// ============================================================================
// CUSTOMER SCHEMAS
// ============================================================================

export const customerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(255),
  email: emailSchema,
  phone: phoneSchema,
  nationality: z.string().min(2),
  licenseNumber: z.string().min(5).max(50),
  licenseExpiry: z.date().optional(),
  passportNumber: z.string().min(5).max(50).optional(),
});

export type CustomerInput = z.infer<typeof customerSchema>;

// ============================================================================
// ADMIN SCHEMAS
// ============================================================================

export const adminLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

export const vehicleCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(255),
  slug: z
    .string()
    .min(2)
    .max(255)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers, and hyphens",
    ),
  brand: z.string().min(2).max(100),
  model: z.string().min(2).max(100),
  year: z.number().int().min(2000).max(new Date().getFullYear()),
  type: z.enum(["motorcycle", "scooter", "electric"]),
  category: z.enum(["economy", "comfort", "premium"]),
  transmission: z.enum(["manual", "automatic", "semi-automatic"]),
  basePrice: priceSchema,
  locationId: z.string().uuid("Invalid location"),
  description: z.string().max(2000).optional(),
  fuelType: z.enum(["petrol", "diesel", "electric"]).optional(),
  engineDisplacement: z.number().positive().optional(),
});

export type VehicleCreateInput = z.infer<typeof vehicleCreateSchema>;

export const bookingDocumentSchema = z.object({
  name: z.string().trim().min(1).max(255),
  url: z.string().trim().url(),
  mimeType: z.string().max(100).optional(),
  sizeBytes: z.number().int().min(0).optional(),
});

export const adminCreateBookingSchema = z.object({
  customerName: z.string().trim().min(2).max(255),
  customerPhone: z.string().trim().min(6).max(50),
  sourceApp: z.string().trim().min(1).max(100).optional(),
  licensePlate: z.string().trim().min(3).max(30),
  startDate: z.string().datetime({ offset: true }),
  rentalDays: z.number().int().min(1).max(365),
  totalAmount: z.string().trim().min(1).max(100),
  depositAmount: z.string().trim().min(1).max(100).optional(),
  extensionInfo: z.string().max(2000).optional(),
  note: z.string().max(5000).optional(),
  documents: z.array(bookingDocumentSchema).optional().default([]),
});

export type AdminCreateBookingInput = z.infer<typeof adminCreateBookingSchema>;

export const adminUpdateBookingSchema = z.object({
  licensePlate: z.string().trim().min(3).max(30).optional(),
  pickupDate: z.string().datetime({ offset: true }).optional(),
  dropoffDate: z.string().datetime({ offset: true }).optional(),
  totalAmount: z.string().trim().min(1).max(100).optional(),
  depositAmount: z.string().trim().min(1).max(100).optional(),
  customerSnapshot: z
    .object({
      fullName: z.string().trim().min(1).max(255).optional(),
      email: z.string().trim().email().max(255).optional(),
      phone: z.string().trim().min(6).max(50).optional(),
      nationality: z.string().trim().max(100).optional(),
      licenseNumber: z.string().trim().max(100).optional(),
    })
    .optional(),
  sourceApp: z.string().trim().min(1).max(100).optional(),
  extensionInfo: z.string().max(2000).optional(),
  note: z.string().max(5000).optional(),
  documents: z.array(bookingDocumentSchema).optional(),
  currency: z.string().trim().min(1).max(10).optional(),
});

export type AdminUpdateBookingInput = z.infer<typeof adminUpdateBookingSchema>;

export const bookingSyncTargetSchema = z.object({
  spreadsheetId: z.string().trim().min(1).max(255),
  sheetName: z.string().trim().min(1).max(255).optional().default("Sheet1"),
});

export type BookingSyncTargetInput = z.infer<typeof bookingSyncTargetSchema>;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Safely parse and validate data against a schema
 */
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
):
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> } {
  try {
    const parsed = schema.parse(data);
    return { success: true, data: parsed };
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      err.issues.forEach((issue) => {
        const path = issue.path.join(".");
        errors[path] = issue.message;
      });
      return { success: false, errors };
    }
    return {
      success: false,
      errors: { general: "An error occurred while validating data" },
    };
  }
}

/**
 * Utility to create validation error messages from Zod errors
 */
export function formatValidationErrors(
  err: z.ZodError,
): Record<string, string> {
  const errors: Record<string, string> = {};
  err.issues.forEach((issue) => {
    const path = issue.path.join(".");
    errors[path] = issue.message;
  });
  return errors;
}
