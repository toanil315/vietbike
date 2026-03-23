"use client";

import Link from "next/link";
import { MapPin, ArrowRight, Zap } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { motion } from "motion/react";
import { Vehicle } from "@/types";
import Image from "next/image";

// Fallback skeleton component
export const Skeleton = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-surface-container/20 ${className}`}
      {...props}
    />
  );
};

interface BikeCardProps {
  bike: Vehicle;
  index?: number;
  isLoading?: boolean;
}

export default function BikeCard({
  bike,
  index = 0,
  isLoading = false,
}: BikeCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-4xl overflow-hidden border border-outline-variant/10 flex flex-col h-full">
        <Skeleton className="h-56 w-full" />
        <div className="p-6 flex-1 flex flex-col space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <div className="mt-auto pt-6 border-t border-outline-variant/10">
            <Skeleton className="h-8 w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  // Primary image with fallback to first image in array
  const primaryImage = bike.images?.[0];
  const topFeatures = bike.features?.slice(0, 2) || [];
  const hasElectric = bike.type === "electric";
  const vehicleLabel = [bike.brand, bike.model].filter(Boolean).join(" • ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        href={`/bikes/${bike.slug || bike.id}`}
        className="group bg-white rounded-4xl overflow-hidden border border-outline-variant/10 hover:border-primary/30 transition-all duration-300 flex flex-col h-full shadow-sm hover:shadow-md"
      >
        {/* Image Section with Badge */}
        <div className="relative h-56 overflow-hidden bg-surface-container/20">
          {primaryImage ? (
            <img
              src={primaryImage.url}
              alt={bike.name}
              width={400}
              height={300}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-surface-container/20 flex items-center justify-center">
              <span className="text-secondary text-xs">No image</span>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-bold text-primary uppercase tracking-wider shadow-sm">
              {bike.category}
            </span>
          </div>

          {/* Electric Badge (if applicable) */}
          {hasElectric && (
            <div className="absolute top-4 right-4">
              <span className="bg-emerald-500/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-bold text-white flex items-center gap-1 shadow-sm">
                <Zap size={12} fill="currentColor" />
                Electric
              </span>
            </div>
          )}

          {/* Image Count Indicator */}
          {bike.images && bike.images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur px-2.5 py-1 rounded-lg text-[10px] text-white font-bold">
              +{bike.images.length - 1}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Header */}
          <div className="mb-2">
            <h3 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2 flex-1">
              {bike.name}
            </h3>
          </div>

          {/* Location & Brand */}
          <div className="flex items-center gap-1.5 text-secondary text-xs mb-3">
            <MapPin size={12} className="text-primary shrink-0" />
            <span className="truncate">Vietnam</span>
          </div>

          {/* Brand & Model */}
          <p className="text-[11px] text-secondary font-medium uppercase tracking-widest mb-3">
            {vehicleLabel}
          </p>

          {/* Features Chips (Top 2) */}
          {topFeatures.length > 0 && (
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {topFeatures.map((feature, idx) => (
                <span
                  key={idx}
                  className="inline-block bg-primary/10 text-primary text-[10px] font-semibold px-2 py-1 rounded-md"
                >
                  {feature.featureName}
                </span>
              ))}
            </div>
          )}

          {/* Pricing Footer */}
          <div className="mt-auto pt-6 border-t border-outline-variant/10 flex justify-between items-center">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-on-surface">
                {formatPrice(bike.pricePerDay)}
              </span>
              <span className="text-[10px] text-secondary font-medium">
                /day
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowRight size={20} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
