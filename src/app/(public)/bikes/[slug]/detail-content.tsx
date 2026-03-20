'use client';

import { useRouter } from 'next/navigation';
import { Star, Shield, Check, ArrowLeft } from 'lucide-react';
import { VEHICLES } from '@/data/mockData';
import { formatPrice } from '@/lib/utils';
import { useBookingStore } from '@/store/bookingStore';

export default function BikeDetailContent({ slug }: { slug: string }) {
  const router = useRouter();
  const setVehicle = useBookingStore((state) => state.setVehicle);
  
  const bike = VEHICLES.find(v => v.slug === slug);

  if (!bike) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Bike not found</h1>
        <button onClick={() => router.push('/bikes')} className="text-primary font-bold">Back to fleet</button>
      </div>
    );
  }

  const handleBookNow = () => {
    setVehicle(bike);
    router.push('/booking');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-secondary hover:text-primary transition-default mb-8 font-medium"
      >
        <ArrowLeft size={20} /> Back to fleet
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Gallery */}
        <div className="space-y-6">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden ambient-shadow">
            <img 
              src={bike.image} 
              alt={bike.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {bike.images.map((img, i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden ambient-shadow cursor-pointer hover:opacity-80 transition-default">
                <img src={img} alt={`${bike.name} ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {bike.category}
              </span>
              <div className="flex items-center gap-1 text-tertiary">
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-bold">{bike.rating} ({bike.reviewCount} reviews)</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{bike.name}</h1>
            <p className="text-secondary leading-relaxed">{bike.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-surface-container p-4 rounded-2xl">
              <p className="text-[10px] uppercase font-bold text-secondary mb-1">Engine</p>
              <p className="font-bold">{bike.engineSize}</p>
            </div>
            <div className="bg-surface-container p-4 rounded-2xl">
              <p className="text-[10px] uppercase font-bold text-secondary mb-1">Type</p>
              <p className="font-bold capitalize">{bike.type}</p>
            </div>
            <div className="bg-surface-container p-4 rounded-2xl">
              <p className="text-[10px] uppercase font-bold text-secondary mb-1">Fuel Capacity</p>
              <p className="font-bold">{bike.specs.fuelCapacity}</p>
            </div>
            <div className="bg-surface-container p-4 rounded-2xl">
              <p className="text-[10px] uppercase font-bold text-secondary mb-1">Top Speed</p>
              <p className="font-bold">{bike.specs.topSpeed}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {bike.features.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-secondary">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Check size={12} />
                  </div>
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-8 rounded-3xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-secondary">Daily Rental Price</p>
                <p className="text-3xl font-bold text-primary">{formatPrice(bike.pricePerDay)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-secondary flex items-center justify-end gap-1">
                  <Shield size={12} /> Insurance Included
                </p>
              </div>
            </div>
            
            <button 
              onClick={handleBookNow}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-primary-container transition-default ambient-shadow"
            >
              Book This Bike
            </button>
            
            <p className="text-center text-xs text-secondary">
              No hidden fees. Free cancellation up to 24h before pickup.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
