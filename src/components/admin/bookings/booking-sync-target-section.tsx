"use client";

import { useMemo, useState } from "react";
import { useBookingSyncTarget } from "@/components/admin/bookings/hooks/useBookingSyncTarget";
import { buildSetSyncTargetPayload } from "@/components/admin/bookings/handlers/booking-sync-handlers";

export default function BookingSyncTargetSection() {
  const { targets, activeTarget, isLoading, error, changeTarget, refresh } =
    useBookingSyncTarget({ autoPullOnFirstLoad: true });
  const [updating, setUpdating] = useState(false);

  const selectedTarget = useMemo(
    () => activeTarget?.spreadsheetId || "",
    [activeTarget?.spreadsheetId],
  );

  const handleChange = async (nextSpreadsheetId: string) => {
    if (!nextSpreadsheetId || nextSpreadsheetId === selectedTarget) {
      return;
    }

    try {
      setUpdating(true);
      await changeTarget(
        buildSetSyncTargetPayload(nextSpreadsheetId, "Sheet1"),
      );
      await refresh();
    } finally {
      setUpdating(false);
    }
  };

  return (
    <section className="rounded-3xl border border-outline-variant/10 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-on-surface">
            Booking Sync Target
          </h2>
          <p className="text-sm text-secondary">
            Select active spreadsheet target for booking synchronization.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          className="rounded-lg border border-outline-variant/20 px-3 py-2 text-xs font-bold text-secondary"
        >
          Refresh
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="space-y-1 text-sm font-medium text-on-surface">
          <span>Active Spreadsheet</span>
          <select
            value={selectedTarget}
            disabled={isLoading || updating}
            onChange={(event) => void handleChange(event.target.value)}
            className="w-full rounded-xl border border-outline-variant/20 bg-surface-container/30 px-3 py-3 text-sm"
          >
            <option value="">Select sync target</option>
            {targets.map((target) => (
              <option key={target.id} value={target.id}>
                {target.name}
              </option>
            ))}
          </select>
        </label>

        <div className="rounded-xl border border-outline-variant/20 bg-surface-container/20 px-4 py-3 text-sm">
          <p className="text-secondary">Current Sheet</p>
          <p className="font-bold text-on-surface">
            {activeTarget?.sheetName || "Sheet1"}
          </p>
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error.message}</p>}
      {updating && (
        <p className="mt-3 text-sm text-primary">
          Updating sync target and pulling latest data...
        </p>
      )}
    </section>
  );
}
