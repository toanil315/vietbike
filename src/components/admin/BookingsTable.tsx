"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreVertical,
  Plus,
  Search,
} from "lucide-react";
import { updateBookingStatusAction } from "@/app/admin/bookings/actions";
import { Booking, BookingStatus } from "@/types";
import { cn, formatDate, formatPrice } from "@/lib/utils";

interface BookingsTableProps {
  initialBookings: Booking[];
  initialPagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  initialFilters: {
    search: string;
    status: string;
  };
}

const statusColors: Record<BookingStatus, string> = {
  pending: "bg-orange-100 text-orange-700",
  confirmed: "bg-blue-100 text-blue-700",
  active: "bg-emerald-100 text-emerald-700",
  completed: "bg-slate-100 text-slate-700",
  cancelled: "bg-red-100 text-red-700",
};

const updatableStatuses = [
  "confirmed",
  "active",
  "completed",
  "cancelled",
] as const;

export default function BookingsTable({
  initialBookings,
  initialPagination,
  initialFilters,
}: BookingsTableProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState(initialFilters.search);
  const [statusFilter, setStatusFilter] = useState(initialFilters.status);
  const [updatingBookingId, setUpdatingBookingId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setSearch(initialFilters.search);
    setStatusFilter(initialFilters.status);
  }, [initialFilters.search, initialFilters.status]);

  const filteredBookings = useMemo(() => {
    if (!search.trim()) {
      return initialBookings;
    }

    const q = search.toLowerCase();
    return initialBookings.filter(
      (booking) =>
        booking.reference.toLowerCase().includes(q) ||
        booking.customerInfo.fullName.toLowerCase().includes(q) ||
        booking.customerInfo.phone.toLowerCase().includes(q),
    );
  }, [initialBookings, search]);

  const updateQueryParams = useCallback(
    (overrides: Record<string, string | number | undefined>) => {
      const params = new URLSearchParams();
      const nextSearch =
        overrides.search !== undefined ? String(overrides.search) : search;
      const nextStatus =
        overrides.status !== undefined
          ? String(overrides.status)
          : statusFilter;
      const nextPage =
        overrides.page !== undefined
          ? Number(overrides.page)
          : initialPagination.page;

      if (nextSearch) params.set("search", nextSearch);
      if (nextStatus) params.set("status", nextStatus);
      params.set("page", String(Math.max(1, nextPage)));
      params.set("pageSize", String(initialPagination.pageSize));

      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [
      search,
      statusFilter,
      initialPagination.page,
      initialPagination.pageSize,
      pathname,
      router,
    ],
  );

  const applyFilters = useCallback(() => {
    updateQueryParams({ search, status: statusFilter, page: 1 });
  }, [search, statusFilter, updateQueryParams]);

  const handleStatusUpdate = useCallback(
    async (bookingId: string, status: Exclude<BookingStatus, "pending">) => {
      setUpdatingBookingId(bookingId);
      await updateBookingStatusAction(bookingId, status);
      setUpdatingBookingId(null);
    },
    [],
  );

  const showingFrom =
    initialPagination.total === 0
      ? 0
      : (initialPagination.page - 1) * initialPagination.pageSize + 1;
  const showingTo =
    initialPagination.total === 0
      ? 0
      : Math.min(
          initialPagination.page * initialPagination.pageSize,
          initialPagination.total,
        );

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-on-surface">
            Booking Management
          </h1>
          <p className="text-secondary">
            Track and update bookings from backend data.
          </p>
        </div>
        <Link
          href="/admin/bookings/new"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-container transition-default"
        >
          <Plus size={18} />
          <span>Create Booking</span>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-60 relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
            />
            <input
              type="text"
              placeholder="Search reference, customer name, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  applyFilters();
                }
              }}
              className="w-full pl-12 pr-4 py-3 bg-surface-container/50 border border-outline-variant/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none"
          >
            <option value="">All statuses</option>
            <option value="pending">pending</option>
            <option value="confirmed">confirmed</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
            <option value="cancelled">cancelled</option>
          </select>

          <button
            type="button"
            onClick={applyFilters}
            className="p-3 rounded-xl bg-surface-container/50 border border-outline-variant/20 text-secondary hover:text-primary transition-default"
          >
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-outline-variant/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container/30 border-b border-outline-variant/10">
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">
                  Reference
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">
                  Customer
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">
                  Vehicle ID
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">
                  Rental Period
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest text-right">
                  Total
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-surface-container/20 transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-primary">
                    {booking.reference}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-on-surface">
                        {booking.customerInfo.fullName}
                      </p>
                      <p className="text-xs text-secondary">
                        {booking.customerInfo.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary">
                    {booking.vehicleId}
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary">
                    {formatDate(booking.pickupDate)} -{" "}
                    {formatDate(booking.dropoffDate)}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-on-surface">
                    {formatPrice(booking.totalAmount)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        statusColors[booking.status],
                      )}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {booking.status !== "pending" && (
                        <select
                          value={booking.status}
                          onChange={(e) =>
                            handleStatusUpdate(
                              booking.id,
                              e.target.value as Exclude<
                                BookingStatus,
                                "pending"
                              >,
                            )
                          }
                          disabled={updatingBookingId === booking.id}
                          className="text-xs rounded-lg border border-outline-variant/20 px-2 py-1 bg-white"
                        >
                          {updatableStatuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      )}
                      {booking.status === "pending" && (
                        <button
                          type="button"
                          onClick={() =>
                            handleStatusUpdate(booking.id, "confirmed")
                          }
                          disabled={updatingBookingId === booking.id}
                          className="text-xs px-3 py-1 rounded-lg bg-primary text-white font-bold"
                        >
                          Confirm
                        </button>
                      )}
                      <button className="p-2 rounded-lg text-secondary hover:bg-surface-container transition-default">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-outline-variant/10 flex items-center justify-between">
          <p className="text-sm text-secondary">
            Showing{" "}
            <span className="font-bold text-on-surface">
              {showingFrom}-{showingTo}
            </span>{" "}
            of{" "}
            <span className="font-bold text-on-surface">
              {initialPagination.total}
            </span>
          </p>
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-lg border border-outline-variant/20 text-secondary hover:bg-white transition-default disabled:opacity-50"
              onClick={() =>
                updateQueryParams({
                  page: Math.max(1, initialPagination.page - 1),
                })
              }
              disabled={initialPagination.page <= 1}
            >
              <ChevronLeft size={18} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-primary text-white text-sm font-bold">
              {initialPagination.page}
            </button>
            <span className="text-sm text-secondary font-medium">
              / {Math.max(1, initialPagination.totalPages)}
            </span>
            <button
              className="p-2 rounded-lg border border-outline-variant/20 text-secondary hover:bg-white transition-default disabled:opacity-50"
              onClick={() =>
                updateQueryParams({ page: initialPagination.page + 1 })
              }
              disabled={initialPagination.page >= initialPagination.totalPages}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
