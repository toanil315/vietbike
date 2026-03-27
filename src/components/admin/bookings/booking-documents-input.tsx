"use client";

import { FieldArrayWithId, useFormContext } from "react-hook-form";
import { BookingUpsertFormValues } from "./handlers/booking-upsert-handlers";

interface BookingDocumentsInputProps {
  documents: FieldArrayWithId<BookingUpsertFormValues, "documents", "id">[];
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export default function BookingDocumentsInput({
  documents,
  onAdd,
  onRemove,
}: BookingDocumentsInputProps) {
  const { register } = useFormContext();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-on-surface ml-1">
          Tài liệu (tên + đường dẫn)
        </label>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-lg border border-outline-variant/20 px-3 py-1 text-xs font-bold text-secondary transition hover:bg-surface-container/30 focus:outline-none focus:ring-2 focus:ring-primary/20 active:scale-[0.98]"
        >
          Thêm tài liệu
        </button>
      </div>

      {documents.length === 0 && (
        <p className="text-xs text-secondary">Chưa có tài liệu nào.</p>
      )}

      {documents.map((document, index) => (
        <div
          key={document.id}
          className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_2fr_auto]"
        >
          <input
            {...register(`documents.${index}.name`)}
            placeholder="Tên tài liệu"
            className="rounded-xl border border-outline-variant/20 bg-surface-container/30 px-3 py-2 text-sm"
          />
          <input
            {...register(`documents.${index}.url`)}
            placeholder="https://..."
            className="rounded-xl border border-outline-variant/20 bg-surface-container/30 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="rounded-xl border border-red-200 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200 active:scale-[0.98]"
          >
            Xóa
          </button>
        </div>
      ))}
    </div>
  );
}
