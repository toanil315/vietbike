import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import BikesClient from "./bikes-client";
import { Vehicle, VehicleCategory } from "@/types";

export const metadata: Metadata = {
  title: "Browse Motorbikes for Rent in Vietnam",
  description:
    "Find your perfect ride from our curated fleet of premium motorbikes. Filter by city, type, price. Available in Hanoi, Da Nang, Ho Chi Minh City.",
};

interface BikesPageSearchParams {
  page?: string;
  pageSize?: string;
  categoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface BikesPagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

function parsePositiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

/** Check whether any filter params are active */
function hasActiveFilters(params: BikesPageSearchParams): boolean {
  return !!(
    params.categoryId ||
    params.minPrice ||
    params.maxPrice ||
    params.search ||
    params.sortBy
  );
}

async function fetchBikes(searchParams: BikesPageSearchParams): Promise<{
  vehicles: Vehicle[];
  pagination: BikesPagination;
  hasError: boolean;
}> {
  const page = parsePositiveInt(searchParams.page, 1);
  // Fetch more vehicles when showing sections (no active filters)
  const isFiltered = hasActiveFilters(searchParams);
  const pageSize = parsePositiveInt(
    searchParams.pageSize,
    isFiltered ? 12 : 50,
  );

  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  if (searchParams.categoryId)
    params.set("categoryId", searchParams.categoryId);
  if (searchParams.minPrice) params.set("minPrice", searchParams.minPrice);
  if (searchParams.maxPrice) params.set("maxPrice", searchParams.maxPrice);
  if (searchParams.search) params.set("search", searchParams.search);
  if (searchParams.sortBy) params.set("sortBy", searchParams.sortBy);
  if (searchParams.sortOrder) params.set("sortOrder", searchParams.sortOrder);

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    "http://localhost:5001";

  try {
    const response = await fetch(
      `${apiUrl}/public/vehicles?${params.toString()}`,
      { next: { revalidate: 300 } },
    );

    if (!response.ok) {
      return {
        vehicles: [],
        pagination: { page, pageSize, total: 0, totalPages: 1 },
        hasError: true,
      };
    }

    const payload = (await response.json()) as {
      success?: boolean;
      data?: {
        data?: Vehicle[];
        pagination?: BikesPagination;
      };
    };

    return {
      vehicles: payload?.data?.data || [],
      pagination: payload?.data?.pagination || {
        page,
        pageSize,
        total: 0,
        totalPages: 1,
      },
      hasError: false,
    };
  } catch {
    return {
      vehicles: [],
      pagination: { page, pageSize, total: 0, totalPages: 1 },
      hasError: true,
    };
  }
}

async function fetchVehicleCategories(): Promise<VehicleCategory[]> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    "http://localhost:5001";

  try {
    const response = await fetch(
      `${apiUrl}/admin/vehicle-categories?page=1&pageSize=200`,
      {
        next: { revalidate: 300 },
      },
    );

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as {
      success?: boolean;
      data?: {
        items?: VehicleCategory[];
        data?: VehicleCategory[];
      };
    };

    if (!payload.success) {
      return [];
    }

    return payload.data?.items || payload.data?.data || [];
  } catch {
    return [];
  }
}

export default async function BikesPage({
  searchParams,
}: {
  searchParams: Promise<BikesPageSearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const [{ vehicles, pagination, hasError }, categories] = await Promise.all([
    fetchBikes(resolvedSearchParams),
    fetchVehicleCategories(),
  ]);

  return (
    <div className="bg-surface-container/30 min-h-screen pb-20">
      {/* Breadcrumbs & Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-12">
        <nav className="flex items-center gap-2 text-xs font-medium text-secondary mb-6">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-on-surface">Our Bikes</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-4">
          Browse Our Motorbikes
        </h1>
        <p className="text-secondary max-w-2xl">
          Premium fleet curated for the urban explorer. Choose from
          high-performance cruisers to efficient city scooters.
        </p>
      </div>
      <BikesClient
        initialVehicles={vehicles}
        initialPagination={pagination}
        initialHasError={hasError}
        categoryOptions={categories.map((category) => ({
          id: category.id,
          name: category.name,
        }))}
      />
    </div>
  );
}
