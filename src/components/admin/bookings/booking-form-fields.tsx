"use client";

import { useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import BookingDocumentsInput from "@/components/admin/bookings/booking-documents-input";
import {
  BookingUpsertFormValues,
  calculateRentalDays,
} from "@/components/admin/bookings/handlers/booking-upsert-handlers";

interface BookingFormFieldsProps {
  mode: "create" | "edit";
}

export default function BookingFormFields({
  mode: _mode,
}: BookingFormFieldsProps) {
  const { register, watch, control } =
    useFormContext<BookingUpsertFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "documents",
  });

  const pickupDate = watch("pickupDate");
  const dropoffDate = watch("dropoffDate");

  const rentalDays = useMemo(
    () => calculateRentalDays(pickupDate, dropoffDate),
    [pickupDate, dropoffDate],
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="space-y-1 text-sm font-medium text-on-surface">
          <span>Tên khách hàng</span>
          <input
            {...register("customerName")}
            className="w-full rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
          />
        </label>

        <label className="space-y-1 text-sm font-medium text-on-surface">
          <span>Số điện thoại</span>
          <input
            {...register("customerPhone")}
            className="w-full rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
          />
        </label>

        <label className="space-y-1 text-sm font-medium text-on-surface">
          <span>Nguồn</span>
          <input
            {...register("sourceApp")}
            className="w-full rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
          />
        </label>

        <label className="space-y-1 text-sm font-medium text-on-surface">
          <span>Biển số</span>
          <input
            {...register("licensePlate")}
            className="w-full rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
          />
        </label>

        <label className="space-y-1 text-sm font-medium text-on-surface">
          <span>Ngày nhận xe</span>
          <input
            type="datetime-local"
            {...register("pickupDate")}
            className="w-full rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
          />
        </label>

        <label className="space-y-1 text-sm font-medium text-on-surface">
          <span>Ngày trả xe</span>
          <input
            type="datetime-local"
            {...register("dropoffDate")}
            className="w-full rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
          />
        </label>
      </div>

      <label className="space-y-1 text-sm font-medium text-on-surface block">
        <span>Số ngày thuê (tự động tính)</span>
        <input
          value={String(rentalDays)}
          readOnly
          className="w-full rounded-xl border border-outline-variant/20 bg-surface-container/20 px-4 py-3 text-sm text-secondary"
        />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="space-y-1 text-sm font-medium text-on-surface">
          <span>Tổng tiền</span>
          <input
            {...register("totalAmount")}
            placeholder="Ví dụ: 600000"
            className="w-full rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
          />
        </label>
        <label className="space-y-1 text-sm font-medium text-on-surface">
          <span>Đặt cọc</span>
          <input
            {...register("depositAmount")}
            className="w-full rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
          />
        </label>
      </div>

      <label className="space-y-1 text-sm font-medium text-on-surface block">
        <span>Thông tin gia hạn</span>
        <textarea
          rows={3}
          {...register("extensionInfo")}
          placeholder="Nhập thông tin gia hạn nếu có"
          className="w-full rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
        />
      </label>

      <label className="space-y-1 text-sm font-medium text-on-surface block">
        <span>Ghi chú booking</span>
        <textarea
          rows={4}
          {...register("note")}
          className="w-full rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
        />
      </label>

      <BookingDocumentsInput
        documents={fields}
        onAdd={() => append({ name: "", url: "" })}
        onRemove={(index) => remove(index)}
      />
    </div>
  );
}
