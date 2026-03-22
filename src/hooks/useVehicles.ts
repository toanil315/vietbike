/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useState, useCallback, useEffect } from "react";
import apiClient from "@/lib/api";
import { vehicleEndpoints } from "@/lib/api-endpoints";
import { Vehicle } from "@/types";
import { handleApiError, AppError } from "@/lib/error-handler";

interface UseVehiclesOptions {
  page?: number;
  limit?: number;
  type?: string;
  category?: string;
  transmission?: string;
  priceMin?: number;
  priceMax?: number;
  search?: string;
  sortBy?: "price_asc" | "price_desc" | "rating" | "newest";
}

export interface PaginatedData<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

/**
 * Hook for fetching vehicles list with filtering and pagination
 */
export function useVehicles(options: UseVehiclesOptions = {}) {
  const [data, setData] = useState<Vehicle[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    pages: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  // Build query string
  const buildQueryString = useCallback((opts: UseVehiclesOptions) => {
    const params = new URLSearchParams();

    if (opts.page) params.append("page", opts.page.toString());
    if (opts.limit) params.append("pageSize", opts.limit.toString());
    if (opts.type) params.append("type", opts.type);
    if (opts.category) params.append("category", opts.category);
    if (opts.transmission) params.append("transmission", opts.transmission);
    if (opts.priceMin) params.append("minPrice", opts.priceMin.toString());
    if (opts.priceMax) params.append("maxPrice", opts.priceMax.toString());
    if (opts.search) params.append("search", opts.search);
    if (opts.sortBy) params.append("sortBy", opts.sortBy);

    const query = params.toString();
    return query ? `?${query}` : "";
  }, []);

  // Fetch vehicles
  const fetchVehicles = useCallback(
    async (opts: UseVehiclesOptions) => {
      try {
        setIsLoading(true);
        setError(null);

        const queryString = buildQueryString(opts);
        const endpoint = `${vehicleEndpoints.list()}${queryString}`;

        const response = await apiClient.get<PaginatedData<Vehicle>>(endpoint);

        setData(response.data);
        setPagination(response.pagination);
      } catch (err) {
        const appError = handleApiError(err);
        setError(appError);
      } finally {
        setIsLoading(false);
      }
    },
    [buildQueryString],
  );

  // Initial fetch
  useEffect(() => {
    fetchVehicles(options);
  }, [
    options.page,
    options.limit,
    options.type,
    options.category,
    options.transmission,
    options.priceMin,
    options.priceMax,
    options.search,
    options.sortBy,
  ]);

  const mutate = useCallback(
    async (newOptions?: UseVehiclesOptions) => {
      await fetchVehicles(newOptions || options);
    },
    [options, fetchVehicles],
  );

  return {
    data,
    pagination,
    isLoading,
    error,
    mutate,
  };
}

/**
 * Hook for fetching single vehicle by slug
 */
export function useVehicleDetail(slug: string) {
  const [data, setData] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchVehicle = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const endpoint = vehicleEndpoints.bySlug(slug);
        const response = await apiClient.get<Vehicle>(endpoint);

        setData(response);
      } catch (err) {
        const appError = handleApiError(err);
        setError(appError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicle();
  }, [slug]);

  return {
    data,
    isLoading,
    error,
  };
}

/**
 * Hook for fetching vehicle by ID
 */
export function useVehicleById(id: string) {
  const [data, setData] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchVehicle = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const endpoint = vehicleEndpoints.byId(id);
        const response = await apiClient.get<Vehicle>(endpoint);

        setData(response);
      } catch (err) {
        const appError = handleApiError(err);
        setError(appError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  return {
    data,
    isLoading,
    error,
  };
}

/**
 * Typing for prefetching vehicles (for ISR/SSG optimization)
 */
export async function prefetchVehicle(slug: string) {
  try {
    const endpoint = vehicleEndpoints.bySlug(slug);
    return await apiClient.get<Vehicle>(endpoint);
  } catch (err) {
    console.error("Error prefetching vehicle:", err);
    return null;
  }
}

/**
 * Typing for prefetching vehicles list
 */
export async function prefetchVehicles(options: UseVehiclesOptions = {}) {
  try {
    const params = new URLSearchParams();
    if (options.page) params.append("page", options.page.toString());
    if (options.limit) params.append("limit", options.limit.toString());
    if (options.type) params.append("type", options.type);

    const queryString = params.toString();
    const endpoint = `${vehicleEndpoints.list()}${queryString ? `?${queryString}` : ""}`;

    return await apiClient.get<PaginatedData<Vehicle>>(endpoint);
  } catch (err) {
    console.error("Error prefetching vehicles:", err);
    return null;
  }
}
