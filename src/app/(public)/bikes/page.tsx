import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Heart, 
  ChevronDown, 
  LayoutGrid, 
  List, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { VEHICLES } from '@/data/mockData';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export default function BikesPage() {
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

  const cities = ['All Cities', 'Ho Chi Minh', 'Hanoi', 'Da Nang'];
  const types = ['Select Types', 'Scooter', 'Sport', 'Off-road', 'Electric'];
  const brands = ['Any Brand', 'Honda', 'Yamaha', 'Vespa', 'VinFast', 'Kawasaki'];

  return (
    <div className="bg-surface-container/30 min-h-screen pb-20">
      {/* Breadcrumbs & Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-12">
        <nav className="flex items-center gap-2 text-xs font-medium text-secondary mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-on-surface">Bikes</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-4">Browse Our Motorbikes</h1>
        <p className="text-secondary max-w-2xl">
          Premium fleet curated for the urban explorer. Choose from high-performance cruisers to efficient city scooters.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
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
      </div>

      {/* Results Info & View Toggle */}
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
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={cn(
              "p-2 rounded-md transition-all",
              viewMode === 'list' ? "bg-primary text-white" : "text-secondary hover:bg-surface-container"
            )}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Bike Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {filteredBikes.length > 0 ? (
          <div className={cn(
            "grid gap-8",
            viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          )}>
            {filteredBikes.map((bike, index) => (
              <motion.div
                key={bike.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "group bg-white rounded-3xl overflow-hidden border border-outline-variant/10 hover:border-primary/30 transition-all duration-300",
                  viewMode === 'grid' ? "flex flex-col" : "flex flex-col md:flex-row"
                )}
              >
                {/* Image Container */}
                <div className={cn(
                  "relative overflow-hidden",
                  viewMode === 'grid' ? "h-64" : "h-64 md:h-auto md:w-80"
                )}>
                  <img 
                    src={bike.image} 
                    alt={bike.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-bold text-primary uppercase tracking-wider shadow-sm">
                      {bike.category}
                    </span>
                  </div>
                  <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-secondary hover:text-primary transition-colors shadow-sm">
                    <Heart size={20} />
                  </button>
                </div>

                {/* Content Container */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                      {bike.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-tertiary/10 px-2 py-1 rounded-lg text-tertiary">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-bold">{bike.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-secondary text-sm mb-6">
                    <MapPin size={14} className="text-primary" />
                    <span>{bike.location || 'Vietnam'}</span>
                  </div>

                  <div className="mt-auto pt-6 border-t border-outline-variant/10 flex justify-between items-center">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-on-surface">{formatPrice(bike.pricePerDay)}</span>
                        <span className="text-xs text-secondary font-medium">/day</span>
                      </div>
                    </div>
                    <Link 
                      to={`/bikes/${bike.slug}`}
                      className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary-container transition-colors shadow-md shadow-primary/10"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
              className="mt-8 text-primary font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
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
    </div>
  );
}
