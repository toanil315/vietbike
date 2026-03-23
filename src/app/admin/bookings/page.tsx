import BookingsTable from "@/components/admin/BookingsTable";
import { adminBookingEndpoints } from "@/lib/api-endpoints";
import { Booking } from "@/types";

interface AdminBookingsPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

interface BookingsResponse {
  data: Booking[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

async function fetchBookings(
  query: URLSearchParams,
): Promise<BookingsResponse> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
  const response = await fetch(
    `${apiBaseUrl}${adminBookingEndpoints.list()}?${query.toString()}`,
    {
      cache: "no-store",
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
  const search = typeof params?.search === "string" ? params.search : "";

  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    ...(status ? { status } : {}),
  });

  const bookingsData = await fetchBookings(query);

  return (
    <BookingsTable
      initialBookings={bookingsData.data}
      initialPagination={bookingsData.pagination}
      initialFilters={{ search, status }}
    />
  );
}
