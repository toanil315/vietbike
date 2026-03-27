"use client";

import { useEffect, useMemo, useState } from "react";
import { useBookingSyncTarget } from "@/components/admin/bookings/hooks/useBookingSyncTarget";
import { buildSetSyncTargetPayload } from "@/components/admin/bookings/handlers/booking-sync-handlers";

export default function BookingSyncTargetSection() {
  const { targets, activeTarget, isLoading, error, changeTarget, refresh } =
    useBookingSyncTarget({ autoPullOnFirstLoad: true });
  const [updating, setUpdating] = useState(false);
  const [sheetName, setSheetName] = useState("Sheet1");
  const [draftTargetId, setDraftTargetId] = useState("");

  const selectedTarget = useMemo(
    () => activeTarget?.spreadsheetId || "",
    [activeTarget?.spreadsheetId],
  );

  useEffect(() => {
    setDraftTargetId(activeTarget?.spreadsheetId || "");
    setSheetName(activeTarget?.sheetName || "Sheet1");
  }, [activeTarget?.spreadsheetId, activeTarget?.sheetName]);

  const isDirty =
    draftTargetId !== selectedTarget ||
    sheetName.trim() !== (activeTarget?.sheetName || "Sheet1");

  const handleSave = async () => {
    if (!draftTargetId || !sheetName.trim() || !isDirty) {
      return;
    }

    try {
      setUpdating(true);
      await changeTarget(buildSetSyncTargetPayload(draftTargetId, sheetName));
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
            Mục đồng bộ booking
          </h2>
          <p className="text-sm text-secondary">
            Chọn file bảng tính đang dùng để đồng bộ booking.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white transition hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-primary/30 active:scale-[0.98]"
        >
          Làm mới
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="space-y-1 text-sm font-medium text-on-surface">
          <span>File đang chọn</span>
          <select
            value={draftTargetId}
            disabled={isLoading || updating}
            onChange={(event) => setDraftTargetId(event.target.value)}
            className="w-full rounded-xl border border-outline-variant/20 bg-surface-container/30 px-3 py-3 text-sm"
          >
            <option value="">Chọn mục đồng bộ</option>
            {targets.map((target) => (
              <option key={target.id} value={target.id}>
                {target.name}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1 text-sm font-medium text-on-surface">
          <span>Sheet hiện tại</span>
          <input
            value={sheetName}
            onChange={(event) => setSheetName(event.target.value)}
            disabled={isLoading || updating}
            className="w-full rounded-xl border border-outline-variant/20 bg-surface-container/30 px-3 py-3 text-sm"
          />
        </label>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          disabled={
            isLoading ||
            updating ||
            !isDirty ||
            !draftTargetId ||
            !sheetName.trim()
          }
          onClick={() => void handleSave()}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-primary/30 active:scale-[0.98] disabled:opacity-50"
        >
          Lưu mục đồng bộ
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error.message}</p>}
      {updating && (
        <p className="mt-3 text-sm text-primary">
          Đang cập nhật mục đồng bộ và kéo dữ liệu mới...
        </p>
      )}
    </section>
  );
}
