/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type VehicleStatus =
  | "available"
  | "rented"
  | "maintenance"
  | "unavailable";
export type VehicleTransmission =
  | "manual"
  | "automatic"
  | "semi-automatic"
  | "electric";
export type VehicleCategory =
  | "scooter"
  | "sport"
  | "touring"
  | "off-road"
  | "classic";

// Backward compatibility alias
export type VehicleType = VehicleTransmission;

export interface VehicleImage {
  id: string;
  url: string;
  altText?: string;
  displayOrder: number;
}

export interface VehicleFeature {
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
  pricePerDay: number;
  description: string;
  status: VehicleStatus;

  // Transmission and fuel info
  transmission: VehicleTransmission;
  fuelType: string;

  // Seat and license info
  availableSeats: number;
  licensePlate: string;

  // Media
  images: VehicleImage[];

  // Features and specs
  features: VehicleFeature[];

  // Timestamps
  createdAt: string;
  updatedAt: string;

  // Optional fields for UI
  image?: string; // Primary image (first from images array)
  type?: VehicleTransmission; // Alias for transmission
  category?: VehicleCategory;
  engineSize?: string;
  specs?: {
    fuelCapacity?: string;
    weight?: string;
    seatHeight?: string;
    topSpeed?: string;
  };
  rating?: number;
  reviewCount?: number;
  location?: string;
  weeklyRate?: number;
  monthlyRate?: number;
  relatedVehicles?: Vehicle[];
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "active"
  | "completed"
  | "cancelled";

export interface BookingAddon {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface Booking {
  id: string;
  referenceNumber: string;
  vehicleId: string;
  customerId: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  status: BookingStatus;
  totalPrice: number;
  addons: string[];
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "refunded";
  createdAt: string;
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
