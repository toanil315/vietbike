"use client";

import Link from "next/link";
import { Booking, BookingStatus, Pagination } from "@/types";
import { formatDate, formatPrice } from "@/lib/utils";

interface BookingsTableProps {
  bookings: Booking[];
  pagination: Pagination;
  updatingBookingId: string | null;
  onUpdateStatus: (
    bookingId: string,
    status: Exclude<BookingStatus, "pending">,
  ) => void;
  onPageChange: (nextPage: number) => void;
}

const nextStatuses: Array<Exclude<BookingStatus, "pending">> = [
  "confirmed",
  "active",
  "completed",
  "cancelled",
];

export default function BookingsTable({
  bookings,
  pagination,
  updatingBookingId,
  onUpdateStatus,
  onPageChange,
}: BookingsTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-outline-variant/10 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-outline-variant/10 bg-surface-container/30">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary">
                Reference
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary">
                Customer
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary">
                License Plate
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary">
                Period
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary">
                Amount
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-secondary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-surface-container/20">
                <td className="px-6 py-4 font-semibold text-primary">
                  {booking.reference}
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-on-surface">
                    {booking.customerInfo?.fullName || "Unknown"}
                  </p>
                  <p className="text-xs text-secondary">
                    {booking.customerInfo?.phone || "--"}
                  </p>
                </td>
                <td className="px-6 py-4 text-sm text-secondary">
                  {booking.licensePlate || "--"}
                </td>
                <td className="px-6 py-4 text-sm text-secondary">
                  {formatDate(booking.pickupDate)} -{" "}
                  {formatDate(booking.dropoffDate)}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-on-surface">
                  {formatPrice(booking.totalAmount)}
                </td>
                <td className="px-6 py-4 text-sm text-secondary">
                  {booking.status}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {booking.status !== "pending" ? (
                      <select
                        value={booking.status}
                        onChange={(event) =>
                          onUpdateStatus(
                            booking.id,
                            event.target.value as Exclude<
                              BookingStatus,
                              "pending"
                            >,
                          )
                        }
                        disabled={updatingBookingId === booking.id}
                        className="rounded-lg border border-outline-variant/20 bg-white px-2 py-1 text-xs"
                      >
                        {nextStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onUpdateStatus(booking.id, "confirmed")}
                        disabled={updatingBookingId === booking.id}
                        className="rounded-lg bg-primary px-3 py-1 text-xs font-bold text-white"
                      >
                        Confirm
                      </button>
                    )}
                    <Link
                      href={`/admin/bookings/${booking.reference}`}
                      className="rounded-lg border border-outline-variant/20 px-3 py-1 text-xs font-bold text-secondary"
                    >
                      Detail
                    </Link>
                    <Link
                      href={`/admin/bookings/${booking.reference}/edit`}
                      className="rounded-lg border border-outline-variant/20 px-3 py-1 text-xs font-bold text-secondary"
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-10 text-center text-sm text-secondary"
                >
                  No bookings found with current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-outline-variant/10 px-6 py-4">
        <p className="text-sm text-secondary">
          Page{" "}
          <span className="font-bold text-on-surface">{pagination.page}</span> /{" "}
          {Math.max(1, pagination.totalPages)}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, pagination.page - 1))}
            disabled={pagination.page <= 1}
            className="rounded-lg border border-outline-variant/20 px-3 py-2 text-sm disabled:opacity-50"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() =>
              onPageChange(Math.min(pagination.totalPages, pagination.page + 1))
            }
            disabled={pagination.page >= pagination.totalPages}
            className="rounded-lg border border-outline-variant/20 px-3 py-2 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
