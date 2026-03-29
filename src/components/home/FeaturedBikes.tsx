import Link from "next/link";
import { ArrowRight, Bike } from "lucide-react";
import { Vehicle } from "@/types";
import BikeCard from "../bikes/BikeCard";

interface FeaturedCategorySection {
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
  vehicles: Vehicle[];
}

interface FeaturedBikesProps {
  sections: FeaturedCategorySection[];
}

export default function FeaturedBikes({ sections }: FeaturedBikesProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
      {/* Section Header — DaNangBike style */}
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Bike size={18} className="text-primary" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">
            OUR FLEET
          </span>
        </div>
      </div>

      {sections.length === 0 ? (
        <div className="rounded-3xl border border-outline-variant/20 bg-surface-container/30 p-12 text-center text-secondary max-w-4xl mx-auto">
          Featured bikes are being updated. Please check back shortly.
        </div>
      ) : (
        <div className="space-y-16">
          {sections.map((section) => (
            <div key={section.categoryId} className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-on-surface">
                  {section.categoryName}
                </h3>
                <p className="text-secondary text-base md:text-lg">
                  {section.categoryDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {section.vehicles.map((bike, index) => (
                  <BikeCard key={bike.id} bike={bike} index={index} />
                ))}
              </div>

              <div className="text-center">
                <Link
                  href={`/bikes?categoryId=${section.categoryId}`}
                  className="inline-flex items-center gap-2 px-8 py-3 border-2 border-outline-variant/30 rounded-2xl text-sm font-bold text-on-surface hover:border-primary hover:text-primary transition-all duration-300 group"
                >
                  View Full {section.categoryName}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
