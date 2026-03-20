'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle2, QrCode, Download, Share2, Home, Bike } from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import { motion } from 'motion/react';

export default function ConfirmationContent() {
  const router = useRouter();
  const { vehicle, customerInfo, resetBooking } = useBookingStore();

  const handleDone = () => {
    resetBooking();
    router.push('/');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h1 className="text-4xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-secondary">Your adventure starts soon. We've sent the details to your email.</p>
      </div>

      <div className="glass rounded-3xl overflow-hidden ambient-shadow">
        <div className="bg-primary p-8 text-white flex justify-between items-center">
          <div>
            <p className="text-xs opacity-70 uppercase font-bold tracking-widest mb-1">Booking Reference</p>
            <h2 className="text-2xl font-mono font-bold">VB-8829-XQ</h2>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-70 uppercase font-bold tracking-widest mb-1">Status</p>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">CONFIRMED</span>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-lg border-b border-outline-variant/15 pb-2">Vehicle Details</h3>
              <div className="flex gap-4">
                <img src={vehicle?.image} alt={vehicle?.name} className="w-20 h-20 rounded-xl object-cover" referrerPolicy="no-referrer" />
                <div>
                  <p className="font-bold">{vehicle?.name}</p>
                  <p className="text-sm text-secondary">{vehicle?.engineSize} • {vehicle?.type}</p>
                  <p className="text-xs text-secondary mt-1">Plate: 29-A1 123.45</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg border-b border-outline-variant/15 pb-2">Customer Info</h3>
              <div className="text-sm space-y-1">
                <p className="font-bold">{customerInfo.name}</p>
                <p className="text-secondary">{customerInfo.email}</p>
                <p className="text-secondary">{customerInfo.phone}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-lg border-b border-outline-variant/15 pb-2">Pickup & Return</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-[10px] uppercase font-bold text-secondary">Pickup</p>
                  <p className="font-medium">March 25, 2024 • 09:00 AM</p>
                  <p className="text-secondary">Hanoi Old Quarter Office</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-secondary">Return</p>
                  <p className="font-medium">March 28, 2024 • 05:00 PM</p>
                  <p className="text-secondary">Hanoi Old Quarter Office</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-6 bg-surface-container rounded-2xl">
              <QrCode size={120} className="text-on-surface mb-2" />
              <p className="text-[10px] font-bold text-secondary uppercase">Show this at pickup</p>
            </div>
          </div>
        </div>

        <div className="p-8 bg-surface-container/50 border-t border-outline-variant/15 flex flex-wrap gap-4 justify-center">
          <button className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl text-sm font-bold hover:bg-surface-container transition-default border border-outline-variant/15">
            <Download size={18} /> Download PDF
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl text-sm font-bold hover:bg-surface-container transition-default border border-outline-variant/15">
            <Share2 size={18} /> Share Details
          </button>
        </div>
      </div>

      <div className="mt-12 flex justify-center gap-4">
        <button 
          onClick={handleDone}
          className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-container transition-default ambient-shadow"
        >
          <Home size={20} /> Back to Home
        </button>
        <button 
          onClick={() => router.push('/bikes')}
          className="flex items-center gap-2 px-8 py-4 bg-white text-on-surface rounded-2xl font-bold hover:bg-surface-container transition-default border border-outline-variant/15"
        >
          <Bike size={20} /> Rent Another
        </button>
      </div>
    </div>
  );
}
