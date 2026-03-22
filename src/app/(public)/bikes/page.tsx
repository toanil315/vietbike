import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import BikesClient from "./bikes-client";

export const metadata: Metadata = {
  title: "Browse Motorbikes for Rent in Vietnam",
  description:
    "Find your perfect ride from our curated fleet of premium motorbikes. Filter by city, type, price. Available in Hanoi, Da Nang, Ho Chi Minh City.",
};

export default function BikesPage() {
  return (
    <div className="bg-surface-container/30 min-h-screen pb-20">
      {/* Breadcrumbs & Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-12">
        <nav className="flex items-center gap-2 text-xs font-medium text-secondary mb-6">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-on-surface">Bikes</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-4">
          Browse Our Motorbikes
        </h1>
        <p className="text-secondary max-w-2xl">
          Premium fleet curated for the urban explorer. Choose from
          high-performance cruisers to efficient city scooters.
        </p>
      </div>
      <BikesClient />
    </div>
  );
}
