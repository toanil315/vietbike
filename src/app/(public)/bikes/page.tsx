import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import BikesClient from "./bikes-client";
import { Vehicle } from "@/types";

export const metadata: Metadata = {
  title: "Browse Motorbikes for Rent in Vietnam",
  description:
    "Find your perfect ride from our curated fleet of premium motorbikes. Filter by city, type, price. Available in Hanoi, Da Nang, Ho Chi Minh City.",
};

interface BikesPageSearchParams {
  page?: string;
  pageSize?: string;
  type?: string;
  transmission?: string;
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

async function fetchBikes(searchParams: BikesPageSearchParams): Promise<{
  vehicles: Vehicle[];
  pagination: BikesPagination;
  hasError: boolean;
}> {
  const page = parsePositiveInt(searchParams.page, 1);
  const pageSize = parsePositiveInt(searchParams.pageSize, 12);

  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  if (searchParams.type) params.set("type", searchParams.type);
  if (searchParams.transmission)
    params.set("transmission", searchParams.transmission);
  if (searchParams.minPrice) params.set("minPrice", searchParams.minPrice);
  if (searchParams.maxPrice) params.set("maxPrice", searchParams.maxPrice);
  if (searchParams.search) params.set("search", searchParams.search);
  if (searchParams.sortBy) params.set("sortBy", searchParams.sortBy);
  if (searchParams.sortOrder) params.set("sortOrder", searchParams.sortOrder);

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    "http://localhost:5001";

  const response = await fetch(
    `${apiUrl}/public/vehicles?${params.toString()}`,
    {
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) {
    return {
      vehicles: [],
      pagination: {
        page,
        pageSize,
        total: 0,
        totalPages: 1,
      },
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
}

export default async function BikesPage({
  searchParams,
}: {
  searchParams: Promise<BikesPageSearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const { vehicles, pagination, hasError } =
    await fetchBikes(resolvedSearchParams);

  return (
    <div className="bg-surface-container/30 min-h-screen pb-20">
      {/* Breadcrumbs & Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-12">
        <nav className="flex items-center gap-2 text-xs font-medium text-secondary mb-6">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-on-surface">Bikes</span>
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
      />
    </div>
  );
}
