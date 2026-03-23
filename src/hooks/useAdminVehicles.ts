/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import apiClient from "@/lib/api";
import { adminVehicleEndpoints } from "@/lib/api-endpoints";
import { Vehicle } from "@/types";
import { handleApiError, AppError } from "@/lib/error-handler";

/**
 * Hook for fetching vehicles list for admin
 */
export function useAdminVehicles(
  page: number = 1,
  limit: number = 20,
  filters?: {
    status?: string;
    type?: string;
    category?: string;
    searchTerms?: string[];
  },
) {
  const [data, setData] = useState<Vehicle[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    pages: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(filters?.status && { status: filters.status }),
          ...(filters?.type && { type: filters.type }),
          ...(filters?.category && { category: filters.category }),
          ...(filters?.searchTerms &&
            filters.searchTerms.length > 0 && {
              search: filters.searchTerms.join(","),
            }),
        });

        const endpoint = `${adminVehicleEndpoints.list()}?${params.toString()}`;
        const response = await apiClient.get<{
          data: Vehicle[];
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

    fetchVehicles();
  }, [page, limit, filters]);

  return {
    data,
    pagination,
    isLoading,
    error,
  };
}

/**
 * Hook for creating or updating a vehicle
 */
export function useAdminUpsertVehicle() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const mutate = useCallback(
    async (vehicle: Partial<Vehicle> & { id?: string }) => {
      try {
        setIsLoading(true);
        setError(null);

        let response;
        if (vehicle.id) {
          // Update
          const endpoint = adminVehicleEndpoints.update(vehicle.id);
          response = await apiClient.put<Vehicle>(endpoint, vehicle);
        } else {
          // Create
          const endpoint = adminVehicleEndpoints.create();
          response = await apiClient.post<Vehicle>(endpoint, vehicle);
        }

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
 * Hook for deleting a vehicle
 */
export function useAdminDeleteVehicle() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const mutate = useCallback(async (vehicleId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const endpoint = adminVehicleEndpoints.updateStatus(vehicleId);
      await apiClient.patch(endpoint, { status: "unavailable" });

      return true;
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
