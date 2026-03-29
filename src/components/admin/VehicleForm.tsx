"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import {
  adminVehicleCategoryEndpoints,
  adminVehicleEndpoints,
} from "@/lib/api-endpoints";
import { vehicleCreateSchema } from "@/lib/validation";
import { Vehicle, VehicleCategory } from "@/types";
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
const transmissions = ["manual", "automatic"] as const;
const statuses = ["available", "rented", "maintenance", "unavailable"] as const;

const vehicleFormSchema = vehicleCreateSchema.extend({
  status: z.enum(statuses),
  images: z
    .array(
      z.object({
        id: z.string().optional(),
        url: z.string().trim().min(1, "Image URL is required"),
        altText: z.string().optional(),
      }),
    )
    .default([]),
  features: z
    .array(
      z.object({
        id: z.string().optional(),
        featureName: z.string().trim().min(1, "Feature name is required"),
        featureValue: z.string().trim().min(1, "Feature value is required"),
      }),
    )
    .default([]),
});

type VehicleFormValues = z.input<typeof vehicleFormSchema>;

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
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [categoryOptions, setCategoryOptions] = useState<VehicleCategory[]>([]);
  const [newImage, setNewImage] = useState({ url: "", altText: "" });
  const [newFeature, setNewFeature] = useState({
    featureName: "",
    featureValue: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
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
      transmission: "automatic",
      type: "scooter",
      categoryId: "",
      status: "available",
      images: [],
      features: [],
    },
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
    keyName: "fieldKey",
  });

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: "features",
    keyName: "fieldKey",
  });

  const watchedName = watch("name");
  const watchedStatus = watch("status");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const response = await apiClient.get<
          | { items?: VehicleCategory[]; data?: VehicleCategory[] }
          | VehicleCategory[]
        >(`${adminVehicleCategoryEndpoints.list()}?page=1&pageSize=200`);

        const categories = Array.isArray(response)
          ? response
          : response.items || response.data || [];

        setCategoryOptions(categories);

        if (!isEdit && !getValues("categoryId") && categories[0]?.id) {
          setValue("categoryId", categories[0].id);
        }
      } catch {
        setCategoryOptions([]);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    void loadCategories();
  }, [getValues, isEdit, setValue]);

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

        reset({
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
          categoryId: vehicle.categoryId || "",
          status: vehicle.status,
          images: (vehicle.images || []).map((img) => ({
            id: img.id,
            url: img.url,
            altText: img.altText || "",
          })),
          features: (vehicle.features || []).map((feature) => ({
            id: feature.id,
            featureName: feature.featureName,
            featureValue: feature.featureValue,
          })),
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Khong the tai du lieu xe",
        );
      } finally {
        setIsLoadingVehicle(false);
      }
    };

    void loadVehicle();
  }, [vehicleId, reset]);

  useEffect(() => {
    if (!isEdit) {
      setValue("slug", toSlug(watchedName || ""));
    }
  }, [watchedName, isEdit, setValue]);

  const onSubmit = handleSubmit(async (values) => {
    setError(null);
    setSuccess(null);

    try {
      if (isEdit && vehicleId) {
        const updated = await updateVehicleAction(vehicleId, {
          name: values.name,
          slug: values.slug,
          brand: values.brand,
          model: values.model,
          year: Number(values.year),
          licensePlate: values.licensePlate,
          pricePerDay: Number(values.pricePerDay),
          description: values.description || undefined,
          availableSeats: Number(values.availableSeats),
          fuelType: values.fuelType,
          transmission: values.transmission,
          categoryId: values.categoryId,
        });

        if (!updated.ok) {
          throw new Error(updated.error || "Cap nhat xe that bai");
        }

        setSuccess("Cap nhat xe thanh cong.");
        return;
      }

      const created = await createVehicleAction({
        name: values.name,
        slug: values.slug,
        brand: values.brand,
        model: values.model,
        year: Number(values.year),
        licensePlate: values.licensePlate,
        pricePerDay: Number(values.pricePerDay),
        description: values.description || undefined,
        availableSeats: Number(values.availableSeats),
        fuelType: values.fuelType,
        transmission: values.transmission,
        type: values.type,
        categoryId: values.categoryId,
        images: (values.images || []).map((image) => ({
          url: image.url,
          altText: image.altText || undefined,
        })),
        features: (values.features || []).map((feature) => ({
          featureName: feature.featureName,
          featureValue: feature.featureValue,
        })),
      });

      if (!created.ok) {
        throw new Error(created.error || "Tao xe moi that bai");
      }

      router.push("/admin/vehicles");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gui form that bai");
    }
  });

  const handleStatusUpdate = async () => {
    if (!vehicleId) {
      return;
    }

    setError(null);
    setSuccess(null);
    setIsUpdatingStatus(true);

    const result = await updateVehicleStatusAction(
      vehicleId,
      watchedStatus || "available",
    );
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

    setError(null);

    if (!vehicleId) {
      appendImage({
        url: newImage.url.trim(),
        altText: newImage.altText.trim(),
      });
      setNewImage({ url: "", altText: "" });
      return;
    }

    const result = await addVehicleImageAction(vehicleId, {
      url: newImage.url.trim(),
      altText: newImage.altText.trim() || undefined,
    });

    if (!result.ok) {
      setError(result.error || "Khong the them anh");
      return;
    }

    appendImage({
      id: result.data?.id,
      url: newImage.url.trim(),
      altText: newImage.altText.trim(),
    });
    setNewImage({ url: "", altText: "" });
  };

  const handleDeleteImage = async (index: number, image: ImageInput) => {
    if (!vehicleId || !image.id) {
      removeImage(index);
      return;
    }

    const result = await deleteVehicleImageAction(vehicleId, image.id);
    if (!result.ok) {
      setError(result.error || "Khong the xoa anh");
      return;
    }

    removeImage(index);
  };

  const handleAddFeature = async () => {
    if (!newFeature.featureName.trim() || !newFeature.featureValue.trim()) {
      return;
    }

    setError(null);

    if (!vehicleId) {
      appendFeature({
        featureName: newFeature.featureName.trim(),
        featureValue: newFeature.featureValue.trim(),
      });
      setNewFeature({ featureName: "", featureValue: "" });
      return;
    }

    const result = await addVehicleFeatureAction(vehicleId, {
      featureName: newFeature.featureName.trim(),
      featureValue: newFeature.featureValue.trim(),
    });

    if (!result.ok) {
      setError(result.error || "Khong the them tinh nang");
      return;
    }

    appendFeature({
      id: result.data?.id,
      featureName: newFeature.featureName.trim(),
      featureValue: newFeature.featureValue.trim(),
    });
    setNewFeature({ featureName: "", featureValue: "" });
  };

  const handleDeleteFeature = async (index: number, feature: FeatureInput) => {
    if (!vehicleId || !feature.id) {
      removeFeature(index);
      return;
    }

    const result = await deleteVehicleFeatureAction(vehicleId, feature.id);
    if (!result.ok) {
      setError(result.error || "Khong the xoa tinh nang");
      return;
    }

    removeFeature(index);
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

      <form id="vehicle-form" onSubmit={onSubmit} className="space-y-6">
        <div className="bg-white rounded-3xl border border-outline-variant/10 p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="space-y-2 text-sm font-medium text-secondary">
            Ten xe
            <input
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
              placeholder="VD: Honda Vision 2024"
              {...register("name")}
              required
            />
            {errors.name && (
              <span className="text-xs text-red-600">
                {errors.name.message}
              </span>
            )}
          </label>

          <label className="space-y-2 text-sm font-medium text-secondary">
            Slug
            <input
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
              placeholder="honda-vision-2024"
              {...register("slug")}
              required
            />
            {errors.slug && (
              <span className="text-xs text-red-600">
                {errors.slug.message}
              </span>
            )}
          </label>

          <label className="space-y-2 text-sm font-medium text-secondary">
            Hang xe
            <input
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
              placeholder="VD: Honda"
              {...register("brand")}
              required
            />
            {errors.brand && (
              <span className="text-xs text-red-600">
                {errors.brand.message}
              </span>
            )}
          </label>

          <label className="space-y-2 text-sm font-medium text-secondary">
            Dong xe
            <input
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
              placeholder="VD: Vision"
              {...register("model")}
              required
            />
            {errors.model && (
              <span className="text-xs text-red-600">
                {errors.model.message}
              </span>
            )}
          </label>

          <label className="space-y-2 text-sm font-medium text-secondary">
            Nam san xuat
            <input
              type="number"
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
              placeholder="2026"
              {...register("year", { valueAsNumber: true })}
              required
            />
            {errors.year && (
              <span className="text-xs text-red-600">
                {errors.year.message}
              </span>
            )}
          </label>

          <label className="space-y-2 text-sm font-medium text-secondary">
            Bien so
            <input
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
              placeholder="VD: 59A1-12345"
              {...register("licensePlate")}
              required
            />
            {errors.licensePlate && (
              <span className="text-xs text-red-600">
                {errors.licensePlate.message}
              </span>
            )}
          </label>

          <label className="space-y-2 text-sm font-medium text-secondary">
            Gia thue / ngay (VND)
            <input
              type="number"
              min={1}
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
              placeholder="VD: 350000"
              {...register("pricePerDay", { valueAsNumber: true })}
              required
            />
            {errors.pricePerDay && (
              <span className="text-xs text-red-600">
                {errors.pricePerDay.message}
              </span>
            )}
          </label>

          <label className="space-y-2 text-sm font-medium text-secondary">
            So cho ngoi
            <input
              type="number"
              min={1}
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
              placeholder="VD: 2"
              {...register("availableSeats", { valueAsNumber: true })}
              required
            />
            {errors.availableSeats && (
              <span className="text-xs text-red-600">
                {errors.availableSeats.message}
              </span>
            )}
          </label>

          <label className="space-y-2 text-sm font-medium text-secondary">
            Loai nhien lieu
            <input
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
              placeholder="VD: petrol"
              {...register("fuelType")}
              required
            />
            {errors.fuelType && (
              <span className="text-xs text-red-600">
                {errors.fuelType.message}
              </span>
            )}
          </label>

          <label className="space-y-2 text-sm font-medium text-secondary">
            Hop so
            <select
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
              {...register("transmission")}
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
              {...register("type")}
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
              {...register("categoryId")}
              disabled={isLoadingCategories || categoryOptions.length === 0}
            >
              {isLoadingCategories && (
                <option value="">Dang tai danh muc...</option>
              )}
              {!isLoadingCategories && categoryOptions.length === 0 && (
                <option value="">Chua co danh muc</option>
              )}
              {!isLoadingCategories &&
                categoryOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
            {errors.categoryId && (
              <span className="text-xs text-red-600">
                {errors.categoryId.message}
              </span>
            )}
          </label>

          <label className="md:col-span-2 space-y-2 text-sm font-medium text-secondary">
            Mo ta
            <textarea
              className="w-full rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface min-h-28"
              placeholder="Mo ta ngan gon ve xe, tinh trang, luu y su dung..."
              {...register("description")}
            />
            {errors.description && (
              <span className="text-xs text-red-600">
                {errors.description.message}
              </span>
            )}
          </label>
        </div>

        {isEdit && (
          <div className="bg-white rounded-3xl border border-outline-variant/10 p-6 space-y-3">
            <h3 className="font-bold text-on-surface">Trang thai xe</h3>
            <div className="flex items-center gap-3">
              <select
                className="rounded-xl border border-outline-variant/20 px-3 py-2 text-on-surface"
                {...register("status")}
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
            {imageFields.length === 0 && (
              <p className="text-sm text-secondary">Chua co hinh anh.</p>
            )}
            {imageFields.map((image, index) => (
              <div
                key={image.fieldKey}
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
                  onClick={() => handleDeleteImage(index, image as ImageInput)}
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
            {featureFields.length === 0 && (
              <p className="text-sm text-secondary">Chua co tinh nang.</p>
            )}
            {featureFields.map((feature, index) => (
              <div
                key={feature.fieldKey}
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
                  onClick={() =>
                    handleDeleteFeature(index, feature as FeatureInput)
                  }
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
