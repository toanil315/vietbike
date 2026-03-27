import { Booking } from "@/types";
import { formatDate, formatPrice } from "@/lib/utils";

interface BookingDetailCardProps {
  booking: Booking;
}

export default function BookingDetailCard({ booking }: BookingDetailCardProps) {
  return (
    <div className="space-y-6 rounded-3xl border border-outline-variant/10 bg-white p-6 shadow-sm">
      <div>
        <h1 className="text-3xl font-bold text-on-surface">
          Booking {booking.reference}
        </h1>
        <p className="text-sm text-secondary">
          Detailed booking information by reference.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-surface-container/20 p-4">
          <p className="text-xs uppercase text-secondary">Customer</p>
          <p className="font-semibold text-on-surface">
            {booking.customerInfo?.fullName || "Unknown"}
          </p>
          <p className="text-sm text-secondary">
            {booking.customerInfo?.phone || "--"}
          </p>
          <p className="text-sm text-secondary">
            {booking.customerInfo?.email || "--"}
          </p>
        </div>
        <div className="rounded-xl bg-surface-container/20 p-4">
          <p className="text-xs uppercase text-secondary">Rental</p>
          <p className="font-semibold text-on-surface">
            {booking.licensePlate || "--"}
          </p>
          <p className="text-sm text-secondary">
            {formatDate(booking.pickupDate)} - {formatDate(booking.dropoffDate)}
          </p>
          <p className="text-sm text-secondary">Status: {booking.status}</p>
        </div>
        <div className="rounded-xl bg-surface-container/20 p-4">
          <p className="text-xs uppercase text-secondary">Amounts</p>
          <p className="font-semibold text-on-surface">
            Total: {formatPrice(booking.totalAmount)}
          </p>
          <p className="text-sm text-secondary">
            Deposit: {formatPrice(booking.depositAmount || "0")}
          </p>
        </div>
        <div className="rounded-xl bg-surface-container/20 p-4">
          <p className="text-xs uppercase text-secondary">Meta</p>
          <p className="text-sm text-secondary">
            Source: {booking.sourceApp || "manual"}
          </p>
          <p className="text-sm text-secondary">
            Created: {formatDate(booking.createdAt)}
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-surface-container/20 p-4">
        <p className="text-xs uppercase text-secondary">Note</p>
        <p className="text-sm text-on-surface">{booking.note || "No note"}</p>
      </div>
    </div>
  );
}
