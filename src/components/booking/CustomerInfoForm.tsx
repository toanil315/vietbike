'use client';

import { User } from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';

export default function CustomerInfoForm() {
  const { customerInfo, setCustomerInfo } = useBookingStore();

  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-outline-variant/10 space-y-10">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <User size={24} />
        </div>
        <h2 className="text-2xl font-bold text-on-surface">Personal Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">Full Name</label>
          <input 
            type="text" 
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo({ name: e.target.value })}
            className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-4 px-5 text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">Email Address</label>
          <input 
            type="email" 
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({ email: e.target.value })}
            className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-4 px-5 text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">Phone Number</label>
          <input 
            type="tel" 
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo({ phone: e.target.value })}
            className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-4 px-5 text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="+84 123 456 789"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">Nationality</label>
          <input 
            type="text" 
            value={customerInfo.nationality}
            onChange={(e) => setCustomerInfo({ nationality: e.target.value })}
            className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-4 px-5 text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="e.g. United States"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">Driving License Number</label>
        <input 
          type="text" 
          value={customerInfo.licenseNumber}
          onChange={(e) => setCustomerInfo({ licenseNumber: e.target.value })}
          className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-4 px-5 text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          placeholder="Enter your license ID"
        />
      </div>
    </div>
  );
}
