import Link from "next/link";
import { ChevronRight } from "lucide-react";
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
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 tracking-tight">
            Our Featured Fleet
          </h2>
          <p className="text-secondary text-lg">
            Hand-picked premium motorbikes maintained to the highest standards
            for your safety and comfort.
          </p>
        </div>
        <Link
          href="/bikes"
          className="group flex items-center gap-2 text-primary font-bold text-lg hover:underline"
        >
          View All Fleet{" "}
          <ChevronRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredBikes.map((bike, index) => (
          <BikeCard key={bike.id} bike={bike} index={index} />
        ))}
        {featuredBikes.length === 0 && (
          <div className="md:col-span-2 lg:col-span-4 rounded-3xl border border-outline-variant/20 bg-surface-container/30 p-8 text-center text-secondary">
            Featured bikes are being updated. Please check back shortly.
          </div>
        )}
      </div>
    </section>
  );
}
