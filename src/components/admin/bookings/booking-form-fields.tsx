"use client";

import BookingDocumentsInput from "@/components/admin/bookings/booking-documents-input";
import { BookingUpsertFormValues } from "@/components/admin/bookings/handlers/booking-upsert-handlers";

interface BookingFormFieldsProps {
  values: BookingUpsertFormValues;
  onChange: (patch: Partial<BookingUpsertFormValues>) => void;
  mode: "create" | "edit";
}

export default function BookingFormFields({
  values,
  onChange,
  mode,
}: BookingFormFieldsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={values.customerName}
          onChange={(e) => onChange({ customerName: e.target.value })}
          placeholder="Customer name"
          className="rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
        />
        <input
          value={values.customerPhone}
          onChange={(e) => onChange({ customerPhone: e.target.value })}
          placeholder="Customer phone"
          className="rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
        />
        <input
          value={values.customerEmail}
          onChange={(e) => onChange({ customerEmail: e.target.value })}
          placeholder="Customer email (optional)"
          className="rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
        />
        <input
          value={values.sourceApp}
          onChange={(e) => onChange({ sourceApp: e.target.value })}
          placeholder="Source app"
          className="rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
        />
        <input
          value={values.licensePlate}
          onChange={(e) => onChange({ licensePlate: e.target.value })}
          placeholder="License plate"
          className="rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
        />
        {mode === "create" ? (
          <input
            type="datetime-local"
            value={values.startDate}
            onChange={(e) => onChange({ startDate: e.target.value })}
            className="rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
          />
        ) : (
          <>
            <input
              type="datetime-local"
              value={values.pickupDate}
              onChange={(e) => onChange({ pickupDate: e.target.value })}
              className="rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
            />
            <input
              type="datetime-local"
              value={values.dropoffDate}
              onChange={(e) => onChange({ dropoffDate: e.target.value })}
              className="rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
            />
          </>
        )}
      </div>

      {mode === "create" && (
        <input
          type="number"
          min={1}
          value={values.rentalDays}
          onChange={(e) =>
            onChange({ rentalDays: Number(e.target.value) || 1 })
          }
          placeholder="Rental days"
          className="w-full rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={values.totalAmount}
          onChange={(e) => onChange({ totalAmount: e.target.value })}
          placeholder="Total amount (e.g. 600,000VND)"
          className="rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
        />
        <input
          value={values.depositAmount}
          onChange={(e) => onChange({ depositAmount: e.target.value })}
          placeholder="Deposit amount"
          className="rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
        />
      </div>

      <textarea
        rows={4}
        value={values.note}
        onChange={(e) => onChange({ note: e.target.value })}
        placeholder="Booking note"
        className="w-full rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
      />

      <BookingDocumentsInput
        documents={values.documents}
        onChange={(documents) => onChange({ documents })}
      />
    </div>
  );
}
