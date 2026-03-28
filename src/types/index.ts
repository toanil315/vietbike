/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type VehicleStatus =
  | "available"
  | "rented"
  | "maintenance"
  | "unavailable";
export type VehicleTransmission = "manual" | "automatic";
export type VehicleCategory = "economy" | "comfort" | "premium";
export type VehicleType = "motorcycle" | "scooter" | "electric";

export interface ApiSuccess<T> {
  success: true;
  data: T | null;
  message?: string;
}

export interface ApiFailure {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface VehicleImage {
  id: string;
  url: string;
  altText?: string;
  displayOrder: number;
}

export interface VehicleFeature {
  id?: string;
  featureName: string;
  featureValue: string;
}

export interface VehicleCategory_v2 {
  id: string;
  name: string;
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  /** @deprecated Use categoryId/categoryName instead */
  type?: VehicleType;
  /** @deprecated Use categoryId/categoryName instead */
  category?: VehicleCategory;
  categoryId: string;
  categoryName: string;
  categoryDescription: string | null;
  licensePlate: string;
  pricePerDay: number;
  description: string | null;
  availableSeats: number;
  fuelType: string;
  transmission: VehicleTransmission;
  status: VehicleStatus;
  images: VehicleImage[];
  features: VehicleFeature[];
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "active"
  | "completed"
  | "cancelled";

export interface BookingAddon {
  id: string;
  addonName: string;
  quantity: number;
  pricePerUnit: number;
}

export interface Booking {
  id: string;
  reference: string;
  vehicleId?: string;
  licensePlate?: string;
  pickupDate: string;
  dropoffDate: string;
  status: BookingStatus;
  totalAmount: string | number;
  depositAmount?: string | number;
  rentalDays?: number;
  sourceApp?: string;
  note?: string;
  extensionInfo?: string;
  documents?: BookingDocument[];
  customerInfo: {
    fullName: string;
    email?: string;
    phone: string;
    nationality?: string;
    licenseNumber?: string;
  };
  customerSnapshot?: {
    fullName?: string;
    email?: string;
    phone?: string;
    nationality?: string;
    licenseNumber?: string;
  };
  voucherCode?: string;
  voucherDiscount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface BookingDocument {
  name: string;
  url?: string;
  mimeType?: string;
  sizeBytes?: number;
}

export interface BookingListQuery {
  page?: number;
  pageSize?: number;
  status?: string;
  licensePlate?: string;
  customerName?: string;
  customerPhone?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface BookingListResponse {
  data: Booking[];
  pagination: Pagination;
}

export interface CreateBookingPayload {
  customerName: string;
  customerPhone: string;
  sourceApp?: string;
  licensePlate: string;
  startDate: string;
  rentalDays: number;
  totalAmount: string;
  depositAmount?: string;
  note?: string;
  extensionInfo?: string;
  documents?: BookingDocument[];
}

export interface UpdateBookingPayload {
  licensePlate?: string;
  pickupDate?: string;
  dropoffDate?: string;
  totalAmount?: string;
  depositAmount?: string;
  customerSnapshot?: {
    fullName?: string;
    email?: string;
    phone?: string;
    nationality?: string;
    licenseNumber?: string;
  };
  sourceApp?: string;
  extensionInfo?: string;
  note?: string;
  documents?: BookingDocument[];
  currency?: string;
}

export interface SyncSpreadsheetItem {
  id: string;
  name: string;
  modifiedTime?: string;
}

export interface SyncSpreadsheetListResponse {
  data: SyncSpreadsheetItem[];
  pagination: Pagination;
}

export interface SyncTarget {
  id: string;
  spreadsheetId: string;
  sheetName: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SetSyncTargetPayload {
  spreadsheetId: string;
  sheetName?: string;
}

export interface PullBookingSyncPayload {
  batchSize?: number;
}

export interface PullBookingSyncResult {
  spreadsheetId: string;
  sheetName: string;
  processed: number;
  updated: number;
  skipped: number;
  conflicts: number;
  failed: number;
  conflictReasons: string[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  licenseNumber: string;
  passportNumber?: string;
  licenseImage?: string;
  avatar?: string;
  totalBookings: number;
  status: "active" | "flagged" | "blocked";
}

export interface Voucher {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minBookingValue: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usageCount: number;
  status: "active" | "expired" | "disabled";
}

export interface MaintenanceLog {
  id: string;
  vehicleId: string;
  date: string;
  type: "routine" | "repair" | "inspection";
  description: string;
  cost: number;
  technician: string;
}

export interface FinanceRecord {
  id: string;
  date: string;
  type: "revenue" | "expense";
  category: string;
  amount: number;
  description: string;
  referenceId?: string;
}
