"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Save,
  Upload,
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  Bike,
  DollarSign,
  FileText,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api";
import { adminBookingEndpoints } from "@/lib/api-endpoints";

export default function NewBookingForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    sourceApp: "Zalo",
    licensePlate: "",
    startDate: new Date().toISOString().slice(0, 16),
    durationDays: 1,
    amount: 0,
    deposit: 0,
    endDate: "",
    extension: "",
    notes: "",
    files: [] as File[],
  });

  // Calculate end date based on start date and duration
  useEffect(() => {
    if (formData.startDate && formData.durationDays) {
      const start = new Date(formData.startDate);
      const end = new Date(
        start.getTime() + formData.durationDays * 24 * 60 * 60 * 1000,
      );
      setFormData((prev) => ({
        ...prev,
        endDate: end.toISOString().slice(0, 16),
      }));
    }
  }, [formData.startDate, formData.durationDays]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const endpoint = adminBookingEndpoints.create();
      const payload = {
        customerName: formData.customerName,
        customerPhone: formData.phone,
        sourceApp: formData.sourceApp,
        licensePlate: formData.licensePlate,
        startDate: new Date(formData.startDate).toISOString(),
        rentalDays: formData.durationDays,
        totalAmount: formData.amount,
        depositAmount: formData.deposit,
        extensionInfo: formData.extension || undefined,
        note: formData.notes || undefined,
        documents: formData.files.map((file) => ({
          name: file.name,
          mimeType: file.type,
          sizeBytes: file.size,
        })),
      };

      await apiClient.post(endpoint, payload);
      router.push("/admin/bookings");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể tạo đơn đặt xe");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({ ...prev, files }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/bookings"
            className="p-2 rounded-xl border border-outline-variant/30 text-secondary hover:bg-surface-container transition-default"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-on-surface">
              Tạo đơn đặt xe thủ công
            </h1>
            <p className="text-sm text-secondary">
              Thêm yêu cầu thuê xe của khách vào hệ thống một cách thủ công
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/bookings")}
            className="px-6 py-2.5 rounded-xl border border-outline-variant/30 text-sm font-bold text-secondary hover:bg-surface-container transition-default"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-container transition-default"
          >
            <Save size={18} />
            <span>{isSubmitting ? "Đang lưu..." : "Lưu đơn đặt xe"}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer & Source */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
              <User size={14} />
              Thông tin khách hàng
            </h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface ml-1">
                  Tên khách hàng *
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Nhập tên khách hàng"
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        customerName: e.target.value,
                      }))
                    }
                    className="w-full pl-12 pr-4 py-3 bg-surface-container/30 border border-outline-variant/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface ml-1">
                  Số điện thoại
                </label>
                <div className="relative">
                  <Phone
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
                  />
                  <input
                    type="tel"
                    placeholder="0901234567"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="w-full pl-12 pr-4 py-3 bg-surface-container/30 border border-outline-variant/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
              <MessageSquare size={14} />
              Nguồn & Tham chiếu
            </h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface ml-1">
                  Ứng dụng nguồn
                </label>
                <select
                  value={formData.sourceApp}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      sourceApp: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 bg-surface-container/30 border border-outline-variant/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                >
                  <option>Zalo</option>
                  <option>WhatsApp</option>
                  <option>Facebook</option>
                  <option>Khách vãng lai (Trực tiếp)</option>
                  <option>Khác</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface ml-1">
                  Biển số xe *
                </label>
                <div className="relative">
                  <Bike
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
                  />
                  <input
                    type="text"
                    required
                    placeholder="59A1-12345"
                    value={formData.licensePlate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        licensePlate: e.target.value,
                      }))
                    }
                    className="w-full pl-12 pr-4 py-3 bg-surface-container/30 border border-outline-variant/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rental Period */}
        <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-sm space-y-6">
          <h3 className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
            <Calendar size={14} />
            Thời gian thuê
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface ml-1">
                Ngày bắt đầu *
              </label>
              <div className="relative">
                <Calendar
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
                />
                <input
                  type="datetime-local"
                  required
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                  className="w-full pl-12 pr-4 py-3 bg-surface-container/30 border border-outline-variant/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface ml-1">
                Số ngày thuê
              </label>
              <div className="relative">
                <Clock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
                />
                <input
                  type="number"
                  min="1"
                  value={formData.durationDays}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      durationDays: parseInt(e.target.value) || 1,
                    }))
                  }
                  className="w-full pl-12 pr-4 py-3 bg-surface-container/30 border border-outline-variant/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface ml-1">
                Ngày trả xe
              </label>
              <div className="relative">
                <Calendar
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
                />
                <input
                  type="datetime-local"
                  readOnly
                  value={formData.endDate}
                  className="w-full pl-12 pr-4 py-3 bg-surface-container/10 border border-outline-variant/10 rounded-2xl text-sm text-secondary cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Financials */}
        <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-sm space-y-6">
          <h3 className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
            <DollarSign size={14} />
            Thông tin tài chính
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface ml-1">
                Tổng số tiền (VNĐ)
              </label>
              <div className="relative">
                <DollarSign
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
                />
                <input
                  type="number"
                  placeholder="1000000"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      amount: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-full pl-12 pr-4 py-3 bg-surface-container/30 border border-outline-variant/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface ml-1">
                Số tiền đặt cọc (VNĐ)
              </label>
              <div className="relative">
                <DollarSign
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
                />
                <input
                  type="number"
                  placeholder="500000"
                  value={formData.deposit}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      deposit: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-full pl-12 pr-4 py-3 bg-surface-container/30 border border-outline-variant/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notes & Documents */}
        <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-sm space-y-6">
          <h3 className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
            <FileText size={14} />
            Thông tin bổ sung
          </h3>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface ml-1">
                Thông tin gia hạn
              </label>
              <input
                type="text"
                placeholder="Thêm ghi chú gia hạn..."
                value={formData.extension}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    extension: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 bg-surface-container/30 border border-outline-variant/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface ml-1">
                Ghi chú
              </label>
              <textarea
                rows={4}
                placeholder="Thêm hướng dẫn đặc biệt hoặc ghi chú về khách hàng..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
                className="w-full px-4 py-3 bg-surface-container/30 border border-outline-variant/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface ml-1">
                Giấy tờ (CCCD, Bằng lái, v.v.)
              </label>
              <div className="border-2 border-dashed border-outline-variant/20 rounded-3xl p-8 flex flex-col items-center justify-center gap-3 bg-surface-container/10 hover:bg-surface-container/20 transition-default cursor-pointer group">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                  <Upload size={24} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-on-surface">
                    Nhấp để tải lên hoặc kéo thả vào đây
                  </p>
                  <p className="text-xs text-secondary">
                    PNG, JPG hoặc PDF (tối đa 10MB)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2 flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-bold hover:bg-primary/20 transition-default"
                >
                  <Plus size={14} />
                  Chọn tệp
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".png,.jpg,.jpeg,.pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              {formData.files.length > 0 && (
                <p className="text-xs text-secondary">
                  Đã chọn {formData.files.length} tệp
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:bg-primary-container transition-default flex items-center justify-center gap-2"
        >
          <Plus size={24} />
          {isSubmitting ? "Đang tạo đơn..." : "Tạo đơn đặt xe"}
        </button>
      </form>
    </div>
  );
}
