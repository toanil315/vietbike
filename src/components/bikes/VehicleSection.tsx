"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Vehicle } from "@/types";
import BikeCard from "./BikeCard";

interface VehicleSectionProps {
  icon: React.ReactNode;
  sectionLabel: string;
  title: string;
  subtitle: string;
  vehicles: Vehicle[];
  viewAllHref: string;
  viewAllLabel: string;
}

/**
 * Category-grouped vehicle section matching DaNangBike layout.
 * Renders a section header with icon, title, subtitle, a 2-column card grid,
 * and a "View Full [Category]" link.
 */
export default function VehicleSection({
  icon,
  sectionLabel,
  title,
  subtitle,
  vehicles,
  viewAllHref,
  viewAllLabel,
}: VehicleSectionProps) {
  if (vehicles.length === 0) return null;

  return (
    <section className="py-16 first:pt-8">
      {/* Section Header */}
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-primary mb-4">
          {icon}
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">
            {sectionLabel}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-on-surface mb-4">
          {title}
        </h2>
        <p className="text-secondary text-base">{subtitle}</p>
      </div>

      {/* Vehicle Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {vehicles.slice(0, 4).map((vehicle, index) => (
          <BikeCard key={vehicle.id} bike={vehicle} index={index} />
        ))}
      </div>

      {/* View All Link */}
      {vehicles.length > 0 && (
        <div className="text-center mt-10">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-outline-variant/30 rounded-2xl text-sm font-bold text-on-surface hover:border-primary hover:text-primary transition-all duration-300 group"
          >
            {viewAllLabel}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      )}
    </section>
  );
}
