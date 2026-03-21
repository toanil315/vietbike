'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Package, 
  CreditCard, 
  Info,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import { ADDONS } from '@/data/mockData';
import { AnimatePresence, motion } from 'motion/react';
import BookingStepper from './BookingStepper';
import CustomerInfoForm from './CustomerInfoForm';
import AddonsSelector from './AddonsSelector';
import LocationSelector from './LocationSelector';
import PaymentMethodSelector from './PaymentMethodSelector';
import BookingSummary from './BookingSummary';
import RentalDatePicker from './RentalDatePicker';

import { useMobile } from '@/hooks/useMobile';

const steps = [
  { id: 1, name: 'Identity & Plan', icon: User },
  { id: 2, name: 'Services & Location', icon: Package },
  { id: 3, name: 'Checkout', icon: CreditCard },
];

export default function BookingFlow() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const isMobile = useMobile();
  const { 
    step, setStep, vehicle, selectedAddons
  } = useBookingStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (!vehicle) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center text-secondary mx-auto mb-6">
          <Info size={40} />
        </div>
        <h2 className="text-3xl font-bold mb-4">No bike selected</h2>
        <p className="text-secondary mb-8">Please choose a motorbike from our fleet to start your booking.</p>
        <Link 
          href="/bikes" 
          className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-container transition-all shadow-lg"
        >
          Browse our fleet
        </Link>
      </div>
    );
  }

  const calculateTotal = () => {
    const { startDate, endDate } = useBookingStore.getState();
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    
    let total = vehicle.pricePerDay * days;
    selectedAddons.forEach(id => {
      const addon = ADDONS.find(a => a.id === id);
      if (addon) total += addon.price * days;
    });
    return total;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      {!isMobile && <BookingStepper currentStep={step} steps={steps} />}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Form Area */}
        <div className="lg:col-span-8 space-y-8">
          <AnimatePresence mode="wait">
            {/* Desktop Stepper Logic vs Mobile Simplified Logic */}
            {!isMobile ? (
              <>
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-8"
                  >
                    <CustomerInfoForm />
                    <RentalDatePicker />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-8"
                  >
                    <AddonsSelector />
                    <LocationSelector />
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <PaymentMethodSelector />
                  </motion.div>
                )}
              </>
            ) : (
              /* Mobile: Single Step for all Info, then Payment */
              <>
                {step === 1 && (
                  <motion.div 
                    key="mobile-info"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Section 1: User Info */}
                    <div className="space-y-2">
                      <CustomerInfoForm />
                    </div>

                    {/* Section 2: Rental Period */}
                    <div className="space-y-2">
                      <RentalDatePicker />
                    </div>

                    {/* Section 3: Pickup & Dropoff */}
                    <div className="space-y-2">
                      <LocationSelector />
                    </div>

                    {/* Additional: Add-ons */}
                    <div className="space-y-2">
                      <AddonsSelector />
                    </div>
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div 
                    key="mobile-payment"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <PaymentMethodSelector />
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
          {/* Navigation Buttons (Desktop Only) */}
          {!isMobile && (
            <div className="flex justify-between items-center pt-8">
              <button 
                onClick={() => step > 1 ? setStep(step - 1) : router.back()}
                className="flex items-center gap-2 text-secondary font-bold hover:text-primary transition-all group"
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
                {step === 1 ? 'Back to bike' : 'Previous Step'}
              </button>
              <button 
                onClick={() => step < 3 ? setStep(step + 1) : router.push('/booking/confirmation')}
                className="bg-primary text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-primary-container transition-all shadow-xl shadow-primary/20 flex items-center gap-2 group"
              >
                {step === 3 ? 'Confirm Booking' : 'Next Step'} 
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-4 lg:order-last order-last mb-8 lg:mb-0">
          <BookingSummary vehicle={vehicle} calculateTotal={calculateTotal} />
        </div>
      </div>

      {/* Mobile Only: Navigation Buttons at the very bottom */}
      {isMobile && (
        <div className="mt-8 pb-12">
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => {
                step === 1 ? setStep(3) : router.push('/booking/confirmation');
              }}
              className="w-full bg-primary text-white py-5 rounded-3xl font-bold text-lg hover:bg-primary-container transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group"
            >
              {step === 3 ? 'Confirm Booking' : 'Proceed to Payment'} 
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => {
                step === 3 ? setStep(1) : router.back();
              }}
              className="w-full py-4 text-secondary font-bold hover:text-primary transition-all flex items-center justify-center gap-2"
            >
              <ChevronLeft size={20} /> 
              {step === 1 ? 'Back to bike' : 'Previous Step'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
