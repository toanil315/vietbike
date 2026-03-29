"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import {
  createVehicleCategoryAction,
  deleteVehicleCategoryAction,
  updateVehicleCategoryAction,
} from "@/app/admin/categories/actions";
import { VehicleCategory } from "@/types";
import CategoryTable from "@/components/admin/categories/category-table";
import CategoryFormDialog, {
  CategoryFormValue,
} from "@/components/admin/categories/category-form-dialog";

interface CategoryManagementPageProps {
  initialCategories: VehicleCategory[];
}

export default function CategoryManagementPage({
  initialCategories,
}: CategoryManagementPageProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(
    null,
  );
  const [editingCategory, setEditingCategory] =
    useState<VehicleCategory | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const sortedCategories = useMemo(
    () =>
      [...initialCategories].sort((a, b) =>
        a.name.localeCompare(b.name, "vi", { sensitivity: "base" }),
      ),
    [initialCategories],
  );

  const openCreateDialog = () => {
    setEditingCategory(null);
    setError(null);
    setSuccess(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (category: VehicleCategory) => {
    setEditingCategory(category);
    setError(null);
    setSuccess(null);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (value: CategoryFormValue) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      if (editingCategory) {
        const result = await updateVehicleCategoryAction(
          editingCategory.id,
          value,
        );
        if (!result.ok || !result.data) {
          throw new Error(result.error || "Cập nhật danh mục thất bại");
        }

        setSuccess("Cập nhật danh mục thành công.");
      } else {
        const result = await createVehicleCategoryAction(value);
        if (!result.ok || !result.data) {
          throw new Error(result.error || "Tạo danh mục thất bại");
        }

        setSuccess("Tạo danh mục mới thành công.");
      }

      setIsDialogOpen(false);
      setEditingCategory(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể lưu danh mục");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (category: VehicleCategory) => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa danh mục "${category.name}"?`,
    );
    if (!confirmed) {
      return;
    }

    setDeletingCategoryId(category.id);
    setError(null);
    setSuccess(null);

    try {
      const result = await deleteVehicleCategoryAction(category.id);
      if (!result.ok) {
        throw new Error(result.error || "Xóa danh mục thất bại");
      }

      setSuccess("Đã xóa danh mục.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể xóa danh mục");
    } finally {
      setDeletingCategoryId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-on-surface">Danh mục xe</h1>
          <p className="text-sm text-secondary">
            Quản lý danh mục để dùng cho tạo/sửa xe trong admin.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateDialog}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary-container"
        >
          <Plus size={16} /> Thêm danh mục
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </div>
      )}

      <CategoryTable
        categories={sortedCategories}
        deletingCategoryId={deletingCategoryId}
        onEdit={openEditDialog}
        onDelete={handleDelete}
      />

      <CategoryFormDialog
        open={isDialogOpen}
        title={editingCategory ? "Chỉnh sửa danh mục" : "Tạo danh mục mới"}
        submitLabel={editingCategory ? "Lưu thay đổi" : "Tạo danh mục"}
        isSubmitting={isSubmitting}
        initialCategory={editingCategory}
        onClose={() => {
          if (isSubmitting) {
            return;
          }
          setIsDialogOpen(false);
          setEditingCategory(null);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
