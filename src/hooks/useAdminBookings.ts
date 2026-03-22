/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import apiClient from "@/lib/api";
import { adminBookingEndpoints } from "@/lib/api-endpoints";
import { Booking } from "@/types";
import { handleApiError, AppError } from "@/lib/error-handler";

/**
 * Hook for fetching bookings list for admin
 */
export function useAdminBookings(
  page: number = 1,
  limit: number = 20,
  filters?: {
    status?: string;
    startDate?: string;
    endDate?: string;
  },
) {
  const [data, setData] = useState<Booking[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
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
          ...(filters?.status && { status: filters.status }),
          ...(filters?.startDate && { startDate: filters.startDate }),
          ...(filters?.endDate && { endDate: filters.endDate }),
        });

        const endpoint = `${adminBookingEndpoints.list()}?${params.toString()}`;
        const response = await apiClient.get<{
          data: Booking[];
          pagination: typeof pagination;
        }>(endpoint);

        setData(response.data || []);
        setPagination(response.pagination);
      } catch (err) {
        const appError = handleApiError(err);
        setError(appError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [page, limit, filters]);

  return {
    data,
    pagination,
    isLoading,
    error,
  };
}

/**
 * Hook for updating booking status (cancel, confirm, complete)
 */
export function useAdminUpdateBookingStatus() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const mutate = useCallback(
    async (
      bookingId: string,
      status: "pending" | "confirmed" | "active" | "completed" | "cancelled",
    ) => {
      try {
        setIsLoading(true);
        setError(null);

        const endpoint = adminBookingEndpoints.updateStatus(bookingId);
        const response = await apiClient.put<Booking>(endpoint, { status });

        return response;
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

  return {
    mutate,
    isLoading,
    error,
  };
}

/**
 * Hook for refunding a booking
 */
export function useAdminRefundBooking() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const mutate = useCallback(async (bookingId: string, reason: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const endpoint = adminBookingEndpoints.refund(bookingId);
      const response = await apiClient.post<{
        bookingId: string;
        refundAmount: number;
        status: string;
      }>(endpoint, { reason });

      return response;
    } catch (err) {
      const appError = handleApiError(err);
      setError(appError);
      throw appError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    mutate,
    isLoading,
    error,
  };
}
