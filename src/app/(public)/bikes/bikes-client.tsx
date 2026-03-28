"use client";

import { useMemo, useState } from "react";
import {
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  Crown,
  Bike,
  Zap,
  Fuel,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import BikeFilterBar from "@/components/bikes/BikeFilterBar";
import BikeGrid from "@/components/bikes/BikeGrid";
import VehicleSection from "@/components/bikes/VehicleSection";
import { Vehicle } from "@/types";

interface BikesPagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

interface GroupedSection {
  categoryName: string;
  categoryId: string;
  description: string | null;
  vehicles: Vehicle[];
}

interface BikesClientProps {
  initialVehicles: Vehicle[];
  initialPagination: BikesPagination;
  initialHasError: boolean;
  isFiltered: boolean;
  groupedSections: GroupedSection[] | null;
}

/**
 * Derive section icon from real backend category name
 */
function getSectionIcon(categoryName: string) {
  const lower = categoryName.toLowerCase();
  if (lower.includes("premium")) return <Crown size={18} />;
  if (lower.includes("electric")) return <Zap size={18} />;
  if (lower.includes("50cc")) return <Fuel size={18} />;
  return <Bike size={18} />;
}

export default function BikesClient({
  initialVehicles,
  initialPagination,
  initialHasError,
  isFiltered,
  groupedSections,
}: BikesClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const brand = searchParams.get("brand") || "Any Brand";
  const type = searchParams.get("type")
    ? `${searchParams.get("type")!.charAt(0).toUpperCase()}${searchParams
        .get("type")!
        .slice(1)}`
    : "Select Types";
  const transmission: "Auto" | "Manual" =
    searchParams.get("transmission") === "manual" ? "Manual" : "Auto";
  const priceRange = Math.max(
    1,
    Math.floor((Number(searchParams.get("maxPrice")) || 1000000) / 100000),
  );
  const sortBy = (() => {
    const sortByParam = searchParams.get("sortBy");
    const sortOrderParam = searchParams.get("sortOrder");

    if (sortByParam === "pricePerDay" && sortOrderParam === "asc") {
      return "Price: Low to High";
    }
    if (sortByParam === "pricePerDay" && sortOrderParam === "desc") {
      return "Price: High to Low";
    }
    if (sortByParam === "rating") {
      return "Rating";
    }

    return "Recommended";
  })();

  const currentPage = useMemo(() => {
    const pageValue = Number.parseInt(searchParams.get("page") || "1", 10);
    return Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1;
  }, [searchParams]);

  const vehicles = initialVehicles;
  const pagination = {
    page: initialPagination.page,
    pages: initialPagination.totalPages,
    total: initialPagination.total,
  };

  const hasError = initialHasError;

  function updateRoute(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
        return;
      }

      params.set(key, value);
    });

    if (!updates.page) {
      params.set("page", "1");
    }

    const nextQuery = params.toString();
    router.push(nextQuery ? `${pathname}?${nextQuery}` : pathname);
  }

  function handleBrandChange(value: string) {
    updateRoute({
      brand: value === "Any Brand" ? undefined : value,
      page: "1",
    });
  }

  function handleTypeChange(value: string) {
    updateRoute({
      type: value === "Select Types" ? undefined : value.toLowerCase(),
      page: "1",
    });
  }

  function handleTransmissionChange(value: "Auto" | "Manual") {
    updateRoute({
      transmission: value === "Auto" ? "automatic" : "manual",
      page: "1",
    });
  }

  function handlePriceRangeChange(value: number) {
    updateRoute({
      maxPrice: (value * 100000).toString(),
      page: "1",
    });
  }

  function handleSortByChange(value: string) {
    if (value === "Price: Low to High") {
      updateRoute({ sortBy: "pricePerDay", sortOrder: "asc", page: "1" });
      return;
    }

    if (value === "Price: High to Low") {
      updateRoute({ sortBy: "pricePerDay", sortOrder: "desc", page: "1" });
      return;
    }

    if (value === "Rating") {
      updateRoute({ sortBy: "rating", sortOrder: "desc", page: "1" });
      return;
    }

    updateRoute({ sortBy: undefined, sortOrder: undefined, page: "1" });
  }

  function handlePageChange(page: number) {
    updateRoute({ page: page.toString() });
  }

  /** Section-based view: renders each category from real API data */
  function renderSectionView() {
    if (!groupedSections || groupedSections.length === 0) {
      return renderNoResults();
    }

    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 divide-y divide-outline-variant/10">
        {groupedSections.map((section) => (
          <VehicleSection
            key={section.categoryId}
            icon={getSectionIcon(section.categoryName)}
            sectionLabel="OUR BIKES"
            title={section.categoryName}
            subtitle={section.description || ""}
            vehicles={section.vehicles}
            viewAllHref={`/bikes?categoryId=${section.categoryId}`}
            viewAllLabel={`View Full ${section.categoryName}`}
          />
        ))}
      </div>
    );
  }

  /** Flat grid view when filters are active */
  function renderFilteredView() {
    if (hasError) {
      return <VehiclesError />;
    }

    if (vehicles.length > 0) {
      return <BikeGrid bikes={vehicles} viewMode={viewMode} />;
    }

    return renderNoResults();
  }

  function renderNoResults() {
    return (
      <div className="bg-white rounded-3xl p-20 text-center border border-outline-variant/10">
        <h3 className="text-2xl font-bold mb-2">No motorbikes found</h3>
        <p className="text-secondary">
          Try adjusting your filters to find your perfect ride.
        </p>
        <button
          onClick={() => {
            updateRoute({
              brand: undefined,
              type: undefined,
              categoryId: undefined,
              transmission: undefined,
              minPrice: undefined,
              maxPrice: undefined,
              sortBy: undefined,
              sortOrder: undefined,
              page: "1",
            });
          }}
          className="mt-8 text-primary font-bold hover:underline py-2 px-4 rounded"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  function renderViewModeToggle() {
    return (
      <div className="flex bg-white p-1 rounded-lg border border-outline-variant/10 shadow-sm">
        <button
          onClick={() => setViewMode("grid")}
          className={cn(
            "p-2 rounded-md transition-all",
            viewMode === "grid"
              ? "bg-primary text-white"
              : "text-secondary hover:bg-surface-container",
          )}
          title="Grid view"
        >
          <LayoutGrid size={18} />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={cn(
            "p-2 rounded-md transition-all",
            viewMode === "list"
              ? "bg-primary text-white"
              : "text-secondary hover:bg-surface-container",
          )}
          title="List view"
        >
          <List size={18} />
        </button>
      </div>
    );
  }

  function renderPagination() {
    return (
      vehicles.length > 0 &&
      pagination &&
      pagination.pages > 1 && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 flex justify-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-xl bg-white border border-outline-variant/10 flex items-center justify-center text-secondary hover:bg-surface-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>

            {[...Array(Math.min(pagination.pages, 5))].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-colors",
                    currentPage === pageNum
                      ? "bg-primary text-white shadow-md shadow-primary/10"
                      : "bg-white border border-outline-variant/10 text-secondary hover:bg-surface-container",
                  )}
                >
                  {pageNum}
                </button>
              );
            })}

            {pagination.pages > 5 && (
              <>
                <span className="px-2 text-secondary">...</span>
                <button
                  onClick={() => handlePageChange(pagination.pages)}
                  className="w-10 h-10 rounded-xl bg-white border border-outline-variant/10 flex items-center justify-center text-secondary hover:bg-surface-container transition-colors font-bold"
                >
                  {pagination.pages}
                </button>
              </>
            )}

            <button
              onClick={() =>
                handlePageChange(Math.min(pagination.pages, currentPage + 1))
              }
              disabled={currentPage === pagination.pages}
              className="w-10 h-10 rounded-xl bg-white border border-outline-variant/10 flex items-center justify-center text-secondary hover:bg-surface-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )
    );
  }

  // Section-based view for unfiltered, flat grid for filtered
  if (!isFiltered) {
    return (
      <>
        {/* Filter bar at top — entering any filter switches to flat grid */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
          <BikeFilterBar
            type={type}
            setType={handleTypeChange}
            brand={brand}
            setBrand={handleBrandChange}
            transmission={transmission}
            setTransmission={handleTransmissionChange}
            sortBy={sortBy}
            setSortBy={handleSortByChange}
            priceRange={priceRange}
            setPriceRange={handlePriceRangeChange}
          />
        </div>

        {hasError ? (
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <VehiclesError />
          </div>
        ) : (
          renderSectionView()
        )}
      </>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
        <BikeFilterBar
          type={type}
          setType={handleTypeChange}
          brand={brand}
          setBrand={handleBrandChange}
          transmission={transmission}
          setTransmission={handleTransmissionChange}
          sortBy={sortBy}
          setSortBy={handleSortByChange}
          priceRange={priceRange}
          setPriceRange={handlePriceRangeChange}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-6 flex justify-between items-center">
        {renderViewModeToggle()}
        {pagination && (
          <span className="text-sm text-secondary font-medium">
            {pagination.total} bikes found
          </span>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {renderFilteredView()}
      </div>

      {renderPagination()}
    </>
  );
}

function VehiclesError() {
  return (
    <div className="bg-white rounded-3xl p-20 text-center border border-outline-variant/10">
      <h3 className="text-2xl font-bold mb-2">Failed to load bikes</h3>
      <p className="text-secondary mb-8">
        Please try reloading or adjusting your current filters.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="text-primary font-bold hover:underline py-2 px-4 rounded"
      >
        Try again
      </button>
    </div>
  );
}
