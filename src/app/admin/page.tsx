import DashboardContent from "@/components/admin/DashboardContent";
import {
  adminBookingEndpoints,
  adminVehicleEndpoints,
} from "@/lib/api-endpoints";
import { getAdminAuthorizationHeader } from "@/lib/auth/require-admin-auth";
import { Booking, Vehicle } from "@/types";

interface ListResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

async function fetchVehicles(): Promise<ListResponse<Vehicle>> {
  const authorization = await getAdminAuthorizationHeader();

  try {
    const query = new URLSearchParams({ page: "1", pageSize: "200" });
    const response = await fetch(
      `${API_BASE_URL}${adminVehicleEndpoints.list()}?${query.toString()}`,
      {
        cache: "no-store",
        headers: { Authorization: authorization },
      },
    );

    if (!response.ok) {
      throw new Error("Vehicle request failed");
    }

    const payload = (await response.json()) as {
      success: boolean;
      data?: ListResponse<Vehicle>;
    };

    if (!payload.success || !payload.data) {
      throw new Error("Vehicle payload is invalid");
    }

    return payload.data;
  } catch {
    return {
      data: [],
      pagination: { page: 1, pageSize: 200, total: 0, totalPages: 1 },
    };
  }
}

async function fetchBookings(): Promise<ListResponse<Booking>> {
  const authorization = await getAdminAuthorizationHeader();

  try {
    const query = new URLSearchParams({ page: "1", pageSize: "100" });
    const response = await fetch(
      `${API_BASE_URL}${adminBookingEndpoints.list()}?${query.toString()}`,
      {
        cache: "no-store",
        headers: { Authorization: authorization },
      },
    );

    if (!response.ok) {
      throw new Error("Booking request failed");
    }

    const payload = (await response.json()) as {
      success: boolean;
      data?: ListResponse<Booking>;
    };

    if (!payload.success || !payload.data) {
      throw new Error("Booking payload is invalid");
    }

    return payload.data;
  } catch {
    return {
      data: [],
      pagination: { page: 1, pageSize: 100, total: 0, totalPages: 1 },
    };
  }
}

export default async function AdminDashboardPage() {
  const [vehiclesResult, bookingsResult] = await Promise.all([
    fetchVehicles(),
    fetchBookings(),
  ]);

  return (
    <DashboardContent
      vehicles={vehiclesResult.data}
      vehicleTotal={vehiclesResult.pagination.total}
      bookings={bookingsResult.data}
      bookingTotal={bookingsResult.pagination.total}
    />
  );
}
