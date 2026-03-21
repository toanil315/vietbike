'use client';

import { Check, Package } from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import { ADDONS } from '@/data/mockData';
import { formatPrice, cn } from '@/lib/utils';

export default function AddonsSelector() {
  const { selectedAddons, toggleAddon } = useBookingStore();

  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-outline-variant/10 space-y-10">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <Package size={24} />
        </div>
        <h2 className="text-2xl font-bold text-on-surface">Select Add-ons</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ADDONS.map((addon) => (
          <button
            key={addon.id}
            onClick={() => toggleAddon(addon.id)}
            className={cn(
              "p-6 rounded-3xl border-2 text-left transition-all flex justify-between items-center group",
              selectedAddons.includes(addon.id) 
                ? "border-primary bg-primary/5 shadow-md shadow-primary/5" 
                : "border-outline-variant/10 hover:border-primary/30 bg-surface-container/30"
            )}
          >
            <div className="flex-1 pr-4">
              <p className="font-bold text-on-surface group-hover:text-primary transition-colors">{addon.name}</p>
              <p className="text-xs text-secondary mt-1">{addon.description}</p>
              <p className="text-sm font-bold text-primary mt-3">+{formatPrice(addon.price)}<span className="text-[10px] text-secondary font-medium">/day</span></p>
            </div>
            <div className={cn(
              "w-8 h-8 rounded-xl flex items-center justify-center transition-all",
              selectedAddons.includes(addon.id) ? "bg-primary text-white scale-110" : "bg-white text-secondary border border-outline-variant/20"
            )}>
              <Check size={18} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
