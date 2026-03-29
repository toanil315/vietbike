"use client";

import { Pencil, Trash2 } from "lucide-react";
import { VehicleCategory } from "@/types";

interface CategoryTableProps {
  categories: VehicleCategory[];
  deletingCategoryId: string | null;
  onEdit: (category: VehicleCategory) => void;
  onDelete: (category: VehicleCategory) => void;
}

export default function CategoryTable({
  categories,
  deletingCategoryId,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  if (categories.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-outline-variant/30 bg-surface-container/20 p-10 text-center text-sm text-secondary">
        Chưa có danh mục nào. Hãy tạo danh mục đầu tiên.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-outline-variant/10 bg-white shadow-sm">
      <table className="w-full min-w-[700px] border-collapse text-left">
        <thead>
          <tr className="border-b border-outline-variant/10 bg-surface-container/30">
            <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-secondary">
              Tên
            </th>
            <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-secondary">
              Mô tả
            </th>
            <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-secondary">
              Cập nhật
            </th>
            <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-secondary">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/10">
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-surface-container/20">
              <td className="px-5 py-4">
                <p className="font-semibold text-on-surface">{category.name}</p>
              </td>
              <td className="px-5 py-4 text-sm text-secondary">
                {category.description || "-"}
              </td>
              <td className="px-5 py-4 text-sm text-secondary">
                {new Date(category.updatedAt).toLocaleString("vi-VN")}
              </td>
              <td className="px-5 py-4">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(category)}
                    className="inline-flex items-center gap-1 rounded-lg border border-outline-variant/20 px-3 py-2 text-xs font-semibold text-secondary hover:bg-surface-container"
                  >
                    <Pencil size={14} /> Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(category)}
                    disabled={deletingCategoryId === category.id}
                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
                  >
                    <Trash2 size={14} />
                    {deletingCategoryId === category.id ? "Đang xóa..." : "Xóa"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
