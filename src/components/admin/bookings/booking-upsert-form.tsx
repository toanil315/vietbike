"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BookingFormFields from "@/components/admin/bookings/booking-form-fields";
import {
  buildCreateBookingPayload,
  buildUpdateBookingPayload,
  BookingUpsertFormValues,
  getDefaultBookingFormValues,
} from "@/components/admin/bookings/handlers/booking-upsert-handlers";
import { Booking } from "@/types";
import {
  validateData,
  adminCreateBookingSchema,
  adminUpdateBookingSchema,
} from "@/lib/validation";
import { useAdminBookingMutations } from "@/hooks/useAdminBookingMutations";

interface BookingUpsertFormProps {
  mode: "create" | "edit";
  bookingId?: string;
  initialBooking?: Booking | null;
}

export default function BookingUpsertForm({
  mode,
  bookingId,
  initialBooking,
}: BookingUpsertFormProps) {
  const router = useRouter();
  const { createBooking, updateBooking, isLoading } =
    useAdminBookingMutations();
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState<BookingUpsertFormValues>(() =>
    getDefaultBookingFormValues(initialBooking),
  );

  const title = useMemo(
    () => (mode === "create" ? "Create Manual Booking" : "Edit Booking"),
    [mode],
  );

  const resolvedBookingId = bookingId || initialBooking?.id;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (mode === "create") {
      const payload = buildCreateBookingPayload(values);
      const validation = validateData(adminCreateBookingSchema, payload);
      if (!validation.success) {
        setError(Object.values(validation.errors)[0] || "Validation failed.");
        return;
      }

      try {
        await createBooking(validation.data);
        router.push("/admin/bookings");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Create booking failed.");
      }
      return;
    }

    if (!resolvedBookingId) {
      setError("Missing bookingId for edit mode.");
      return;
    }

    const payload = buildUpdateBookingPayload(values);
    const validation = validateData(adminUpdateBookingSchema, payload);
    if (!validation.success) {
      setError(Object.values(validation.errors)[0] || "Validation failed.");
      return;
    }

    try {
      await updateBooking(resolvedBookingId, validation.data);
      router.push("/admin/bookings");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update booking failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-on-surface">{title}</h1>
          <p className="text-sm text-secondary">
            API-aligned booking form for admin operations.
          </p>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary-container disabled:opacity-60"
        >
          {isLoading
            ? "Saving..."
            : mode === "create"
              ? "Create Booking"
              : "Save Changes"}
        </button>
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="rounded-3xl border border-outline-variant/10 bg-white p-6 shadow-sm">
        <BookingFormFields
          mode={mode}
          values={values}
          onChange={(patch) =>
            setValues((current) => ({ ...current, ...patch }))
          }
        />
      </div>
    </form>
  );
}
