"use client";

import { FormEvent } from "react";

export interface BookingListFilters {
  status: string;
  customerName: string;
  customerPhone: string;
  licensePlate: string;
}

interface BookingsListFiltersProps {
  value: BookingListFilters;
  onChange: (patch: Partial<BookingListFilters>) => void;
  onApply: () => void;
  onReset: () => void;
}

export default function BookingsListFilters({
  value,
  onChange,
  onApply,
  onReset,
}: BookingsListFiltersProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onApply();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-outline-variant/10 bg-white p-6 shadow-sm"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <input
          value={value.customerName}
          onChange={(event) => onChange({ customerName: event.target.value })}
          placeholder="Customer name"
          className="rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
        />
        <input
          value={value.customerPhone}
          onChange={(event) => onChange({ customerPhone: event.target.value })}
          placeholder="Customer phone"
          className="rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
        />
        <input
          value={value.licensePlate}
          onChange={(event) => onChange({ licensePlate: event.target.value })}
          placeholder="License plate"
          className="rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
        />
        <select
          value={value.status}
          onChange={(event) => onChange({ status: event.target.value })}
          className="rounded-xl border border-outline-variant/20 bg-surface-container/30 px-4 py-3 text-sm"
        >
          <option value="">All statuses</option>
          <option value="pending">pending</option>
          <option value="confirmed">confirmed</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
          <option value="cancelled">cancelled</option>
        </select>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button
          type="submit"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white"
        >
          Apply
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-outline-variant/20 px-4 py-2 text-sm font-bold text-secondary"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
