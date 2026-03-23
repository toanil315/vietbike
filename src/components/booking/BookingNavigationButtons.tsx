/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface BookingNavigationButtonsProps {
  step: number;
  onNext: () => void | Promise<void>;
  onPrevious: () => void;
  isSubmitting?: boolean;
  isMobile?: boolean;
  showConfirmButton?: boolean;
}

/**
 * Desktop navigation buttons for booking flow
 */
export function BookingNavigationButtons({
  step,
  onNext,
  onPrevious,
  isSubmitting = false,
  isMobile = false,
  showConfirmButton = false,
}: BookingNavigationButtonsProps) {
  const router = useRouter();

  if (isMobile) {
    return (
      <div className="mt-8 pb-12">
        <div className="flex flex-col gap-4">
          <button
            onClick={onPrevious}
            disabled={isSubmitting}
            className="w-full bg-surface-container text-on-surface py-5 rounded-3xl font-bold text-lg hover:bg-surface-container/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ChevronLeft size={20} />
            {step === 1 ? "Back to Bikes" : "Previous"}
          </button>
          <button
            onClick={onNext}
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-5 rounded-3xl font-bold text-lg hover:bg-primary-container transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting && <Loader2 size={20} className="animate-spin" />}
            {isSubmitting
              ? "Processing..."
              : showConfirmButton
                ? "Send Booking Request"
                : "Next"}
            {!isSubmitting && <ChevronRight size={20} />}
          </button>
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="flex justify-between items-center pt-8">
      <button
        onClick={onPrevious}
        disabled={isSubmitting}
        className="flex items-center gap-2 text-secondary font-bold hover:text-primary transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        {step === 1 ? "Back to bike" : "Previous Step"}
      </button>
      <button
        onClick={onNext}
        disabled={isSubmitting}
        className="bg-primary text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-primary-container transition-all shadow-xl shadow-primary/20 flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting && <Loader2 size={20} className="animate-spin" />}
        {isSubmitting
          ? "Processing..."
          : showConfirmButton
            ? "Send Booking Request"
            : "Next Step"}
        {!isSubmitting && (
          <ChevronRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        )}
      </button>
    </div>
  );
}
