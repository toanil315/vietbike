"use client";

import { useCallback, useState } from "react";
import apiClient from "@/lib/api";
import { adminBookingEndpoints } from "@/lib/api-endpoints";
import {
  CreateBookingPayload,
  UpdateBookingPayload,
  Booking,
  BookingStatus,
} from "@/types";
import { handleApiError, AppError } from "@/lib/error-handler";

export function useAdminBookingMutations() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const createBooking = useCallback(async (payload: CreateBookingPayload) => {
    try {
      setIsLoading(true);
      setError(null);
      return await apiClient.post<{
        bookingId: string;
        reference: string;
        totalAmount: string;
        status: BookingStatus;
      }>(adminBookingEndpoints.create(), payload);
    } catch (err) {
      const appError = handleApiError(err);
      setError(appError);
      throw appError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateBooking = useCallback(
    async (bookingId: string, payload: UpdateBookingPayload) => {
      try {
        setIsLoading(true);
        setError(null);
        return await apiClient.patch<{
          bookingId: string;
          reference: string;
          changedFields: string[];
        }>(adminBookingEndpoints.update(bookingId), payload);
      } catch (err) {
        const appError = handleApiError(err);
        setError(appError);
        throw appError;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const getBookingByReference = useCallback(async (reference: string) => {
    try {
      setIsLoading(true);
      setError(null);
      return await apiClient.get<Booking>(
        adminBookingEndpoints.detail(reference),
      );
    } catch (err) {
      const appError = handleApiError(err);
      setError(appError);
      throw appError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createBooking,
    updateBooking,
    getBookingByReference,
    isLoading,
    error,
  };
}
