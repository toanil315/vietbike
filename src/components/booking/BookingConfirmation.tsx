'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Home, 
  Download, 
  Share2,
  Bike,
  ShieldCheck
} from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function BookingConfirmation() {
  const { vehicle, customerInfo, resetBooking, pickupLocation, dropoffLocation } = useBookingStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!vehicle) {
      router.push('/');
    }
  }, [vehicle, router]);

  if (!isClient || !vehicle) return null;

  const bookingId = "VELO-" + Math.random().toString(36).substring(2, 9).toUpperCase();

  return (
    <div className="max-w-4xl mx-auto px-4 pt-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[3rem] shadow-xl border border-outline-variant/10 overflow-hidden"
      >
        {/* Success Banner */}
        <div className="bg-emerald-500 p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-[-10%] left-[-10%] w-40 h-40 rounded-full bg-white blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-60 h-60 rounded-full bg-white blur-3xl"></div>
          </div>
          
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/30"
          >
            <CheckCircle2 size={48} className="text-white" />
          </motion.div>
          
          <h1 className="text-4xl font-bold mb-3">Booking Confirmed!</h1>
          <p className="text-white/80 text-lg">Your adventure starts soon. Get ready to ride!</p>
          
          <div className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
            <span className="text-xs font-bold uppercase tracking-widest opacity-70">Booking ID:</span>
            <span className="font-mono font-bold">{bookingId}</span>
          </div>
        </div>

        <div className="p-8 md:p-12 space-y-12">
          {/* Main Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-4">Vehicle Details</h3>
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border border-outline-variant/10 shrink-0">
                    <Image src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" referrerPolicy="no-referrer"  width={800} height={600}/>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface text-lg">{vehicle.name}</p>
                    <p className="text-xs text-secondary font-medium uppercase tracking-wider">{vehicle.brand} • {vehicle.engineSize}</p>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-md text-[10px] font-bold uppercase tracking-tighter">
                      <Bike size={10} />
                      Premium Fleet
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Rental Period</h3>
                <div className="flex items-center gap-4 bg-surface-container/30 p-4 rounded-2xl border border-outline-variant/10">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">Mar 20 - Mar 23, 2026</p>
                    <p className="text-xs text-secondary">3 Days Rental</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-4">Customer Info</h3>
                <div className="space-y-1">
                  <p className="font-bold text-on-surface">{customerInfo.name || 'Not provided'}</p>
                  <p className="text-sm text-secondary">{customerInfo.email || 'Not provided'}</p>
                  <p className="text-sm text-secondary">{customerInfo.phone || 'Not provided'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Pickup Location</h3>
                <div className="flex items-center gap-4 bg-surface-container/30 p-4 rounded-2xl border border-outline-variant/10">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">{pickupLocation || 'Da Nang International Airport'}</p>
                    <p className="text-xs text-secondary">Terminal 1, Arrival Hall</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-surface-container/30 rounded-[2rem] p-8 border border-outline-variant/10">
            <h3 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
              <ShieldCheck className="text-primary" />
              What's Next?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</div>
                <p className="font-bold text-sm">Check your email</p>
                <p className="text-xs text-secondary leading-relaxed">We've sent a detailed confirmation and rental agreement to your inbox.</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</div>
                <p className="font-bold text-sm">Prepare documents</p>
                <p className="text-xs text-secondary leading-relaxed">Have your original driving license and passport ready for pickup.</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">3</div>
                <p className="font-bold text-sm">Enjoy the ride</p>
                <p className="text-xs text-secondary leading-relaxed">Our team will meet you at the pickup point with your bike ready to go.</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <Link 
              href="/" 
              onClick={resetBooking}
              className="flex-1 bg-on-surface text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-on-surface/90 transition-all shadow-lg"
            >
              <Home size={20} />
              Return Home
            </Link>
            <button className="flex-1 bg-surface-container text-on-surface py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-surface-container/80 transition-all border border-outline-variant/10">
              <Download size={20} />
              Download Receipt
            </button>
            <button className="flex-1 bg-surface-container text-on-surface py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-surface-container/80 transition-all border border-outline-variant/10">
              <Share2 size={20} />
              Share Details
            </button>
          </div>
        </div>
      </motion.div>

      <div className="mt-12 text-center">
        <p className="text-secondary text-sm">Need help with your booking? <Link href="/contact" className="text-primary font-bold hover:underline">Contact Support</Link></p>
      </div>
    </div>
  );
}
