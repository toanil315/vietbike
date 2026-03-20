'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, Star, Bike, ArrowRight } from 'lucide-react';
import { VEHICLES } from '@/data/mockData';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function BikesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filteredBikes = VEHICLES.filter(bike => {
    const matchesSearch = bike.name.toLowerCase().includes(search.toLowerCase()) || 
                          bike.brand.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || bike.category === category;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'scooter', 'sport', 'touring', 'off-road', 'classic'];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Fleet</h1>
        <p className="text-secondary">Choose the perfect ride for your Vietnamese adventure</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 space-y-8">
          <div className="space-y-4">
            <h3 className="font-bold flex items-center gap-2">
              <Search size={18} className="text-primary" /> Search
            </h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search bikes..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-outline-variant/30 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-default"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-primary" /> Categories
            </h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-default text-left capitalize",
                    category === cat 
                      ? "bg-primary text-white shadow-md shadow-primary/20" 
                      : "bg-white text-secondary hover:bg-surface-container"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Bike Grid */}
        <div className="flex-1">
          {filteredBikes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredBikes.map((bike) => (
                <Link 
                  key={bike.id} 
                  href={`/bikes/${bike.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden ambient-shadow transition-default hover:-translate-y-2"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={bike.image} 
                      alt={bike.name} 
                      className="w-full h-full object-cover transition-default group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">
                      {bike.category.toUpperCase()}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-xl group-hover:text-primary transition-default">{bike.name}</h3>
                      <div className="flex items-center gap-1 text-tertiary">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm font-bold">{bike.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 mb-6">
                      <div className="flex items-center gap-1 text-secondary text-xs">
                        <Bike size={14} />
                        <span>{bike.engineSize}</span>
                      </div>
                      <div className="flex items-center gap-1 text-secondary text-xs">
                        <SlidersHorizontal size={14} />
                        <span className="capitalize">{bike.type}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-outline-variant/15">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-secondary">Price per day</p>
                        <p className="font-bold text-2xl text-primary">{formatPrice(bike.pricePerDay)}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-default">
                        <ArrowRight size={24} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-20 text-center ambient-shadow">
              <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center text-secondary mx-auto mb-6">
                <Bike size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">No bikes found</h3>
              <p className="text-secondary">Try adjusting your search or filters to find what you're looking for.</p>
              <button 
                onClick={() => {setSearch(''); setCategory('all');}}
                className="mt-8 text-primary font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
