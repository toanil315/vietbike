"use client";

import { useState } from "react";
import { LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react";
import { useVehicles } from "@/hooks/useVehicles";
import { cn } from "@/lib/utils";
import BikeFilterBar from "@/components/bikes/BikeFilterBar";
import BikeGrid from "@/components/bikes/BikeGrid";

export default function BikesClient() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All Cities");
  const [type, setType] = useState("Select Types");
  const [brand, setBrand] = useState("Any Brand");
  const [transmission, setTransmission] = useState<"Auto" | "Manual">("Auto");
  const [sortBy, setSortBy] = useState("Recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch vehicles from API with pagination
  const {
    data: vehicles,
    isLoading,
    error,
    pagination,
  } = useVehicles({
    page: currentPage,
    limit: 12,
    type: type === "Select Types" ? undefined : type.toLowerCase(),
    transmission: transmission === "Auto" ? "automatic" : "manual",
    priceMax: priceRange * 100000,
  });

  function renderVehicleCards() {
    if (isLoading) {
      return <VehiclesLoading />;
    }

    if (error) {
      return <VehiclesError error={error} />;
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
            setCity("All Cities");
            setType("Select Types");
            setBrand("Any Brand");
            setPriceRange(250);
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
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
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
                  onClick={() => setCurrentPage(pageNum)}
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
                  onClick={() => setCurrentPage(pagination.pages)}
                  className="w-10 h-10 rounded-xl bg-white border border-outline-variant/10 flex items-center justify-center text-secondary hover:bg-surface-container transition-colors font-bold"
                >
                  {pagination.pages}
                </button>
              </>
            )}

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(pagination.pages, p + 1))
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

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
        <BikeFilterBar
          city={city}
          setCity={setCity}
          type={type}
          setType={setType}
          brand={brand}
          setBrand={setBrand}
          transmission={transmission}
          setTransmission={setTransmission}
          sortBy={sortBy}
          setSortBy={setSortBy}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-6 flex justify-between items-center">
        {renderViewModeToggle()}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {renderVehicleCards()}
      </div>

      {renderPagination()}
    </>
  );
}

function VehiclesLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-surface-container rounded-2xl h-64 animate-pulse"
        />
      ))}
    </div>
  );
}

function VehiclesError({ error }: { error: any }) {
  return (
    <div className="bg-white rounded-3xl p-20 text-center border border-outline-variant/10">
      <h3 className="text-2xl font-bold mb-2">Failed to load bikes</h3>
      <p className="text-secondary mb-8">{error.userMessage}</p>
      <button
        onClick={() => window.location.reload()}
        className="text-primary font-bold hover:underline py-2 px-4 rounded"
      >
        Try again
      </button>
    </div>
  );
}
