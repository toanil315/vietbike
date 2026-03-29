"use client";

import { ChevronDown } from "lucide-react";

interface BikeFilterBarProps {
  categoryId: string;
  setCategoryId: (v: string) => void;
  search: string;
  setSearch: (v: string) => void;
  minPrice: string;
  setMinPrice: (v: string) => void;
  maxPrice: string;
  setMaxPrice: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  categoryOptions: Array<{ id: string; name: string }>;
}

export default function BikeFilterBar({
  categoryId,
  setCategoryId,
  search,
  setSearch,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  categoryOptions,
}: BikeFilterBarProps) {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-outline-variant/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Category */}
      <div className="space-y-3">
        <label className="text-[11px] uppercase font-bold text-secondary tracking-widest ml-1">
          Category
        </label>
        <div className="relative">
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full appearance-none bg-surface-container/30 border border-outline-variant/20 rounded-2xl py-4 px-5 pr-12 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all hover:bg-surface-container/50"
          >
            <option value="">All categories</option>
            {categoryOptions.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[11px] uppercase font-bold text-secondary tracking-widest ml-1">
          Search
        </label>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tên xe, biển số..."
          className="w-full bg-surface-container/30 border border-outline-variant/20 rounded-2xl py-4 px-5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all hover:bg-surface-container/50"
        />
      </div>

      <div className="space-y-3">
        <label className="text-[11px] uppercase font-bold text-secondary tracking-widest ml-1">
          Price Range
        </label>
        <div className="grid grid-cols-2 gap-3">
          <input
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder="Min"
            className="w-full bg-surface-container/30 border border-outline-variant/20 rounded-2xl py-4 px-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10"
          />
          <input
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder="Max"
            className="w-full bg-surface-container/30 border border-outline-variant/20 rounded-2xl py-4 px-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10"
          />
        </div>
      </div>

      {/* Sort By */}
      <div className="space-y-3">
        <label className="text-[11px] uppercase font-bold text-secondary tracking-widest ml-1">
          Sort By
        </label>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full appearance-none bg-surface-container/30 border border-outline-variant/20 rounded-2xl py-4 px-5 pr-12 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all hover:bg-surface-container/50"
          >
            <option value="recommended">Recommended</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
          <ChevronDown
            size={18}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
