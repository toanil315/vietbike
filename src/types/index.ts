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

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  type: VehicleType;
  category: VehicleCategory;
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
  vehicleId: string;
  customerId: string;
  pickupLocationId: string;
  dropoffLocationId: string;
  pickupDate: string;
  dropoffDate: string;
  status: BookingStatus;
  totalAmount: number;
  addons: BookingAddon[];
  paymentMethod: string;
  voucherCode?: string;
  voucherDiscount: number;
  createdAt: string;
  updatedAt: string;
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
