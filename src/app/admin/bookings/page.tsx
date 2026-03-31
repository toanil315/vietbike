import BookingsManagementPage from "@/components/admin/bookings/bookings-management-page";
import { adminBookingEndpoints } from "@/lib/api-endpoints";
import { getAdminAuthorizationHeader } from "@/lib/auth/require-admin-auth";
import { Booking, BookingListResponse } from "@/types";
import { BookingListFilters } from "@/components/admin/bookings/bookings-list-filters";

interface AdminBookingsPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

type BookingsResponse = BookingListResponse;

async function fetchBookings(
  query: URLSearchParams,
): Promise<BookingsResponse> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
  const authorization = await getAdminAuthorizationHeader();
  const response = await fetch(
    `${apiBaseUrl}${adminBookingEndpoints.list()}?${query.toString()}`,
    {
      cache: "no-store",
      headers: { Authorization: authorization },
    },
  );

  if (!response.ok) {
    return {
      data: [],
      pagination: {
        page: Number(query.get("page") || 1),
        pageSize: Number(query.get("pageSize") || 20),
        total: 0,
        totalPages: 1,
      },
    };
  }

  const payload = (await response.json()) as {
    success: boolean;
    data?: BookingsResponse;
  };

  if (!payload.success || !payload.data) {
    return {
      data: [],
      pagination: {
        page: Number(query.get("page") || 1),
        pageSize: Number(query.get("pageSize") || 20),
        total: 0,
        totalPages: 1,
      },
    };
  }

  return payload.data;
}

export default async function AdminBookingsPage({
  searchParams,
}: AdminBookingsPageProps) {
  const params = await searchParams;
  const page = Number(params?.page || 1);
  const pageSize = Number(params?.pageSize || 20);
  const status = typeof params?.status === "string" ? params.status : "";
  const customerName =
    typeof params?.customerName === "string" ? params.customerName : "";
  const customerPhone =
    typeof params?.customerPhone === "string" ? params.customerPhone : "";
  const licensePlate =
    typeof params?.licensePlate === "string" ? params.licensePlate : "";

  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    ...(status ? { status } : {}),
    ...(customerName ? { customerName } : {}),
    ...(customerPhone ? { customerPhone } : {}),
    ...(licensePlate ? { licensePlate } : {}),
  });

  const bookingsData = await fetchBookings(query);

  const initialFilters: BookingListFilters = {
    status,
    customerName,
    customerPhone,
    licensePlate,
  };

  return (
    <BookingsManagementPage
      initialBookings={bookingsData.data}
      initialPagination={bookingsData.pagination}
      initialFilters={initialFilters}
    />
  );
}
