/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { createBookingAction } from "@/app/(public)/booking/actions";
import { prepareBookingData } from "../handlers/bookingHandlers";
import { Vehicle } from "@/types";
import { useBookingStore } from "@/store/bookingStore";

interface UseBookingSubmitParams {
  vehicle: Vehicle;
  customerInfo: Record<string, string>;
  startDate: string;
  endDate: string;
  sourceApp: string;
  note: string;
}

/**
 * Hook for handling booking submission
 */
export function useBookingSubmit() {
  const router = useRouter();
  const { setBookingReference, resetBooking } = useBookingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBookingSubmit = useCallback(
    async (params: UseBookingSubmitParams) => {
      setIsSubmitting(true);
      setError(null);

      try {
        const bookingData = prepareBookingData(
          params.vehicle,
          params.customerInfo,
          params.startDate,
          params.endDate,
          params.sourceApp,
          params.note,
        );

        const response = await createBookingAction(bookingData);

        if (
          response.success &&
          response.data?.reference &&
          response.data.bookingId
        ) {
          resetBooking();
          setBookingReference(response.data.reference, response.data.bookingId);
          setIsSubmitting(false);
          router.push(
            `/booking/confirmation?reference=${response.data.reference}`,
          );
        } else {
          throw new Error(response.error || "No booking reference returned");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Booking submission failed";
        setError(errorMessage);
        setIsSubmitting(false);
        console.error("Booking submission error:", err);
      }
    },
    [router, setBookingReference, resetBooking],
  );

  return {
    handleBookingSubmit,
    isSubmitting,
    error,
  };
}
