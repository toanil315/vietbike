'use client';

import { Star, ShieldCheck } from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import { ADDONS } from '@/data/mockData';
import { formatPrice } from '@/lib/utils';
import { Vehicle } from '@/types';
import Image from 'next/image';

interface BookingSummaryProps {
  vehicle: Vehicle;
  calculateTotal: () => number;
}

export default function BookingSummary({ vehicle, calculateTotal }: BookingSummaryProps) {
  const { selectedAddons, voucherCode, setVoucherCode, startDate, endDate } = useBookingStore();

  const getDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  };

  const days = getDays();

  return (
    <aside className="sticky top-8 space-y-6">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-outline-variant/10 space-y-8 text-on-surface">
        <h3 className="text-xl font-bold">Booking Summary</h3>
        
        <div className="flex gap-4 pb-8 border-b border-outline-variant/10">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border border-outline-variant/10 shrink-0">
            <Image src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" width={800} height={600} referrerPolicy="no-referrer" />
          </div>
          <div>
            <p className="font-bold text-lg">{vehicle.name}</p>
            <p className="text-xs text-secondary font-medium uppercase tracking-wider mt-1">{vehicle.brand} • {vehicle.engineSize}</p>
            <div className="flex items-center gap-1 text-tertiary mt-2">
              <Star size={14} fill="currentColor" />
              <span className="text-xs font-bold">{vehicle.rating}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-secondary font-medium">Rental ({days} {days === 1 ? 'day' : 'days'})</span>
            <span className="font-bold">{formatPrice(vehicle.pricePerDay * days)}</span>
          </div>
          
          {selectedAddons.length > 0 && (
            <div className="space-y-3 pt-2">
              <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Add-ons</p>
              {selectedAddons.map(id => {
                const addon = ADDONS.find(a => a.id === id);
                return (
                  <div key={id} className="flex justify-between items-center text-sm">
                    <span className="text-secondary font-medium">{addon?.name}</span>
                    <span className="font-bold">{formatPrice((addon?.price || 0) * days)}</span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="pt-6 border-t border-outline-variant/10 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">Total Amount</p>
              <p className="text-3xl font-bold text-primary">{formatPrice(calculateTotal())}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">All Taxes Incl.</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">Voucher Code</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              className="flex-1 bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="VELO10"
            />
            <button className="bg-on-surface text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-on-surface/90 transition-all">Apply</button>
          </div>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="bg-white rounded-3xl p-6 border border-outline-variant/10 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
          <ShieldCheck size={28} />
        </div>
        <div>
          <h4 className="font-bold text-on-surface text-sm">Secure Checkout</h4>
          <p className="text-xs text-secondary">SSL Encrypted Transaction</p>
        </div>
      </div>
    </aside>
  );
}
