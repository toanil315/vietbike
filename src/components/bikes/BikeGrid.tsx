"use client";

import Link from "next/link";
import { Heart, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Vehicle } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import BikeCard from "./BikeCard";
import Image from "next/image";

interface BikeGridProps {
  bikes: Vehicle[];
  viewMode: "grid" | "list";
}

export default function BikeGrid({ bikes, viewMode }: BikeGridProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (bikes.length === 0) {
    return null; // The parent component handles empty state
  }

  return (
    <div
      className={cn(
        "grid gap-8",
        viewMode === "grid"
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1",
      )}
    >
      {bikes.map((bike, index) => (
        <motion.div
          key={bike.id}
          initial={isHydrated ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={isHydrated ? { delay: index * 0.05 } : undefined}
          suppressHydrationWarning
          className={cn(
            "group bg-white rounded-3xl overflow-hidden border border-outline-variant/10 hover:border-primary/30 transition-all duration-300",
            viewMode === "grid" ? "flex flex-col" : "flex flex-col md:flex-row",
          )}
        >
          {/* Image Container */}
          <div
            className={cn(
              "relative overflow-hidden",
              viewMode === "grid" ? "h-64" : "h-64 md:h-auto md:w-80 shrink-0",
            )}
          >
            <img
              src={bike.images[0]?.url ?? ""}
              alt={bike.name}
              width={800}
              height={600}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-bold text-primary uppercase tracking-wider shadow-sm">
                {bike.category}
              </span>
            </div>
            <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-secondary hover:text-primary transition-colors shadow-sm">
              <Heart size={20} />
            </button>
          </div>

          {/* Content Container */}
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                {bike.name}
              </h3>
            </div>

            <div className="flex items-center gap-1.5 text-secondary text-sm mb-6">
              <MapPin size={14} className="text-primary" />
              <span>Vietnam</span>
            </div>

            <div className="mt-auto pt-6 border-t border-outline-variant/10 flex justify-between items-center">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-on-surface">
                    {formatPrice(bike.pricePerDay)}
                  </span>
                  <span className="text-xs text-secondary font-medium">
                    /day
                  </span>
                </div>
              </div>
              <Link
                href={`/bikes/${bike.slug || bike.id}`}
                className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary-container transition-colors shadow-md shadow-primary/10"
              >
                Book Now
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
