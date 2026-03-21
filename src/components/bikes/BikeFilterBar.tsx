'use client';

import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BikeFilterBarProps {
  city: string;
  setCity: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  brand: string;
  setBrand: (v: string) => void;
  transmission: 'Auto' | 'Manual';
  setTransmission: (v: 'Auto' | 'Manual') => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  priceRange: number;
  setPriceRange: (v: number) => void;
}

export default function BikeFilterBar({
  city,
  setCity,
  type,
  setType,
  brand,
  setBrand,
  transmission,
  setTransmission,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
}: BikeFilterBarProps) {
  const cities = ['All Cities', 'Ho Chi Minh', 'Hanoi', 'Da Nang'];
  const types = ['Select Types', 'Scooter', 'Sport', 'Off-road', 'Electric'];
  const brands = ['Any Brand', 'Honda', 'Yamaha', 'Vespa', 'VinFast', 'Kawasaki'];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-outline-variant/10 flex flex-wrap items-end gap-6">
      {/* City */}
      <div className="flex-1 min-w-[160px] space-y-2">
        <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">City</label>
        <div className="relative">
          <select 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full appearance-none bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
        </div>
      </div>

      {/* Type */}
      <div className="flex-1 min-w-[160px] space-y-2">
        <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">Type</label>
        <div className="relative">
          <select 
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full appearance-none bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
        </div>
      </div>

      {/* Price Range */}
      <div className="flex-[1.5] min-w-[200px] space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">Price per day</label>
          <span className="text-[10px] font-bold text-primary">$10 - ${priceRange}</span>
        </div>
        <input 
          type="range" 
          min="10" 
          max="250" 
          value={priceRange}
          onChange={(e) => setPriceRange(parseInt(e.target.value))}
          className="w-full h-1.5 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
        />
      </div>

      {/* Brand */}
      <div className="flex-1 min-w-[160px] space-y-2">
        <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">Brand</label>
        <div className="relative">
          <select 
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full appearance-none bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
        </div>
      </div>

      {/* Transmission */}
      <div className="space-y-2">
        <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">Transmission</label>
        <div className="flex bg-surface-container/50 p-1 rounded-xl border border-outline-variant/20">
          <button 
            onClick={() => setTransmission('Auto')}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-bold transition-all",
              transmission === 'Auto' ? "bg-primary text-white shadow-sm" : "text-secondary hover:text-on-surface"
            )}
          >
            Auto
          </button>
          <button 
            onClick={() => setTransmission('Manual')}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-bold transition-all",
              transmission === 'Manual' ? "bg-primary text-white shadow-sm" : "text-secondary hover:text-on-surface"
            )}
          >
            Manual
          </button>
        </div>
      </div>

      {/* Sort By */}
      <div className="flex-1 min-w-[160px] space-y-2">
        <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">Sort By</label>
        <div className="relative">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full appearance-none bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="Recommended">Recommended</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
            <option value="Rating">Rating</option>
          </select>
          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
