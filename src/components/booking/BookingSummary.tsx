"use client";

import { Star, ShieldCheck, Zap, AlertCircle } from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";
import { formatPrice } from "@/lib/utils";
import { Vehicle } from "@/types";
import { useMemo, useEffect, useState } from "react";

interface BookingSummaryProps {
  vehicle: Vehicle;
  calculateTotal: () => number;
}

export default function BookingSummary({
  vehicle,
  calculateTotal,
}: BookingSummaryProps) {
  const { voucherCode, startDate, endDate, discountAmount } = useBookingStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Ensure hydration match
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Calculate rental days
  const rentalDays = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  }, [startDate, endDate]);

  // Calculate pricing breakdown
  const rentalCost = vehicle.pricePerDay * rentalDays;

  const subtotal = rentalCost;
  // Simple tax calculation (10%)
  const tax = Math.round(subtotal * 0.1);
  const total = calculateTotal();

  const hasDateRange = startDate && endDate;
  const hasMissingInfo = !hasDateRange;
  const primaryImageUrl = vehicle.images?.[0]?.url;

  return (
    <aside className="sticky top-8 space-y-6">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-outline-variant/10 space-y-8 text-on-surface">
        {/* Header */}
        <div>
          <h3 className="text-2xl font-bold">Booking Summary</h3>
          <p className="text-xs text-secondary mt-1">
            Review your booking details
          </p>
        </div>

        {/* Vehicle Card */}
        <div className="flex gap-4 pb-8 border-b border-outline-variant/10">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border border-outline-variant/10 shrink-0 bg-surface-container/20">
            {primaryImageUrl ? (
              <img
                src={primaryImageUrl}
                alt={vehicle.name}
                className="w-full h-full object-cover"
                width={200}
                height={200}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-secondary/50">
                <AlertCircle size={24} />
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="font-bold text-lg">{vehicle.name}</p>
            <p className="text-xs text-secondary font-medium uppercase tracking-wider mt-1">
              {vehicle.brand} • {vehicle.model}
            </p>
            {vehicle.type === "electric" && (
              <div className="flex items-center gap-1 text-emerald-600 mt-2">
                <Zap size={12} fill="currentColor" />
                <span className="text-xs font-semibold">Electric</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-tertiary mt-2">
              <Star size={14} fill="currentColor" />
              <span className="text-xs text-secondary">Verified fleet</span>
            </div>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="space-y-4">
          {/* Rental Days */}
          {hasDateRange && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-secondary font-medium">
                Rental {rentalDays} {rentalDays === 1 ? "day" : "days"}
              </span>
              <span className="font-bold">{formatPrice(rentalCost)}</span>
            </div>
          )}

          {/* Subtotal */}
          {hasDateRange && (
            <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-center text-sm">
              <span className="text-secondary font-medium">Subtotal</span>
              <span className="font-bold">{formatPrice(subtotal)}</span>
            </div>
          )}

          {/* Tax */}
          {tax > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-secondary font-medium text-xs">
                Taxes & Fees (10%)
              </span>
              <span className="font-bold text-secondary">
                {formatPrice(tax)}
              </span>
            </div>
          )}

          {/* Voucher Discount */}
          {voucherCode && isHydrated && (
            <div className="flex justify-between items-center text-sm bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/20">
              <span className="text-emerald-600 font-medium">
                Voucher: {voucherCode}
              </span>
              <span className="font-bold text-emerald-600">
                -{formatPrice(discountAmount || 0)}
              </span>
            </div>
          )}

          {/* Total */}
          <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">
                Total Amount
              </p>
              <p className="text-3xl font-bold text-primary">
                {formatPrice(total)}
              </p>
              {tax > 0 && (
                <p className="text-[10px] text-emerald-600 font-semibold mt-1">
                  ✓ Taxes Included
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Voucher Input */}
        <div className="space-y-3 pt-4 border-t border-outline-variant/10">
          <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">
            Promo Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter code"
              className="flex-1 bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              defaultValue={voucherCode}
            />
            <button className="bg-on-surface/80 text-white px-4 py-3 rounded-xl text-xs font-bold hover:bg-on-surface transition-all">
              Apply
            </button>
          </div>
          <p className="text-xs text-secondary">
            Have a promo code? Enter it here to get discounts.
          </p>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="bg-linear-to-br from-emerald-500/10 to-emerald-500/5 rounded-3xl p-6 border border-emerald-500/20 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
          <ShieldCheck size={28} />
        </div>
        <div>
          <h4 className="font-bold text-on-surface text-sm">Secure Payment</h4>
          <p className="text-xs text-secondary mt-0.5">
            Your data is encrypted and safe
          </p>
        </div>
      </div>

      {/* Missing Info Warning */}
      {hasMissingInfo && (
        <div className="bg-amber-500/10 rounded-2xl p-4 border border-amber-500/20 flex items-start gap-3">
          <AlertCircle size={20} className="text-amber-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-bold text-amber-700">
              Complete Your Booking
            </p>
            <p className="text-xs text-amber-600 mt-1">
              Please select rental dates to see your final price.
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
