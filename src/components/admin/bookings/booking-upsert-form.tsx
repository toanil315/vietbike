"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
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
  const form = useForm<BookingUpsertFormValues>({
    defaultValues: getDefaultBookingFormValues(initialBooking),
  });

  const title = useMemo(
    () => (mode === "create" ? "Tạo booking thủ công" : "Chỉnh sửa booking"),
    [mode],
  );

  const resolvedBookingId = bookingId || initialBooking?.id;

  useEffect(() => {
    form.reset(getDefaultBookingFormValues(initialBooking));
  }, [form, initialBooking]);

  const handleSubmit = async (values: BookingUpsertFormValues) => {
    setError(null);

    if (mode === "create") {
      const payload = buildCreateBookingPayload(values);
      const validation = validateData(adminCreateBookingSchema, payload);
      if (!validation.success) {
        setError(
          Object.values(validation.errors)[0] || "Dữ liệu không hợp lệ.",
        );
        return;
      }

      try {
        await createBooking(validation.data);
        router.push("/admin/bookings");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Tạo booking thất bại.");
      }
      return;
    }

    if (!resolvedBookingId) {
      setError("Thiếu bookingId cho chế độ chỉnh sửa.");
      return;
    }

    const payload = buildUpdateBookingPayload(values);
    const validation = validateData(adminUpdateBookingSchema, payload);
    if (!validation.success) {
      setError(Object.values(validation.errors)[0] || "Dữ liệu không hợp lệ.");
      return;
    }

    try {
      await updateBooking(resolvedBookingId, validation.data);
      router.push("/admin/bookings");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Cập nhật booking thất bại.",
      );
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mx-auto max-w-4xl space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-on-surface">{title}</h1>
            <p className="text-sm text-secondary">
              Form booking dành cho quản trị, đồng bộ theo API.
            </p>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-primary/30 active:scale-[0.98] disabled:opacity-60"
          >
            {isLoading
              ? "Đang lưu..."
              : mode === "create"
                ? "Tạo booking"
                : "Lưu thay đổi"}
          </button>
        </div>

        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="rounded-3xl border border-outline-variant/10 bg-white p-6 shadow-sm">
          <BookingFormFields mode={mode} />
        </div>
      </form>
    </FormProvider>
  );
}
