"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  ChevronLeft,
  Upload,
  Plus,
  X,
  Info,
  DollarSign,
  MapPin,
  Image as ImageIcon,
  Zap,
  FileText,
  CheckCircle2,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { VehicleType, VehicleCategory, Vehicle } from "@/types";
import Image from "next/image";

export default function VehicleForm() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;
  const isEdit = Boolean(id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    type: "automatic" as VehicleType,
    category: "scooter" as VehicleCategory,
    engineSize: "",
    pricePerDay: 0,
    weeklyRate: 0,
    monthlyRate: 0,
    location: "",
    status: "available",
    description: "",
    features: [] as string[],
    images: [] as string[],
  });

  const categories: VehicleCategory[] = [
    "scooter",
    "sport",
    "touring",
    "off-road",
    "classic",
  ];
  const types: VehicleType[] = [
    "automatic",
    "manual",
    "semi-automatic",
    "electric",
  ];
  const commonFeatures = [
    "Phanh ABS",
    "Giá đỡ điện thoại",
    "Cổng sạc USB",
    "Thùng đồ sau",
    "Thùng đồ hông",
    "Sưởi tay lái",
    "Đèn pha LED",
    "Khóa thông minh",
  ];

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    router.push("/admin/vehicles");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/vehicles")}
            className="w-10 h-10 rounded-xl bg-white border border-outline-variant/20 flex items-center justify-center text-secondary hover:bg-surface-container transition-default"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <nav className="flex items-center gap-2 text-xs font-medium text-secondary mb-1">
              <Link
                href="/admin"
                className="hover:text-primary transition-colors"
              >
                Đội xe
              </Link>
              <ChevronLeft size={10} className="rotate-180" />
              <span className="text-on-surface">
                {isEdit ? "Chỉnh sửa xe" : "Thêm xe mới"}
              </span>
            </nav>
            <h1 className="text-3xl font-bold text-on-surface">
              {isEdit ? "Chỉnh sửa xe" : "Thêm xe mới"}
            </h1>
            <p className="text-secondary text-sm">
              {isEdit
                ? `Đang cập nhật ${formData.name}`
                : "Nhập các thông số kỹ thuật và giá thuê để thêm xe mới vào hệ thống."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 rounded-xl bg-white border border-outline-variant/20 text-sm font-bold text-secondary hover:bg-surface-container transition-default">
            {isEdit ? "Khôi phục thay đổi" : "Lưu bản nháp"}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-container transition-default shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <CheckCircle2 size={18} />
            )}
            {isEdit ? "Cập nhật xe" : "Đăng ký xe"}
          </button>
        </div>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Information */}
          <section className="bg-white rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm space-y-8">
            <div className="flex items-center gap-3 pb-6 border-b border-outline-variant/10">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Info size={20} />
              </div>
              <div>
                <h2 className="font-bold text-on-surface">Thông tin cơ bản</h2>
                <p className="text-xs text-secondary uppercase font-bold tracking-widest">
                  Phần 01
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary">
                  Tên hiển thị của xe
                </label>
                <input
                  type="text"
                  placeholder="ví dụ: Honda XR 150L Dual Sport"
                  className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary">
                    Thương hiệu
                  </label>
                  <input
                    type="text"
                    placeholder="ví dụ: Honda"
                    className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary">
                    Dòng xe
                  </label>
                  <input
                    type="text"
                    placeholder="ví dụ: XR 150"
                    className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={formData.model}
                    onChange={(e) =>
                      setFormData({ ...formData, model: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary">
                    Năm sản xuất
                  </label>
                  <input
                    type="number"
                    placeholder="2024"
                    className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        year: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary">
                    Phân khúc xe
                  </label>
                  <select
                    className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as VehicleCategory,
                      })
                    }
                  >
                    <option value="scooter">Xe tay ga</option>
                    <option value="sport">Xe thể thao</option>
                    <option value="touring">Xe đường trường</option>
                    <option value="off-road">Xe địa hình</option>
                    <option value="classic">Xe cổ điển</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary">
                    Loại xe
                  </label>
                  <select
                    className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as VehicleType,
                      })
                    }
                  >
                    <option value="automatic">Xe ga</option>
                    <option value="manual">Xe côn tay</option>
                    <option value="semi-automatic">Xe số</option>
                    <option value="electric">Xe điện</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary">
                    Dung tích động cơ
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="ví dụ: 150"
                      className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 pr-12"
                      value={formData.engineSize}
                      onChange={(e) =>
                        setFormData({ ...formData, engineSize: e.target.value })
                      }
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-secondary">
                      cc
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Vehicle Gallery */}
          <section className="bg-white rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm space-y-8">
            <div className="flex items-center gap-3 pb-6 border-b border-outline-variant/10">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <ImageIcon size={20} />
              </div>
              <div>
                <h2 className="font-bold text-on-surface">Thư viện hình ảnh</h2>
                <p className="text-xs text-secondary uppercase font-bold tracking-widest">
                  Phần 02
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-2 border-dashed border-outline-variant/30 rounded-3xl p-12 text-center space-y-4 hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-surface-container rounded-2xl flex items-center justify-center mx-auto group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Upload size={32} />
                </div>
                <div>
                  <p className="font-bold text-on-surface">
                    Tải lên ảnh chất lượng cao
                  </p>
                  <p className="text-xs text-secondary">
                    Kéo thả tệp PNG hoặc JPG vào đây (Tối đa 5MB mỗi tệp)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-outline-variant/10 group">
                  <img
                    src="https://picsum.photos/seed/bike-add/400/400"
                    alt="Preview"
                    className="w-full h-full object-cover"
                    width={800}
                    height={600}
                  />
                  <div className="absolute top-2 left-2 bg-primary text-white text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">
                    Ảnh bìa
                  </div>
                  <button className="absolute top-2 right-2 w-6 h-6 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-error opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={14} />
                  </button>
                </div>
                <button className="aspect-square rounded-2xl border-2 border-dashed border-outline-variant/20 flex flex-col items-center justify-center gap-2 text-secondary hover:border-primary/30 hover:text-primary transition-all">
                  <Plus size={24} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Thêm ảnh
                  </span>
                </button>
              </div>
            </div>
          </section>

          {/* Key Features & Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/10">
                <Zap size={18} className="text-primary" />
                <h2 className="font-bold text-on-surface">Tiện ích đi kèm</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {commonFeatures.map((feature) => (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => handleFeatureToggle(feature)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                      formData.features.includes(feature)
                        ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                        : "bg-surface-container/50 text-secondary border-outline-variant/20 hover:border-primary/30",
                    )}
                  >
                    {feature}
                  </button>
                ))}
                <button className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-primary border border-dashed border-primary/30 flex items-center gap-1">
                  <Plus size={14} />
                  Tuỳ chỉnh
                </button>
              </div>
            </section>

            <section className="bg-white rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/10">
                <FileText size={18} className="text-primary" />
                <h2 className="font-bold text-on-surface">Mô tả chi tiết</h2>
              </div>
              <textarea
                placeholder="Viết một bản mô tả hấp dẫn để thu hút khách hàng thuê xe..."
                className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-4 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 h-40 resize-none"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <div className="flex items-center gap-2 text-[10px] font-bold text-secondary uppercase tracking-widest">
                <Info size={12} />
                Thông tin này sẽ hiển thị công khai trên trang đặt xe của khách
                hàng
              </div>
            </section>
          </div>
        </div>

        <div className="space-y-8">
          {/* Rental Pricing */}
          <section className="bg-white rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm space-y-8">
            <div className="flex items-center gap-3 pb-6 border-b border-outline-variant/10">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <DollarSign size={20} />
              </div>
              <h2 className="font-bold text-on-surface">Bảng giá thuê (VNĐ)</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary">
                  Giá theo ngày
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="250,000"
                    className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 pr-16"
                    value={formData.pricePerDay}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pricePerDay: parseInt(e.target.value),
                      })
                    }
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-secondary uppercase">
                    VNĐ/Ngày
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary">
                  Giá theo tuần
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="1,500,000"
                    className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 pr-16"
                    value={formData.weeklyRate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        weeklyRate: parseInt(e.target.value),
                      })
                    }
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-secondary uppercase">
                    VNĐ/Tuần
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary">
                  Giá theo tháng
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="5,500,000"
                    className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 pr-16"
                    value={formData.monthlyRate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        monthlyRate: parseInt(e.target.value),
                      })
                    }
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-secondary uppercase">
                    VNĐ/Tháng
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Location & Status */}
          <section className="bg-white rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm space-y-8">
            <div className="flex items-center gap-3 pb-6 border-b border-outline-variant/10">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <h2 className="font-bold text-on-surface">
                Địa điểm & Trạng thái
              </h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary">
                  Chi nhánh quản lý
                </label>
                <select
                  className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                >
                  <option value="">Chọn chi nhánh</option>
                  <option value="Hanoi Old Quarter">Phố Cổ Hà Nội</option>
                  <option value="Da Nang Beach">Biển Đà Nẵng</option>
                  <option value="HCM District 1">HCM Quận 1</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary">
                  Trạng thái kho
                </label>
                <select
                  className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="available">Sẵn sàng cho thuê</option>
                  <option value="maintenance">Đang bảo trì</option>
                  <option value="unavailable">Ngưng hoạt động</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <input
                  type="checkbox"
                  id="featured"
                  className="w-5 h-5 rounded border-outline-variant/30 text-primary focus:ring-primary"
                />
                <label
                  htmlFor="featured"
                  className="text-sm font-bold text-on-surface"
                >
                  Đánh dấu là xe nổi bật
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-64 right-0 bg-white/80 backdrop-blur-md border-t border-outline-variant/10 p-4 flex items-center justify-between z-10 px-12">
        <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Systems Ready • 14:42
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/vehicles")}
            className="text-sm font-bold text-secondary hover:text-on-surface transition-colors"
          >
            Hủy bỏ thay đổi
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-10 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-container transition-default shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {isSubmitting
              ? "Đang xử lý..."
              : isEdit
                ? "Cập nhật xe"
                : "Đăng ký xe"}
          </button>
        </div>
      </div>
    </div>
  );
}
