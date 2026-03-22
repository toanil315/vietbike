"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { User, Package, CreditCard } from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";
import { useAddons } from "@/hooks/useLocations";
import { ADDONS } from "@/data/mockData";
import { AnimatePresence, motion } from "motion/react";
import BookingStepper from "./BookingStepper";
import CustomerInfoForm from "./CustomerInfoForm";
import AddonsSelector from "./AddonsSelector";
import LocationSelector from "./LocationSelector";
import PaymentMethodSelector from "./PaymentMethodSelector";
import BookingSummary from "./BookingSummary";
import RentalDatePicker from "./RentalDatePicker";
import { BookingNavigationButtons } from "./BookingNavigationButtons";
import { BookingEmptyState } from "./BookingEmptyState";
import { useMobile } from "@/hooks/useMobile";
import { useBookingSubmit } from "./hooks/useBookingSubmit";
import { calculateBookingTotal } from "./handlers/bookingHandlers";

const steps = [
  { id: 1, name: "Identity & Plan", icon: User },
  { id: 2, name: "Services & Location", icon: Package },
  { id: 3, name: "Checkout", icon: CreditCard },
];

export default function BookingFlow() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const isMobile = useMobile();
  const {
    step,
    setStep,
    vehicle,
    selectedAddons,
    customerInfo,
    startDate,
    endDate,
    pickupLocation,
    dropoffLocation,
    paymentMethod,
  } = useBookingStore();

  const { data: apiAddons } = useAddons();
  const addons = apiAddons && apiAddons.length > 0 ? apiAddons : ADDONS;

  const { handleBookingSubmit, isSubmitting, error } = useBookingSubmit();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (!vehicle) {
    return <BookingEmptyState />;
  }

  /**
   * Handle previous step navigation
   */
  const handlePreviousStep = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  }, [step, setStep, router]);

  /**
   * Handle next step or booking submission
   */
  const handleNextStep = useCallback(async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit booking
      await handleBookingSubmit({
        vehicle,
        customerInfo,
        startDate,
        endDate,
        pickupLocation,
        dropoffLocation,
        selectedAddons,
        paymentMethod,
      });
    }
  }, [
    step,
    setStep,
    vehicle,
    customerInfo,
    startDate,
    endDate,
    pickupLocation,
    dropoffLocation,
    selectedAddons,
    paymentMethod,
    handleBookingSubmit,
  ]);

  const total = calculateBookingTotal(
    vehicle,
    startDate,
    endDate,
    selectedAddons,
    addons,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      {!isMobile && <BookingStepper currentStep={step} steps={steps} />}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Form Area */}
        <div className="lg:col-span-8 space-y-8">
          <AnimatePresence mode="wait">
            {/* Desktop Step-based Forms */}
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
              /* Mobile: All forms in single view */
              <>
                {step === 1 && (
                  <motion.div
                    key="mobile-info"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <CustomerInfoForm />
                    <RentalDatePicker />
                    <LocationSelector />
                    <AddonsSelector />
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

          {/* Navigation Buttons */}
          <BookingNavigationButtons
            step={step}
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
            isSubmitting={isSubmitting}
            isMobile={isMobile}
            showConfirmButton={step === 3}
          />

          {/* Error message display */}
          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-4 lg:order-last order-last mb-8 lg:mb-0">
          <BookingSummary vehicle={vehicle} calculateTotal={() => total} />
        </div>
      </div>
    </div>
  );
}
