"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { updateBookingStatusAction } from "@/app/admin/bookings/actions";
import BookingsListFilters, {
  BookingListFilters,
} from "@/components/admin/bookings/bookings-list-filters";
import BookingsTable from "@/components/admin/bookings/bookings-table";
import BookingSyncTargetSection from "@/components/admin/bookings/booking-sync-target-section";
import { Booking, BookingStatus, Pagination } from "@/types";

interface BookingsManagementPageProps {
  initialBookings: Booking[];
  initialPagination: Pagination;
  initialFilters: BookingListFilters;
}

export default function BookingsManagementPage({
  initialBookings,
  initialPagination,
  initialFilters,
}: BookingsManagementPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [filters, setFilters] = useState<BookingListFilters>(initialFilters);
  const [updatingBookingId, setUpdatingBookingId] = useState<string | null>(
    null,
  );

  const applyQuery = useCallback(
    (next: BookingListFilters, page: number) => {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("pageSize", String(initialPagination.pageSize));
      if (next.status) params.set("status", next.status);
      if (next.customerName) params.set("customerName", next.customerName);
      if (next.customerPhone) params.set("customerPhone", next.customerPhone);
      if (next.licensePlate) params.set("licensePlate", next.licensePlate);
      router.push(`${pathname}?${params.toString()}`);
    },
    [initialPagination.pageSize, pathname, router],
  );

  const handleStatusUpdate = useCallback(
    async (bookingId: string, status: Exclude<BookingStatus, "pending">) => {
      setUpdatingBookingId(bookingId);
      await updateBookingStatusAction(bookingId, status);
      setUpdatingBookingId(null);
      router.refresh();
    },
    [router],
  );

  const memoizedBookings = useMemo(() => initialBookings, [initialBookings]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-on-surface">
            Booking Management
          </h1>
          <p className="text-sm text-secondary">
            Manage booking list, details, manual create/edit, and sync targets.
          </p>
        </div>
        <Link
          href="/admin/bookings/new"
          className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary-container"
        >
          Create Booking
        </Link>
      </div>

      <BookingSyncTargetSection />

      <BookingsListFilters
        value={filters}
        onChange={(patch) =>
          setFilters((current) => ({ ...current, ...patch }))
        }
        onApply={() => applyQuery(filters, 1)}
        onReset={() => {
          const reset = {
            status: "",
            customerName: "",
            customerPhone: "",
            licensePlate: "",
          };
          setFilters(reset);
          applyQuery(reset, 1);
        }}
      />

      <BookingsTable
        bookings={memoizedBookings}
        pagination={initialPagination}
        updatingBookingId={updatingBookingId}
        onUpdateStatus={handleStatusUpdate}
        onPageChange={(nextPage) => applyQuery(filters, nextPage)}
      />
    </div>
  );
}
