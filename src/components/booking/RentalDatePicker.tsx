"use client";

import { Calendar, ArrowRight, Clock } from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

const DAY_PRESETS = [1, 2, 3, 5, 7, 10];

function toDateInputValue(value: Date): string {
  return value.toISOString().split("T")[0];
}

function addDays(date: string, days: number): string {
  if (!date) return "";
  const base = new Date(date);
  const result = new Date(base.getTime() + days * 24 * 60 * 60 * 1000);
  return toDateInputValue(result);
}

export default function RentalDatePicker() {
  const { startDate, endDate, setDates } = useBookingStore();
  const [days, setDays] = useState(0);
  const minDate = useMemo(() => toDateInputValue(new Date()), []);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays);
    } else {
      setDays(0);
    }
  }, [startDate, endDate]);

  const applyDurationPreset = (presetDays: number) => {
    const baseDate = startDate || minDate;
    setDates(baseDate, addDays(baseDate, presetDays));
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-outline-variant/10 space-y-8 text-on-surface">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary">
          <Calendar size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Rental Period</h2>
          <p className="text-sm text-secondary">
            Choose your start day and planned return date.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {DAY_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => applyDurationPreset(preset)}
            className={cn(
              "rounded-xl border px-3 py-2 text-xs font-bold transition-all",
              days === preset
                ? "border-primary bg-primary text-white"
                : "border-outline-variant/30 bg-surface-container/40 text-secondary hover:border-primary/40 hover:text-primary",
            )}
          >
            {preset} day{preset > 1 ? "s" : ""}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-full space-y-2">
          <label className="text-[10px] uppercase font-bold text-secondary tracking-wider ml-1">
            Start Date *
          </label>
          <div className="relative group">
            <Calendar
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors"
            />
            <input
              type="date"
              value={startDate}
              min={minDate}
              onChange={(e) => {
                const selectedStart = e.target.value;
                const nextEnd =
                  endDate && endDate >= selectedStart
                    ? endDate
                    : addDays(selectedStart, Math.max(days, 1));
                setDates(selectedStart, nextEnd);
              }}
              className="w-full pl-14 pr-5 py-4 bg-surface-container/50 border border-outline-variant/20 rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center pt-6">
          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary">
            <ArrowRight size={20} />
          </div>
        </div>

        <div className="w-full space-y-2">
          <label className="text-[10px] uppercase font-bold text-secondary tracking-wider ml-1">
            Return Date *
          </label>
          <div className="relative group">
            <Calendar
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors"
            />
            <input
              type="date"
              value={endDate}
              min={startDate || minDate}
              onChange={(e) => setDates(startDate, e.target.value)}
              className="w-full pl-14 pr-5 py-4 bg-surface-container/50 border border-outline-variant/20 rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            />
          </div>
        </div>
      </div>

      {days > 0 && (
        <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10 animate-in fade-in slide-in-from-top-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-on-surface">
              Duration: {days} {days === 1 ? "day" : "days"}
            </p>
            <p className="text-xs text-secondary">
              Your final amount in the summary is based on this rental period.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
