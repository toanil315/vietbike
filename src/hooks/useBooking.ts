/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useState, useCallback, useEffect } from "react";
import apiClient from "@/lib/api";
import { bookingEndpoints, voucherEndpoints } from "@/lib/api-endpoints";
import { Booking } from "@/types";
import { handleApiError, AppError } from "@/lib/error-handler";
import {
  validateData,
  bookingRequestSchema,
  type BookingRequestInput,
} from "@/lib/validation";
import { useBookingStore } from "@/store/bookingStore";

interface CreateBookingParams {
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  pickupLocationId: string;
  dropoffLocationId: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    nationality: string;
    licenseNumber: string;
  };
  addons?: string[];
  voucherCode?: string;
  paymentMethod: "cash" | "bank_transfer";
}

/**
 * Hook for creating a new booking
 */
export function useCreateBooking() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [data, setData] = useState<{ id: string; reference: string } | null>(
    null,
  );
  const { resetBooking } = useBookingStore();

  const mutate = useCallback(
    async (params: CreateBookingParams) => {
      try {
        setIsLoading(true);
        setError(null);

        // Validate booking data
        const bookingData: BookingRequestInput = {
          vehicleId: params.vehicleId,
          startDate: params.startDate,
          endDate: params.endDate,
          pickupLocationId: params.pickupLocationId,
          dropoffLocationId: params.dropoffLocationId,
          customerInfo: params.customerInfo,
          addons: params.addons || [],
          voucherCode: params.voucherCode,
          paymentMethod: params.paymentMethod,
        };

        const validation = validateData(bookingRequestSchema, bookingData);
        if (!validation.success) {
          const appError: AppError = {
            code: "VALIDATION_ERROR",
            message: "Booking validation failed",
            userMessage: "Please check your booking details and try again.",
            statusCode: 400,
            details: validation.errors,
            timestamp: new Date(),
          };
          setError(appError);
          throw appError;
        }

        // Convert dates to ISO strings for API
        const requestData = {
          ...bookingData,
          startDate: params.startDate.toISOString().split("T")[0],
          endDate: params.endDate.toISOString().split("T")[0],
        };

        const endpoint = bookingEndpoints.create();
        const response = await apiClient.post<{
          id: string;
          reference: string;
        }>(endpoint, requestData);

        setData(response);
        resetBooking();

        return response;
      } catch (err) {
        const appError = handleApiError(err);
        setError(appError);
        throw appError;
      } finally {
        setIsLoading(false);
      }
    },
    [resetBooking],
  );

  return {
    mutate,
    isLoading,
    error,
    data,
  };
}

/**
 * Hook for fetching booking by reference number
 */
export function useBookingByReference(reference: string) {
  const [data, setData] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    if (!reference) return;

    const fetchBooking = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const endpoint = bookingEndpoints.getByReference(reference);
        const response = await apiClient.get<Booking>(endpoint);

        setData(response);
      } catch (err) {
        const appError = handleApiError(err);
        setError(appError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();

    // Poll for updates every 10 seconds (optional)
    const interval = setInterval(fetchBooking, 10000);
    return () => clearInterval(interval);
  }, [reference]);

  return {
    data,
    isLoading,
    error,
  };
}

/**
 * Hook for fetching customer's bookings (requires authentication)
 */
export function useCustomerBookings(page: number = 1, limit: number = 10) {
  const [data, setData] = useState<Booking[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        const endpoint = `${bookingEndpoints.myBookings()}?${params.toString()}`;
        const response = await apiClient.get<{
          data: Booking[];
          pagination: typeof pagination;
        }>(endpoint);

        setData(response.data);
        setPagination(response.pagination);
      } catch (err) {
        const appError = handleApiError(err);
        setError(appError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [page, limit]);

  return {
    data,
    pagination,
    isLoading,
    error,
  };
}

/**
 * Hook for validating voucher code
 */
export function useValidateVoucher() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [discountData, setDiscountData] = useState<{
    discountType: "fixed" | "percentage";
    discountValue: number;
    minBookingValue: number;
  } | null>(null);

  const validate = useCallback(async (code: string, bookingValue?: number) => {
    try {
      setIsLoading(true);
      setError(null);
      setDiscountData(null);

      if (!code.trim()) {
        setDiscountData(null);
        return null;
      }

      const endpoint = voucherEndpoints.validate();
      const response = (await apiClient.post(endpoint, {
        code: code.trim(),
        ...(bookingValue && { bookingValue }),
      })) as {
        discountType: "fixed" | "percentage";
        discountValue: number;
        minBookingValue: number;
      } | null;

      setDiscountData(response);
      return response;
    } catch (err) {
      const appError = handleApiError(err);
      setError(appError);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    validate,
    discountData,
    isLoading,
    error,
  };
}
