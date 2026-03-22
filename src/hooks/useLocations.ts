/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useState, useEffect } from "react";
import apiClient from "@/lib/api";
import { locationEndpoints, addonEndpoints } from "@/lib/api-endpoints";
import { handleApiError, AppError } from "@/lib/error-handler";

export interface Location {
  id: string;
  code: string;
  name: string;
  city: string;
  region: "North" | "South" | "Central";
  active: boolean;
}

export interface Addon {
  id: string;
  name: string;
  price: number;
  description?: string;
  active: boolean;
}

/**
 * Hook for fetching all locations
 */
export function useLocations() {
  const [data, setData] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const endpoint = locationEndpoints.list();
        const response = await apiClient.get<{ data: Location[] }>(endpoint);

        // Handle both direct array and wrapped response
        const locations = Array.isArray(response) ? response : response.data;
        setData(locations);
      } catch (err) {
        const appError = handleApiError(err);
        setError(appError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return {
    data,
    isLoading,
    error,
  };
}

/**
 * Hook for fetching all addons
 */
export function useAddons() {
  const [data, setData] = useState<Addon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    const fetchAddons = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const endpoint = addonEndpoints.list();
        const response = await apiClient.get<{ data: Addon[] }>(endpoint);

        // Handle both direct array and wrapped response
        const addons = Array.isArray(response) ? response : response.data;
        setData(addons);
      } catch (err) {
        const appError = handleApiError(err);
        setError(appError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddons();
  }, []);

  return {
    data,
    isLoading,
    error,
  };
}

/**
 * Prefetch locations statically
 */
export async function prefetchLocations() {
  try {
    const endpoint = locationEndpoints.list();
    const response = await apiClient.get<{ data: Location[] }>(endpoint);
    return Array.isArray(response) ? response : response.data;
  } catch (err) {
    console.error("Error prefetching locations:", err);
    return [];
  }
}

/**
 * Prefetch addons statically
 */
export async function prefetchAddons() {
  try {
    const endpoint = addonEndpoints.list();
    const response = await apiClient.get<{ data: Addon[] }>(endpoint);
    return Array.isArray(response) ? response : response.data;
  } catch (err) {
    console.error("Error prefetching addons:", err);
    return [];
  }
}
