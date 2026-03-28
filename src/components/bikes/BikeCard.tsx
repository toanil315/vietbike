"use client";

import Link from "next/link";
import { CalendarCheck } from "lucide-react";
import { formatVND } from "@/lib/currency";
import { motion } from "motion/react";
import { Vehicle } from "@/types";
import CategoryBadge from "@/components/ui/CategoryBadge";
import TrustBadges from "@/components/ui/TrustBadges";

interface BikeCardProps {
  bike: Vehicle;
  index?: number;
  showTrustBadges?: boolean;
}

/**
 * Vehicle card matching DaNangBike layout:
 * Image → Category badge → Title → Pricing → CTA → Trust badges
 *
 * Uses real backend data only (no mocks).
 */
export default function BikeCard({
  bike,
  index = 0,
  showTrustBadges = true,
}: BikeCardProps) {
  const primaryImage = bike.images?.[0];

  // "Best value" heuristic: budget category vehicles
  const isBestValue = bike.categoryName.toLowerCase().includes("budget");

  // Approximate USD conversion
  const usdApprox = Math.round(bike.pricePerDay / 25_000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <Link
        href={`/bikes/${bike.slug || bike.id}`}
        className="group bg-white rounded-3xl overflow-hidden border border-outline-variant/10 hover:border-primary/30 transition-all duration-300 flex flex-col h-full shadow-sm hover:shadow-lg"
      >
        {/* Vehicle Image */}
        <div className="relative h-56 sm:h-64 overflow-hidden bg-surface-container/20">
          {primaryImage ? (
            <img
              src={primaryImage.url}
              alt={primaryImage.altText || bike.name}
              width={600}
              height={400}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 p-4"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-secondary text-sm">No image</span>
            </div>
          )}
        </div>

        {/* Meta Row: Category Badge */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2">
          <CategoryBadge categoryName={bike.categoryName} />
          <span className="text-[11px] text-secondary font-medium">
            {bike.transmission === "automatic" ? "Automatic" : "Manual"}
          </span>
        </div>

        {/* Vehicle Title */}
        <div className="px-6 pb-3">
          <h3 className="font-display text-xl font-bold text-on-surface group-hover:text-primary transition-colors uppercase tracking-tight">
            {bike.name}
          </h3>
        </div>

        {/* Pricing Block */}
        <div className="px-6 pb-4">
          <div className="flex items-center gap-3 bg-surface-container/30 rounded-2xl p-3 border border-outline-variant/10">
            <div className="flex-1">
              <span className="text-[11px] text-secondary block">From</span>
              <span className="text-2xl font-bold text-on-surface">
                {formatVND(bike.pricePerDay, { showCode: false })}
              </span>
              <span className="text-sm text-secondary font-medium ml-1">
                VND / day
              </span>
              <span className="text-[11px] text-secondary block">
                ~ ${usdApprox} USD
              </span>
            </div>
            {isBestValue && (
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-amber-200/50">
                🏷️ BEST VALUE
              </span>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <div className="px-6 pb-4 mt-auto">
          <span className="flex items-center justify-center gap-2 w-full bg-on-surface text-white py-4 rounded-2xl font-bold text-sm tracking-wide group-hover:bg-primary transition-colors duration-300">
            <CalendarCheck size={18} />
            BOOK THIS BIKE
          </span>
        </div>

        {/* Trust Badges */}
        {showTrustBadges && <TrustBadges />}
      </Link>
    </motion.div>
  );
}
