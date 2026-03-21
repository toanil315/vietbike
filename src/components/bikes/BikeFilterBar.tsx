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
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-outline-variant/10 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap items-end gap-6 md:gap-8">
      {/* City */}
      <div className="w-full lg:flex-1 min-w-0 md:min-w-[180px] space-y-3">
        <label className="text-[11px] uppercase font-bold text-secondary tracking-widest ml-1">Location</label>
        <div className="relative">
          <select 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full appearance-none bg-surface-container/30 border border-outline-variant/20 rounded-2xl py-4 px-5 pr-12 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all hover:bg-surface-container/50"
          >
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
        </div>
      </div>

      {/* Type */}
      <div className="w-full lg:flex-1 min-w-0 md:min-w-[180px] space-y-3">
        <label className="text-[11px] uppercase font-bold text-secondary tracking-widest ml-1">Type</label>
        <div className="relative">
          <select 
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full appearance-none bg-surface-container/30 border border-outline-variant/20 rounded-2xl py-4 px-5 pr-12 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all hover:bg-surface-container/50"
          >
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
        </div>
      </div>

      {/* Price Range */}
      <div className="w-full lg:flex-[1.8] min-w-0 md:min-w-[240px] space-y-4">
        <div className="flex justify-between items-center mb-1">
          <label className="text-[11px] uppercase font-bold text-secondary tracking-widest ml-1">Daily Budget</label>
          <span className="text-xs font-black text-primary bg-primary/10 px-3 py-1 rounded-full">$10 - ${priceRange}</span>
        </div>
        <div className="px-1">
          <input 
            type="range" 
            min="10" 
            max="250" 
            value={priceRange}
            onChange={(e) => setPriceRange(parseInt(e.target.value))}
            className="w-full h-2 bg-surface-container rounded-full appearance-none cursor-pointer accent-primary"
          />
        </div>
      </div>

      {/* Brand */}
      <div className="w-full lg:flex-1 min-w-0 md:min-w-[180px] space-y-3">
        <label className="text-[11px] uppercase font-bold text-secondary tracking-widest ml-1">Brand</label>
        <div className="relative">
          <select 
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full appearance-none bg-surface-container/30 border border-outline-variant/20 rounded-2xl py-4 px-5 pr-12 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all hover:bg-surface-container/50"
          >
            {brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
        </div>
      </div>

      {/* Transmission */}
      <div className="w-full sm:w-auto lg:shrink-0 space-y-3">
        <label className="text-[11px] uppercase font-bold text-secondary tracking-widest ml-1">Transmission</label>
        <div className="flex bg-surface-container/30 p-1.5 rounded-2xl border border-outline-variant/20">
          <button 
            onClick={() => setTransmission('Auto')}
            className={cn(
              "flex-1 px-6 py-2.5 rounded-xl text-xs font-black transition-all",
              transmission === 'Auto' ? "bg-primary text-white shadow-md shadow-primary/20 scale-105" : "text-secondary hover:text-on-surface"
            )}
          >
            Auto
          </button>
          <button 
            onClick={() => setTransmission('Manual')}
            className={cn(
              "flex-1 px-6 py-2.5 rounded-xl text-xs font-black transition-all",
              transmission === 'Manual' ? "bg-primary text-white shadow-md shadow-primary/20 scale-105" : "text-secondary hover:text-on-surface"
            )}
          >
            Manual
          </button>
        </div>
      </div>

      {/* Sort By */}
      <div className="w-full lg:flex-1 min-w-0 md:min-w-[180px] space-y-3">
        <label className="text-[11px] uppercase font-bold text-secondary tracking-widest ml-1">Sort By</label>
        <div className="relative">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full appearance-none bg-surface-container/30 border border-outline-variant/20 rounded-2xl py-4 px-5 pr-12 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all hover:bg-surface-container/50"
          >
            <option value="Recommended">Recommended</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
            <option value="Rating">Rating</option>
          </select>
          <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
