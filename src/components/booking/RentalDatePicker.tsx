'use client';

import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function RentalDatePicker() {
  const { startDate, endDate, setDates } = useBookingStore();
  const [days, setDays] = useState(0);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays);
    } else {
      setDays(0);
    }
  }, [startDate, endDate]);

  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-outline-variant/10 space-y-10 text-on-surface">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary">
          <Calendar size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Rental Period</h2>
          <p className="text-sm text-secondary">Select when you want to start and end your trip</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-full space-y-2">
          <label className="text-[10px] uppercase font-bold text-secondary tracking-wider ml-1">Pick-up Date</label>
          <div className="relative group">
            <Calendar size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors" />
            <input 
              type="date" 
              value={startDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDates(e.target.value, endDate)}
              className="w-full pl-14 pr-5 py-4 bg-surface-container/50 border border-outline-variant/20 rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center pt-6">
          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary">
            <ArrowRight size={20} />
          </div>
        </div>

        <div className="w-full space-y-2">
          <label className="text-[10px] uppercase font-bold text-secondary tracking-wider ml-1">Return Date</label>
          <div className="relative group">
            <Calendar size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors" />
            <input 
              type="date" 
              value={endDate}
              min={startDate || new Date().toISOString().split('T')[0]}
              onChange={(e) => setDates(startDate, e.target.value)}
              className="w-full pl-14 pr-5 py-4 bg-surface-container/50 border border-outline-variant/20 rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            />
          </div>
        </div>
      </div>

      {days > 0 && (
        <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10 animate-in fade-in slide-in-from-top-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-on-surface">Total Duration: {days} {days === 1 ? 'day' : 'days'}</p>
            <p className="text-xs text-secondary">Price will be calculated based on {days} {days === 1 ? 'day' : 'days'} of rental.</p>
          </div>
        </div>
      )}
    </div>
  );
}
