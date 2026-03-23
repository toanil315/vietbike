"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { User, CreditCard } from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";
import { AnimatePresence, motion } from "motion/react";
import BookingStepper from "./BookingStepper";
import CustomerInfoForm from "./CustomerInfoForm";
import BookingSummary from "./BookingSummary";
import RentalDatePicker from "./RentalDatePicker";
import { BookingNavigationButtons } from "./BookingNavigationButtons";
import { BookingEmptyState } from "./BookingEmptyState";
import { useMobile } from "@/hooks/useMobile";
import { useBookingSubmit } from "./hooks/useBookingSubmit";
import { calculateBookingTotal } from "./handlers/bookingHandlers";

const steps = [
  { id: 1, name: "Booking Form", icon: User },
  { id: 2, name: "Review & Confirm", icon: CreditCard },
];

export default function BookingFlow() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const isMobile = useMobile();
  const {
    step,
    setStep,
    vehicle,
    customerInfo,
    startDate,
    endDate,
    sourceApp,
    note,
  } = useBookingStore();

  const { handleBookingSubmit, isSubmitting, error } = useBookingSubmit();

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    if (step < 2) {
      if (!customerInfo.name.trim()) {
        setValidationError("Please enter your full name.");
        return;
      }
      if (!customerInfo.phone.trim()) {
        setValidationError("Please enter your phone number.");
        return;
      }
      if (!startDate || !endDate) {
        setValidationError("Please select a valid rental period.");
        return;
      }

      setValidationError(null);
      setStep(step + 1);
    } else {
      if (!vehicle) {
        return;
      }

      setValidationError(null);

      // Submit booking
      await handleBookingSubmit({
        vehicle,
        customerInfo,
        startDate,
        endDate,
        sourceApp,
        note,
      });
    }
  }, [
    step,
    setStep,
    vehicle,
    customerInfo,
    startDate,
    endDate,
    sourceApp,
    note,
    handleBookingSubmit,
  ]);

  if (!isClient) return null;

  if (!vehicle) {
    return <BookingEmptyState />;
  }

  const total = calculateBookingTotal(vehicle, startDate, endDate);

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
                  >
                    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-outline-variant/10 space-y-4">
                      <h2 className="text-2xl font-bold text-on-surface">
                        Review Before Sending
                      </h2>
                      <p className="text-secondary">
                        Verify customer details, rental schedule, and total on
                        the summary card. Submit when everything is correct.
                      </p>
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                        Your request will be sent directly to the unified
                        booking endpoint and staff will confirm shortly.
                      </div>
                    </div>
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
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div
                    key="mobile-payment"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-outline-variant/10 space-y-4">
                      <h2 className="text-2xl font-bold text-on-surface">
                        Review Before Sending
                      </h2>
                      <p className="text-secondary">
                        Review the summary and submit your booking request.
                      </p>
                    </div>
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
            showConfirmButton={step === 2}
          />

          {/* Error message display */}
          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {validationError && (
            <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-700 text-sm">
              {validationError}
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
