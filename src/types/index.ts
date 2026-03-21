/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type VehicleStatus = 'available' | 'rented' | 'maintenance' | 'unavailable';
export type VehicleType = 'manual' | 'automatic' | 'semi-automatic' | 'electric';
export type VehicleCategory = 'scooter' | 'sport' | 'touring' | 'off-road' | 'classic';

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  type: VehicleType;
  category: VehicleCategory;
  engineSize: string;
  pricePerDay: number;
  image: string;
  images: string[];
  status: VehicleStatus;
  description: string;
  specs: {
    fuelCapacity: string;
    weight: string;
    seatHeight: string;
    topSpeed: string;
  };
  features: string[];
  rating: number;
  reviewCount: number;
  location?: string;
  plate?: string;
  weeklyRate?: number;
  monthlyRate?: number;
}

export type BookingStatus = 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';

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
  paymentStatus: 'pending' | 'paid' | 'refunded';
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
  status: 'active' | 'flagged' | 'blocked';
}

export interface Voucher {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minBookingValue: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usageCount: number;
  status: 'active' | 'expired' | 'disabled';
}

export interface MaintenanceLog {
  id: string;
  vehicleId: string;
  date: string;
  type: 'routine' | 'repair' | 'inspection';
  description: string;
  cost: number;
  technician: string;
}

export interface FinanceRecord {
  id: string;
  date: string;
  type: 'revenue' | 'expense';
  category: string;
  amount: number;
  description: string;
  referenceId?: string;
}
