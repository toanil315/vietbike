import Link from "next/link";
import { ArrowRight, Bike } from "lucide-react";
import { vehicleEndpoints } from "@/lib/api-endpoints";
import { Vehicle } from "@/types";
import BikeCard from "../bikes/BikeCard";

interface VehiclesListResponse {
  data: Vehicle[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

async function fetchFeaturedBikes(): Promise<Vehicle[]> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
  const query = new URLSearchParams({ page: "1", pageSize: "4" });

  try {
    const response = await fetch(
      `${apiBaseUrl}${vehicleEndpoints.list()}?${query.toString()}`,
      { next: { revalidate: 300 } },
    );

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as {
      success: boolean;
      data?: VehiclesListResponse;
    };

    if (!payload.success || !payload.data) {
      return [];
    }

    return payload.data.data.slice(0, 4);
  } catch {
    return [];
  }
}

export default async function FeaturedBikes() {
  const featuredBikes = await fetchFeaturedBikes();

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32">
      {/* Section Header — DaNangBike style */}
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Bike size={18} className="text-primary" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">
            OUR FLEET
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-on-surface mb-4 tracking-tight">
          Our Featured Fleet
        </h2>
        <p className="text-secondary text-base md:text-lg">
          Hand-picked premium motorbikes maintained to the highest standards for
          your safety and comfort.
        </p>
      </div>

      {/* Vehicle Grid — 2-column like DaNangBike */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {featuredBikes.map((bike, index) => (
          <BikeCard key={bike.id} bike={bike} index={index} />
        ))}
        {featuredBikes.length === 0 && (
          <div className="md:col-span-2 rounded-3xl border border-outline-variant/20 bg-surface-container/30 p-12 text-center text-secondary">
            Featured bikes are being updated. Please check back shortly.
          </div>
        )}
      </div>

      {/* View All CTA */}
      {featuredBikes.length > 0 && (
        <div className="text-center mt-12">
          <Link
            href="/bikes"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-outline-variant/30 rounded-2xl text-sm font-bold text-on-surface hover:border-primary hover:text-primary transition-all duration-300 group"
          >
            View Full Fleet
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
