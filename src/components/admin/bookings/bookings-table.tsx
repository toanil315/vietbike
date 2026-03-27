"use client";

import Link from "next/link";
import { Booking, Pagination } from "@/types";
import { formatDate } from "@/lib/utils";
import { EditIcon, EyeIcon } from "lucide-react";

interface BookingsTableProps {
  bookings: Booking[];
  pagination: Pagination;
  onPageChange: (nextPage: number) => void;
}

function renderApiValue(value: string | number | undefined) {
  if (value === undefined || value === null || String(value).trim() === "") {
    return "--";
  }
  return String(value);
}

export default function BookingsTable({
  bookings,
  pagination,
  onPageChange,
}: BookingsTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-outline-variant/10 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-outline-variant/10 bg-surface-container/30">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary">
                Mã booking
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary">
                Khách hàng
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary">
                Biển số
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary">
                Thời gian
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary">
                Số tiền
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary">
                Đặt cọc
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-secondary">
                Thao tác
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
                    {booking.customerInfo?.fullName || "Không rõ"}
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
                  {renderApiValue(booking.totalAmount)}
                </td>
                <td className="px-6 py-4 text-sm text-secondary">
                  {renderApiValue(booking.depositAmount)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/bookings/${booking.reference}`}
                      className="rounded-lg border border-outline-variant/20 px-3 py-1 text-xs font-bold text-secondary transition hover:border-primary/40 hover:bg-primary/5 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 active:scale-[0.98]"
                    >
                      <EyeIcon />
                    </Link>
                    <Link
                      href={`/admin/bookings/${booking.reference}/edit`}
                      className="rounded-lg border border-outline-variant/20 px-3 py-1 text-xs font-bold text-secondary transition hover:border-primary/40 hover:bg-primary/5 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 active:scale-[0.98]"
                    >
                      <EditIcon />
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
                  Không tìm thấy booking theo bộ lọc hiện tại.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-outline-variant/10 px-6 py-4">
        <p className="text-sm text-secondary">
          Trang{" "}
          <span className="font-bold text-on-surface">{pagination.page}</span> /{" "}
          {Math.max(1, pagination.totalPages)}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, pagination.page - 1))}
            disabled={pagination.page <= 1}
            className="rounded-lg border border-outline-variant/20 px-3 py-2 text-sm transition hover:bg-surface-container/30 disabled:opacity-50"
          >
            Trước
          </button>
          <button
            type="button"
            onClick={() =>
              onPageChange(Math.min(pagination.totalPages, pagination.page + 1))
            }
            disabled={pagination.page >= pagination.totalPages}
            className="rounded-lg border border-outline-variant/20 px-3 py-2 text-sm transition hover:bg-surface-container/30 disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}
