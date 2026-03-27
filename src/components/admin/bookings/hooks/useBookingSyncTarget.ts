"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import apiClient from "@/lib/api";
import { adminBookingEndpoints } from "@/lib/api-endpoints";
import {
  PullBookingSyncResult,
  SetSyncTargetPayload,
  SyncSpreadsheetItem,
  SyncTarget,
} from "@/types";
import { handleApiError, AppError } from "@/lib/error-handler";

interface UseBookingSyncTargetOptions {
  autoPullOnFirstLoad?: boolean;
}

export function useBookingSyncTarget(
  options: UseBookingSyncTargetOptions = {},
) {
  const [targets, setTargets] = useState<SyncSpreadsheetItem[]>([]);
  const [activeTarget, setActiveTarget] = useState<SyncTarget | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const initialPullTriggeredRef = useRef(false);

  const loadTargets = useCallback(async () => {
    const query = new URLSearchParams({ page: "1", pageSize: "20" });
    const payload = await apiClient.get<{ data: SyncSpreadsheetItem[] }>(
      `${adminBookingEndpoints.syncSpreadsheets()}?${query.toString()}`,
    );
    setTargets(payload.data || []);
  }, []);

  const loadActiveTarget = useCallback(async () => {
    const payload = await apiClient.get<SyncTarget | null>(
      adminBookingEndpoints.syncTarget(),
    );
    setActiveTarget(payload);
  }, []);

  const triggerPull = useCallback(async () => {
    return await apiClient.post<PullBookingSyncResult>(
      adminBookingEndpoints.syncPull(),
      { batchSize: 200 },
    );
  }, []);

  const changeTarget = useCallback(
    async (payload: SetSyncTargetPayload) => {
      await apiClient.put<SyncTarget>(
        adminBookingEndpoints.setSyncTarget(),
        payload,
      );
      await loadActiveTarget();
      return await triggerPull();
    },
    [loadActiveTarget, triggerPull],
  );

  const refresh = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await Promise.all([loadTargets(), loadActiveTarget()]);

      if (options.autoPullOnFirstLoad && !initialPullTriggeredRef.current) {
        initialPullTriggeredRef.current = true;
        await triggerPull();
      }
    } catch (err) {
      const appError = handleApiError(err);
      setError(appError);
    } finally {
      setIsLoading(false);
    }
  }, [loadTargets, loadActiveTarget, options.autoPullOnFirstLoad, triggerPull]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    targets,
    activeTarget,
    isLoading,
    error,
    refresh,
    changeTarget,
  };
}
