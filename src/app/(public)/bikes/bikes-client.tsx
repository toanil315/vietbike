'use client';

import { useState, useMemo } from 'react';
import { LayoutGrid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { VEHICLES } from '@/data/mockData';
import { cn } from '@/lib/utils';
import BikeFilterBar from '@/components/bikes/BikeFilterBar';
import BikeGrid from '@/components/bikes/BikeGrid';

export default function BikesClient() {
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('All Cities');
  const [type, setType] = useState('Select Types');
  const [brand, setBrand] = useState('Any Brand');
  const [transmission, setTransmission] = useState<'Auto' | 'Manual'>('Auto');
  const [sortBy, setSortBy] = useState('Recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState(250);

  const filteredBikes = useMemo(() => {
    return VEHICLES.filter(bike => {
      const matchesSearch = bike.name.toLowerCase().includes(search.toLowerCase()) || 
                            bike.brand.toLowerCase().includes(search.toLowerCase());
      const matchesCity = city === 'All Cities' || (bike.location && bike.location.includes(city));
      const matchesType = type === 'Select Types' || bike.category.toLowerCase() === type.toLowerCase();
      const matchesBrand = brand === 'Any Brand' || bike.brand.toLowerCase() === brand.toLowerCase();
      const matchesTransmission = (transmission === 'Auto' && (bike.type === 'automatic' || bike.type === 'semi-automatic')) ||
                                  (transmission === 'Manual' && bike.type === 'manual');
      const matchesPrice = bike.pricePerDay <= priceRange;
      
      return matchesSearch && matchesCity && matchesType && matchesBrand && matchesTransmission && matchesPrice;
    });
  }, [search, city, type, brand, transmission, priceRange]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
        <BikeFilterBar 
          city={city} setCity={setCity}
          type={type} setType={setType}
          brand={brand} setBrand={setBrand}
          transmission={transmission} setTransmission={setTransmission}
          sortBy={sortBy} setSortBy={setSortBy}
          priceRange={priceRange} setPriceRange={setPriceRange}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-6 flex justify-between items-center">
        <p className="text-sm text-secondary">
          Showing <span className="font-bold text-on-surface">{filteredBikes.length}</span> of <span className="font-bold text-on-surface">{VEHICLES.length}</span> bikes
        </p>
        <div className="flex bg-white p-1 rounded-lg border border-outline-variant/10 shadow-sm">
          <button 
            onClick={() => setViewMode('grid')}
            className={cn(
              "p-2 rounded-md transition-all",
              viewMode === 'grid' ? "bg-primary text-white" : "text-secondary hover:bg-surface-container"
            )}
            title="Grid view"
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={cn(
              "p-2 rounded-md transition-all",
              viewMode === 'list' ? "bg-primary text-white" : "text-secondary hover:bg-surface-container"
            )}
            title="List view"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {filteredBikes.length > 0 ? (
          <BikeGrid bikes={filteredBikes} viewMode={viewMode} />
        ) : (
          <div className="bg-white rounded-3xl p-20 text-center border border-outline-variant/10">
            <h3 className="text-2xl font-bold mb-2">No motorbikes found</h3>
            <p className="text-secondary">Try adjusting your filters to find your perfect ride.</p>
            <button 
              onClick={() => {
                setCity('All Cities');
                setType('Select Types');
                setBrand('Any Brand');
                setPriceRange(250);
              }}
              className="mt-8 text-primary font-bold hover:underline py-2 px-4 rounded"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {filteredBikes.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 flex justify-center">
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-xl bg-white border border-outline-variant/10 flex items-center justify-center text-secondary hover:bg-surface-container transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow-md shadow-primary/10">
              1
            </button>
            <button className="w-10 h-10 rounded-xl bg-white border border-outline-variant/10 flex items-center justify-center text-secondary hover:bg-surface-container transition-colors font-bold">
              2
            </button>
            <button className="w-10 h-10 rounded-xl bg-white border border-outline-variant/10 flex items-center justify-center text-secondary hover:bg-surface-container transition-colors font-bold">
              3
            </button>
            <span className="px-2 text-secondary">...</span>
            <button className="w-10 h-10 rounded-xl bg-white border border-outline-variant/10 flex items-center justify-center text-secondary hover:bg-surface-container transition-colors font-bold">
              12
            </button>
            <button className="w-10 h-10 rounded-xl bg-white border border-outline-variant/10 flex items-center justify-center text-secondary hover:bg-surface-container transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
