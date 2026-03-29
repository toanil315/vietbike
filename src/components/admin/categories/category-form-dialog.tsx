"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { VehicleCategory } from "@/types";

export interface CategoryFormValue {
  name: string;
  description: string;
  content: string;
}

interface CategoryFormDialogProps {
  open: boolean;
  title: string;
  submitLabel: string;
  isSubmitting: boolean;
  initialCategory?: VehicleCategory | null;
  onClose: () => void;
  onSubmit: (value: CategoryFormValue) => Promise<void>;
}

const EMPTY_FORM: CategoryFormValue = {
  name: "",
  description: "",
  content: "",
};

export default function CategoryFormDialog({
  open,
  title,
  submitLabel,
  isSubmitting,
  initialCategory,
  onClose,
  onSubmit,
}: CategoryFormDialogProps) {
  const [form, setForm] = useState<CategoryFormValue>(EMPTY_FORM);

  useEffect(() => {
    if (!open) {
      return;
    }

    if (initialCategory) {
      setForm({
        name: initialCategory.name,
        description: initialCategory.description || "",
        content: initialCategory.content || "",
      });
      return;
    }

    setForm(EMPTY_FORM);
  }, [initialCategory, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-2xl rounded-3xl border border-outline-variant/20 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-outline-variant/10 px-6 py-5">
          <h3 className="text-xl font-bold text-on-surface">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-secondary hover:bg-surface-container"
            disabled={isSubmitting}
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void onSubmit(form);
          }}
          className="space-y-4 p-6"
        >
          <label className="block space-y-1 text-sm font-medium text-on-surface">
            <span>Tên danh mục</span>
            <input
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Ví dụ: Premium Scooters"
              className="w-full rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
              required
            />
          </label>

          <label className="block space-y-1 text-sm font-medium text-on-surface">
            <span>Mô tả ngắn</span>
            <input
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Mô tả ngắn cho danh sách"
              className="w-full rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
            />
          </label>

          <label className="block space-y-1 text-sm font-medium text-on-surface">
            <span>Nội dung chi tiết</span>
            <textarea
              value={form.content}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, content: e.target.value }))
              }
              placeholder="Nội dung mô tả chi tiết cho danh mục"
              rows={5}
              className="w-full rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
            />
          </label>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-outline-variant/20 px-4 py-2.5 text-sm font-semibold text-secondary hover:bg-surface-container disabled:opacity-60"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-container disabled:opacity-60"
            >
              {isSubmitting ? "Đang lưu..." : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
