"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Plus,
  Save,
  Trash2,
  Loader2,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";
import apiClient from "@/lib/api";
import { adminVehicleEndpoints } from "@/lib/api-endpoints";
import { Vehicle } from "@/types";
import {
  addVehicleFeatureAction,
  addVehicleImageAction,
  createVehicleAction,
  deleteVehicleFeatureAction,
  deleteVehicleImageAction,
  updateVehicleAction,
  updateVehicleStatusAction,
} from "@/app/admin/vehicles/actions";

interface ImageInput {
  id?: string;
  url: string;
  altText?: string;
}

interface FeatureInput {
  id?: string;
  featureName: string;
  featureValue: string;
}

const vehicleTypes = ["motorcycle", "scooter", "electric"] as const;
const categories = ["economy", "comfort", "premium"] as const;
const transmissions = ["manual", "automatic"] as const;
const statuses = ["available", "rented", "maintenance", "unavailable"] as const;

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function VehicleForm() {
  const router = useRouter();
  const params = useParams();
  const vehicleId = params?.id as string | undefined;
  const isEdit = Boolean(vehicleId);

  const [isLoadingVehicle, setIsLoadingVehicle] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    licensePlate: "",
    pricePerDay: 0,
    description: "",
    availableSeats: 2,
    fuelType: "petrol",
    transmission: "automatic" as (typeof transmissions)[number],
    type: "scooter" as (typeof vehicleTypes)[number],
    category: "economy" as (typeof categories)[number],
    status: "available" as (typeof statuses)[number],
  });

  const [images, setImages] = useState<ImageInput[]>([]);
  const [features, setFeatures] = useState<FeatureInput[]>([]);
  const [newImage, setNewImage] = useState({ url: "", altText: "" });
  const [newFeature, setNewFeature] = useState({
    featureName: "",
    featureValue: "",
  });

  useEffect(() => {
    const loadVehicle = async () => {
      if (!vehicleId) {
        return;
      }

      try {
        setIsLoadingVehicle(true);
        setError(null);

        const vehicle = await apiClient.get<Vehicle>(
          adminVehicleEndpoints.detail(vehicleId),
        );

        setFormData({
          name: vehicle.name,
          slug: vehicle.slug,
          brand: vehicle.brand,
          model: vehicle.model,
          year: vehicle.year,
          licensePlate: vehicle.licensePlate,
          pricePerDay: vehicle.pricePerDay,
          description: vehicle.description || "",
          availableSeats: vehicle.availableSeats,
          fuelType: vehicle.fuelType,
          transmission: vehicle.transmission,
          type: vehicle.type || "scooter",
          category: vehicle.category || "economy",
          status: vehicle.status,
        });

        setImages(
          (vehicle.images || []).map((img) => ({
            id: img.id,
            url: img.url,
            altText: img.altText || "",
          })),
        );

        setFeatures(
          (vehicle.features || []).map((feature) => ({
            id: feature.id,
            featureName: feature.featureName,
            featureValue: feature.featureValue,
          })),
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Khong the tai du lieu xe",
        );
      } finally {
        setIsLoadingVehicle(false);
      }
    };

    void loadVehicle();
  }, [vehicleId]);

  useEffect(() => {
    if (!isEdit) {
      setFormData((prev) => ({
        ...prev,
        slug: toSlug(prev.name),
      }));
    }
  }, [formData.name, isEdit]);

  const baseUpdatePayload = useMemo(
    () => ({
      name: formData.name,
      slug: formData.slug,
      brand: formData.brand,
      model: formData.model,
      year: Number(formData.year),
      licensePlate: formData.licensePlate,
      pricePerDay: Number(formData.pricePerDay),
      description: formData.description || undefined,
      availableSeats: Number(formData.availableSeats),
      fuelType: formData.fuelType,
      transmission: formData.transmission,
    }),
    [formData],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      if (isEdit && vehicleId) {
        const updated = await updateVehicleAction(vehicleId, baseUpdatePayload);
        if (!updated.ok) {
          throw new Error(updated.error || "Cap nhat xe that bai");
        }

        setSuccess("Cap nhat xe thanh cong.");
      } else {
        const created = await createVehicleAction({
          ...baseUpdatePayload,
          type: formData.type,
          category: formData.category,
          images: images
            .filter((img) => img.url.trim())
            .map((img) => ({
              url: img.url,
              altText: img.altText || undefined,
            })),
          features: features
            .filter(
              (feature) =>
                feature.featureName.trim() && feature.featureValue.trim(),
            )
            .map((feature) => ({
              featureName: feature.featureName,
              featureValue: feature.featureValue,
            })),
        });

        if (!created.ok) {
          throw new Error(created.error || "Tao xe moi that bai");
        }

        router.push("/admin/vehicles");
        return;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gui form that bai");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!vehicleId) {
      return;
    }

    setError(null);
    setSuccess(null);
    setIsUpdatingStatus(true);

    const result = await updateVehicleStatusAction(vehicleId, formData.status);
    setIsUpdatingStatus(false);

    if (!result.ok) {
      setError(result.error || "Cap nhat trang thai that bai");
      return;
    }

    setSuccess("Da cap nhat trang thai xe.");
  };

  const handleAddImage = async () => {
    if (!newImage.url.trim()) {
      return;
    }

    if (!vehicleId) {
      setImages((prev) => [
        ...prev,
        { url: newImage.url, altText: newImage.altText },
      ]);
      setNewImage({ url: "", altText: "" });
      return;
    }

    const result = await addVehicleImageAction(vehicleId, {
      url: newImage.url,
      altText: newImage.altText || undefined,
    });

    if (!result.ok) {
      setError(result.error || "Khong the them anh");
      return;
    }

    setImages((prev) => [
      ...prev,
      { id: result.data?.id, url: newImage.url, altText: newImage.altText },
    ]);
    setNewImage({ url: "", altText: "" });
  };

  const handleDeleteImage = async (image: ImageInput) => {
    if (!vehicleId || !image.id) {
      setImages((prev) => prev.filter((item) => item !== image));
      return;
    }

    const result = await deleteVehicleImageAction(vehicleId, image.id);
    if (!result.ok) {
      setError(result.error || "Khong the xoa anh");
      return;
    }

    setImages((prev) => prev.filter((item) => item.id !== image.id));
  };

  const handleAddFeature = async () => {
    if (!newFeature.featureName.trim() || !newFeature.featureValue.trim()) {
      return;
    }

    if (!vehicleId) {
      setFeatures((prev) => [...prev, { ...newFeature }]);
      setNewFeature({ featureName: "", featureValue: "" });
      return;
    }

    const result = await addVehicleFeatureAction(vehicleId, {
      featureName: newFeature.featureName,
      featureValue: newFeature.featureValue,
    });

    if (!result.ok) {
      setError(result.error || "Khong the them tinh nang");
      return;
    }

    setFeatures((prev) => [
      ...prev,
      {
        id: result.data?.id,
        featureName: newFeature.featureName,
        featureValue: newFeature.featureValue,
      },
    ]);
    setNewFeature({ featureName: "", featureValue: "" });
  };

  const handleDeleteFeature = async (feature: FeatureInput) => {
    if (!vehicleId || !feature.id) {
      setFeatures((prev) => prev.filter((item) => item !== feature));
      return;
    }

    const result = await deleteVehicleFeatureAction(vehicleId, feature.id);
    if (!result.ok) {
      setError(result.error || "Khong the xoa tinh nang");
      return;
    }

    setFeatures((prev) => prev.filter((item) => item.id !== feature.id));
  };

  if (isLoadingVehicle) {
    return (
      <div className="max-w-4xl mx-auto py-20 flex items-center justify-center gap-3 text-secondary">
        <Loader2 className="animate-spin" size={20} />
        <span>Dang tai du lieu xe...</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin/vehicles")}
            className="w-10 h-10 rounded-xl bg-white border border-outline-variant/20 flex items-center justify-center text-secondary hover:bg-surface-container transition-default"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-on-surface">
              {isEdit ? "Chinh sua xe" : "Tao xe moi"}
            </h1>
            <p className="text-secondary text-sm">
              {isEdit
                ? "Cap nhat thong tin xe va du lieu media"
                : "Tao xe moi theo contract backend"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/vehicles"
            className="px-5 py-2.5 rounded-xl border border-outline-variant/20 text-sm font-bold text-secondary hover:bg-surface-container transition-default"
          >
            Huy
          </Link>
          <button
            type="submit"
            form="vehicle-form"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-container transition-default shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-60"
          >
            {isSubmitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            {isEdit ? "Luu thay doi" : "Tao xe"}
          </button>
        </div>
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

      <form id="vehicle-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-3xl border border-outline-variant/10 p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="space-y-2 text-sm font-medium text-secondary">
            Ten xe
            <input
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-secondary">
            Slug
            <input
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
              value={formData.slug}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, slug: e.target.value }))
              }
              required
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-secondary">
            Hang xe
            <input
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
              value={formData.brand}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, brand: e.target.value }))
              }
              required
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-secondary">
            Dong xe
            <input
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
              value={formData.model}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, model: e.target.value }))
              }
              required
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-secondary">
            Nam san xuat
            <input
              type="number"
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
              value={formData.year}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  year: Number(e.target.value),
                }))
              }
              required
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-secondary">
            Bien so
            <input
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
              value={formData.licensePlate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  licensePlate: e.target.value,
                }))
              }
              required
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-secondary">
            Gia thue / ngay (VND)
            <input
              type="number"
              min={1}
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
              value={formData.pricePerDay}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  pricePerDay: Number(e.target.value),
                }))
              }
              required
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-secondary">
            So cho ngoi
            <input
              type="number"
              min={1}
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
              value={formData.availableSeats}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  availableSeats: Number(e.target.value),
                }))
              }
              required
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-secondary">
            Loai nhien lieu
            <input
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
              value={formData.fuelType}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, fuelType: e.target.value }))
              }
              required
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-secondary">
            Hop so
            <select
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
              value={formData.transmission}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  transmission: e.target
                    .value as (typeof transmissions)[number],
                }))
              }
            >
              {transmissions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium text-secondary">
            Loai xe
            <select
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
              value={formData.type}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  type: e.target.value as (typeof vehicleTypes)[number],
                }))
              }
              disabled={isEdit}
            >
              {vehicleTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium text-secondary">
            Phan khuc
            <select
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  category: e.target.value as (typeof categories)[number],
                }))
              }
              disabled={isEdit}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="md:col-span-2 space-y-2 text-sm font-medium text-secondary">
            Mo ta
            <textarea
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface min-h-28"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </label>
        </div>

        {isEdit && (
          <div className="bg-white rounded-3xl border border-outline-variant/10 p-6 space-y-3">
            <h3 className="font-bold text-on-surface">Trang thai xe</h3>
            <div className="flex items-center gap-3">
              <select
                className="rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value as (typeof statuses)[number],
                  }))
                }
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleStatusUpdate}
                disabled={isUpdatingStatus}
                className="px-4 py-2 rounded-xl bg-on-surface text-white text-sm font-bold hover:bg-on-surface/90 disabled:opacity-60"
              >
                {isUpdatingStatus ? "Dang cap nhat..." : "Cap nhat trang thai"}
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl border border-outline-variant/10 p-6 space-y-4">
          <h3 className="font-bold text-on-surface flex items-center gap-2">
            <ImageIcon size={16} /> Hinh anh
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr,auto] gap-3">
            <input
              className="rounded-xl border border-outline-variant/20 px-3 py-2"
              placeholder="Duong dan anh"
              value={newImage.url}
              onChange={(e) =>
                setNewImage((prev) => ({ ...prev, url: e.target.value }))
              }
            />
            <input
              className="rounded-xl border border-outline-variant/20 px-3 py-2"
              placeholder="Mo ta anh"
              value={newImage.altText}
              onChange={(e) =>
                setNewImage((prev) => ({ ...prev, altText: e.target.value }))
              }
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold"
            >
              <Plus size={14} className="inline mr-1" /> Them
            </button>
          </div>

          <div className="space-y-2">
            {images.length === 0 && (
              <p className="text-sm text-secondary">Chua co hinh anh.</p>
            )}
            {images.map((image, index) => (
              <div
                key={image.id || `${image.url}-${index}`}
                className="flex items-center justify-between rounded-xl border border-outline-variant/20 px-3 py-2"
              >
                <div className="truncate">
                  <p className="text-sm font-medium text-on-surface truncate">
                    {image.url}
                  </p>
                  {image.altText && (
                    <p className="text-xs text-secondary truncate">
                      {image.altText}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteImage(image)}
                  className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-outline-variant/10 p-6 space-y-4">
          <h3 className="font-bold text-on-surface flex items-center gap-2">
            <Sparkles size={16} /> Tinh nang
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr,auto] gap-3">
            <input
              className="rounded-xl border border-outline-variant/20 px-3 py-2"
              placeholder="Ten tinh nang"
              value={newFeature.featureName}
              onChange={(e) =>
                setNewFeature((prev) => ({
                  ...prev,
                  featureName: e.target.value,
                }))
              }
            />
            <input
              className="rounded-xl border border-outline-variant/20 px-3 py-2"
              placeholder="Gia tri tinh nang"
              value={newFeature.featureValue}
              onChange={(e) =>
                setNewFeature((prev) => ({
                  ...prev,
                  featureValue: e.target.value,
                }))
              }
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold"
            >
              <Plus size={14} className="inline mr-1" /> Them
            </button>
          </div>

          <div className="space-y-2">
            {features.length === 0 && (
              <p className="text-sm text-secondary">Chua co tinh nang.</p>
            )}
            {features.map((feature, index) => (
              <div
                key={feature.id || `${feature.featureName}-${index}`}
                className="flex items-center justify-between rounded-xl border border-outline-variant/20 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium text-on-surface">
                    {feature.featureName}
                  </p>
                  <p className="text-xs text-secondary">
                    {feature.featureValue}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteFeature(feature)}
                  className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
