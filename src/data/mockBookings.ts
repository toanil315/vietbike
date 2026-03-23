import { BookingStatus } from "../types";

interface MockDashboardBooking {
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

export const BOOKINGS: MockDashboardBooking[] = [
  {
    id: "b1",
    referenceNumber: "VB-1001",
    vehicleId: "v1",
    customerId: "c1",
    startDate: "2024-03-15",
    endDate: "2024-03-17",
    pickupLocation: "Hanoi Old Quarter",
    dropoffLocation: "Hanoi Old Quarter",
    status: "completed",
    totalPrice: 300000,
    addons: ["a1"],
    paymentMethod: "cash",
    paymentStatus: "paid",
    createdAt: "2024-03-10T10:00:00Z",
  },
  {
    id: "b2",
    referenceNumber: "VB-1002",
    vehicleId: "v2",
    customerId: "c2",
    startDate: "2024-03-20",
    endDate: "2024-03-25",
    pickupLocation: "Da Nang City Center",
    dropoffLocation: "Da Nang My Khe Beach",
    status: "active",
    totalPrice: 1850000,
    addons: ["a1", "a2", "a4"],
    paymentMethod: "credit_card",
    paymentStatus: "paid",
    createdAt: "2024-03-18T14:30:00Z",
  },
  {
    id: "b3",
    referenceNumber: "VB-1003",
    vehicleId: "v3",
    customerId: "c1",
    startDate: "2024-03-22",
    endDate: "2024-03-23",
    pickupLocation: "Ho Chi Minh District 1",
    dropoffLocation: "Ho Chi Minh District 1",
    status: "confirmed",
    totalPrice: 650000,
    addons: [],
    paymentMethod: "momo",
    paymentStatus: "paid",
    createdAt: "2024-03-19T09:15:00Z",
  },
  {
    id: "b4",
    referenceNumber: "VB-1004",
    vehicleId: "v4",
    customerId: "c2",
    startDate: "2024-03-25",
    endDate: "2024-03-30",
    pickupLocation: "Hanoi West Lake",
    dropoffLocation: "Hanoi West Lake",
    status: "pending",
    totalPrice: 2250000,
    addons: ["a4"],
    paymentMethod: "bank_transfer",
    paymentStatus: "pending",
    createdAt: "2024-03-20T08:00:00Z",
  },
];
