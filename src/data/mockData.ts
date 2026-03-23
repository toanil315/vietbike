import { Vehicle, Customer, Voucher, BookingStatus } from "../types";

export interface MockBooking {
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

export const VEHICLES: Vehicle[] = [];

export const CUSTOMERS: Customer[] = [
  {
    id: "c1",
    name: "Nguyen Van A",
    email: "vana@example.com",
    phone: "0901234567",
    nationality: "Vietnam",
    licenseNumber: "VN-123456789",
    passportNumber: "B1234567",
    totalBookings: 5,
    status: "active",
  },
  {
    id: "c2",
    name: "John Doe",
    email: "j.doe@example.com",
    phone: "0987654321",
    nationality: "United States",
    licenseNumber: "US-987654321",
    passportNumber: "Passport Ending 4492",
    avatar: "https://i.pravatar.cc/150?u=john",
    totalBookings: 2,
    status: "active",
  },
  {
    id: "c3",
    name: "Sarah Lee",
    email: "s.lee@traveler.io",
    phone: "0912345678",
    nationality: "South Korea",
    licenseNumber: "KR-123456789",
    passportNumber: "K9876543",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    totalBookings: 1,
    status: "active",
  },
  {
    id: "c4",
    name: "Mark Kim",
    email: "m.kim@web.com",
    phone: "0923456789",
    nationality: "Canada",
    licenseNumber: "CA-123456789",
    passportNumber: "C1234567",
    avatar: "https://i.pravatar.cc/150?u=mark",
    totalBookings: 3,
    status: "active",
  },
];

export const BOOKINGS: MockBooking[] = [
  {
    id: "b1",
    referenceNumber: "VB-9402",
    vehicleId: "v1",
    customerId: "c2",
    startDate: "2024-10-24T09:00:00",
    endDate: "2024-10-27T18:00:00",
    pickupLocation: "Old Quarter",
    dropoffLocation: "Old Quarter",
    status: "confirmed",
    totalPrice: 145,
    addons: ["a1", "a4"], // Helmet x2, Full Insurance
    paymentMethod: "Credit Card",
    paymentStatus: "paid",
    createdAt: "2024-10-20T10:00:00",
  },
  {
    id: "b2",
    referenceNumber: "VB-9388",
    vehicleId: "v2",
    customerId: "c3",
    startDate: "2024-10-22T09:00:00",
    endDate: "2024-10-25T18:00:00",
    pickupLocation: "Da Nang Airport",
    dropoffLocation: "Da Nang Airport",
    status: "active",
    totalPrice: 120,
    addons: ["a1"],
    paymentMethod: "Cash",
    paymentStatus: "paid",
    createdAt: "2024-10-18T14:30:00",
  },
  {
    id: "b3",
    referenceNumber: "VB-9415",
    vehicleId: "v6",
    customerId: "c4",
    startDate: "2024-10-25T09:00:00",
    endDate: "2024-10-26T18:00:00",
    pickupLocation: "District 1, HCM",
    dropoffLocation: "District 1, HCM",
    status: "pending",
    totalPrice: 45,
    addons: [],
    paymentMethod: "Bank Transfer",
    paymentStatus: "pending",
    createdAt: "2024-10-23T16:45:00",
  },
];

export const VOUCHERS: Voucher[] = [
  {
    id: "v1",
    code: "VIETBIKE20",
    discountType: "percentage",
    discountValue: 20,
    minBookingValue: 500000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    usageLimit: 100,
    usageCount: 45,
    status: "active",
  },
  {
    id: "v2",
    code: "WELCOME100",
    discountType: "fixed",
    discountValue: 100000,
    minBookingValue: 300000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    usageLimit: 500,
    usageCount: 120,
    status: "active",
  },
];

export const ADDONS = [
  {
    id: "a1",
    name: "Premium Helmet",
    price: 20000,
    description: "High-quality full-face helmet for extra safety.",
  },
  {
    id: "a2",
    name: "Phone Holder",
    price: 10000,
    description: "Securely mount your phone for navigation.",
  },
  {
    id: "a3",
    name: "Rain Coat",
    price: 5000,
    description: "Stay dry during unexpected rain showers.",
  },
  {
    id: "a4",
    name: "Insurance Plus",
    price: 50000,
    description: "Extended coverage for peace of mind.",
  },
];

export const LOCATIONS = [
  "Hanoi Old Quarter",
  "Hanoi West Lake",
  "Da Nang City Center",
  "Da Nang My Khe Beach",
  "Ho Chi Minh District 1",
  "Ho Chi Minh District 7",
];
