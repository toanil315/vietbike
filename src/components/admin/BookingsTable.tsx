import BookingsManagementPage from "@/components/admin/bookings/bookings-management-page";
import { Booking, Pagination } from "@/types";

interface BookingsTableProps {
  initialBookings: Booking[];
  initialPagination: Pagination;
  initialFilters: {
    status: string;
    customerName?: string;
    customerPhone?: string;
    licensePlate?: string;
    search?: string;
  };
}

export default function BookingsTable({
  initialBookings,
  initialPagination,
  initialFilters,
}: BookingsTableProps) {
  return (
    <BookingsManagementPage
      initialBookings={initialBookings}
      initialPagination={initialPagination}
      initialFilters={{
        status: initialFilters.status,
        customerName:
          initialFilters.customerName || initialFilters.search || "",
        customerPhone: initialFilters.customerPhone || "",
        licensePlate: initialFilters.licensePlate || "",
      }}
    />
  );
}
