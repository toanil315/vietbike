'use client';

import { MapPin } from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import { LOCATIONS } from '@/data/mockData';

export default function LocationSelector() {
  const { pickupLocation, dropoffLocation, setLocations } = useBookingStore();

  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-outline-variant/10 space-y-10">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <MapPin size={24} />
        </div>
        <h2 className="text-2xl font-bold text-on-surface">Pickup & Dropoff</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">Pickup Location</label>
          <select 
            value={pickupLocation}
            onChange={(e) => setLocations(e.target.value, dropoffLocation)}
            className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-4 px-5 text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
          >
            <option value="">Select location</option>
            {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">Dropoff Location</label>
          <select 
            value={dropoffLocation}
            onChange={(e) => setLocations(pickupLocation, e.target.value)}
            className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-4 px-5 text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
          >
            <option value="">Select location</option>
            {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
