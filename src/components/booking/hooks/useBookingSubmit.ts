/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateBooking } from "@/hooks/useBooking";
import { prepareBookingData } from "../handlers/bookingHandlers";
import { Vehicle } from "@/types";

interface UseBookingSubmitParams {
  vehicle: Vehicle;
  customerInfo: Record<string, string>;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  selectedAddons: string[];
  paymentMethod: string;
}

/**
 * Hook for handling booking submission
 */
export function useBookingSubmit() {
  const router = useRouter();
  const { mutate: createBooking } = useCreateBooking();
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
          params.pickupLocation,
          params.dropoffLocation,
          params.selectedAddons,
          params.paymentMethod,
        );

        // Convert ISO strings back to Date objects for the API
        const apiData = {
          ...bookingData,
          startDate: new Date(bookingData.startDate),
          endDate: new Date(bookingData.endDate),
        };

        const response = await createBooking(apiData);

        if (response?.reference) {
          setIsSubmitting(false);
          router.push(`/booking/confirmation?reference=${response.reference}`);
        } else {
          throw new Error("No booking reference returned");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Booking submission failed";
        setError(errorMessage);
        setIsSubmitting(false);
        console.error("Booking submission error:", err);
      }
    },
    [createBooking, router],
  );

  return {
    handleBookingSubmit,
    isSubmitting,
    error,
  };
}
