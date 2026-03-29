"use client";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Download,
  Upload,
} from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import { Vehicle, VehicleStatus } from "@/types";
import { updateVehicleStatusAction } from "@/app/admin/vehicles/actions";

interface VehicleTableProps {
  initialVehicles: Vehicle[];
  initialPagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  initialFilters: {
    search: string;
    status: string;
    categoryId: string;
  };
  categoryOptions: Array<{ id: string; name: string }>;
}

/**
 * Admin vehicle management table with API integration
 */
export default function VehicleTable({
  initialVehicles,
  initialPagination,
  initialFilters,
  categoryOptions,
}: VehicleTableProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState(initialFilters.search);
  const [statusFilter, setStatusFilter] = useState(initialFilters.status);
  const [categoryFilter, setCategoryFilter] = useState(
    initialFilters.categoryId,
  );
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);

  useEffect(() => {
    setSearch(initialFilters.search);
    setStatusFilter(initialFilters.status);
    setCategoryFilter(initialFilters.categoryId);
  }, [initialFilters.search, initialFilters.status, initialFilters.categoryId]);

  const statusColors: Record<VehicleStatus, string> = {
    available: "bg-emerald-100 text-emerald-700",
    rented: "bg-blue-100 text-blue-700",
    maintenance: "bg-orange-100 text-orange-700",
    unavailable: "bg-slate-100 text-slate-700",
  };

  const updateQueryParams = useCallback(
    (overrides: Record<string, string | number | undefined>) => {
      const params = new URLSearchParams();

      const nextSearch =
        overrides.search !== undefined
          ? String(overrides.search)
          : (search ?? "");
      const nextStatus =
        overrides.status !== undefined
          ? String(overrides.status)
          : (statusFilter ?? "");
      const nextType =
        overrides.categoryId !== undefined
          ? String(overrides.categoryId)
          : (categoryFilter ?? "");
      const nextPage =
        overrides.page !== undefined
          ? Number(overrides.page)
          : initialPagination.page;

      if (nextSearch) params.set("search", nextSearch);
      if (nextStatus) params.set("status", nextStatus);
      if (nextType) params.set("categoryId", nextType);
      params.set("page", String(Math.max(1, nextPage)));
      params.set("pageSize", String(initialPagination.pageSize));

      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [
      search,
      statusFilter,
      categoryFilter,
      initialPagination.page,
      initialPagination.pageSize,
      pathname,
      router,
    ],
  );

  const applyFilters = useCallback(() => {
    updateQueryParams({
      search,
      status: statusFilter,
      categoryId: categoryFilter,
      page: 1,
    });
  }, [search, statusFilter, categoryFilter, updateQueryParams]);

  /**
   * Handle previous page
   */
  const handlePreviousPage = useCallback(() => {
    updateQueryParams({ page: Math.max(1, initialPagination.page - 1) });
  }, [initialPagination.page, updateQueryParams]);

  /**
   * Handle next page
   */
  const handleNextPage = useCallback(() => {
    if (initialPagination.page >= initialPagination.totalPages) {
      return;
    }
    updateQueryParams({ page: initialPagination.page + 1 });
  }, [initialPagination.page, initialPagination.totalPages, updateQueryParams]);

  const showingFrom =
    initialPagination.total === 0
      ? 0
      : (initialPagination.page - 1) * initialPagination.pageSize + 1;
  const showingTo =
    initialPagination.total === 0
      ? 0
      : Math.min(
          initialPagination.page * initialPagination.pageSize,
          initialPagination.total,
        );

  const handleStatusChange = useCallback(
    async (vehicleId: string, status: VehicleStatus) => {
      setUpdatingStatusId(vehicleId);
      await updateVehicleStatusAction(vehicleId, status);
      setUpdatingStatusId(null);
    },
    [],
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-on-surface">Danh sách xe</h1>
          <p className="text-secondary">
            Quản lý đội xe và tình trạng sẵn có của bạn.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-outline-variant/20 text-sm font-bold text-secondary hover:bg-surface-container transition-default">
            <Upload size={18} />
            Nhập CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-outline-variant/20 text-sm font-bold text-secondary hover:bg-surface-container transition-default">
            <Download size={18} />
            Xuất file
          </button>
          <Link
            href="/admin/vehicles/new"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-container transition-default shadow-lg shadow-primary/20"
          >
            <Plus size={18} />
            Thêm xe mới
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-60 relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
            />
            <input
              type="text"
              placeholder="Tìm theo tên, biển số hoặc ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  applyFilters();
                }
              }}
              className="w-full pl-12 pr-4 py-3 bg-surface-container/50 border border-outline-variant/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="available">Available</option>
            <option value="rented">Rented</option>
            <option value="maintenance">Maintenance</option>
            <option value="unavailable">Unavailable</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none"
          >
            <option value="">Tất cả danh mục</option>
            {categoryOptions.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={applyFilters}
            className="p-3 rounded-xl bg-surface-container/50 border border-outline-variant/20 text-secondary hover:text-primary transition-default"
          >
            <Filter size={18} />
          </button>

          <button
            type="button"
            onClick={applyFilters}
            className="px-4 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-container transition-default"
          >
            Áp dụng
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-outline-variant/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container/30 border-b border-outline-variant/10">
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">
                  <input
                    type="checkbox"
                    className="rounded border-outline-variant/30 text-primary focus:ring-primary"
                  />
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">
                  Thông tin xe
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">
                  Loại xe
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">
                  Biển số
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">
                  Địa điểm
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest text-right">
                  Giá thuê ngày
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest text-right">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {initialVehicles.map((vehicle) => (
                <tr
                  key={vehicle.id}
                  className="hover:bg-surface-container/20 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-outline-variant/30 text-primary focus:ring-primary"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-outline-variant/10 shrink-0">
                        <img
                          src={
                            vehicle.images?.[0]?.url ||
                            "https://picsum.photos/seed/vehicle/200/200"
                          }
                          alt={vehicle.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          width={800}
                          height={600}
                        />
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">
                          {vehicle.name}
                        </p>
                        <p className="text-[10px] text-secondary font-medium uppercase tracking-tighter">
                          ID: {vehicle.id.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-md bg-surface-container text-[10px] font-bold text-secondary uppercase tracking-wider">
                      {vehicle.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-on-surface">
                    {vehicle.licensePlate || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary">N/A</td>
                  <td className="px-6 py-4 text-sm font-bold text-on-surface text-right">
                    {formatPrice(vehicle.pricePerDay)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        statusColors[vehicle.status],
                      )}
                    >
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/vehicles/${vehicle.id}`}
                        className="p-2 rounded-lg text-secondary hover:bg-primary/10 hover:text-primary transition-default"
                      >
                        <MoreVertical size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-surface-container/10 border-t border-outline-variant/10 flex items-center justify-between">
          <p className="text-sm text-secondary">
            Đang hiển thị{" "}
            <span className="font-bold text-on-surface">
              {showingFrom}-{showingTo}
            </span>{" "}
            trên tổng số{" "}
            <span className="font-bold text-on-surface">
              {initialPagination.total}
            </span>
          </p>
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-lg border border-outline-variant/20 text-secondary hover:bg-white transition-default disabled:opacity-50"
              onClick={handlePreviousPage}
              disabled={initialPagination.page <= 1}
            >
              <ChevronLeft size={18} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-primary text-white text-sm font-bold">
              {initialPagination.page}
            </button>
            <span className="text-sm text-secondary font-medium">
              / {Math.max(1, initialPagination.totalPages)}
            </span>
            <button
              className="p-2 rounded-lg border border-outline-variant/20 text-secondary hover:bg-white transition-default disabled:opacity-50"
              onClick={handleNextPage}
              disabled={initialPagination.page >= initialPagination.totalPages}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
