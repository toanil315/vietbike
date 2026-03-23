"use client";

import { useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  ChevronRight,
  Shield,
  Clock,
  Info,
} from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";
import { formatPrice } from "@/lib/utils";
import { Vehicle } from "@/types";

export default function BookingCard({ bike }: { bike: Vehicle }) {
  const router = useRouter();
  const setVehicle = useBookingStore((state) => state.setVehicle);

  const handleBookNow = () => {
    setVehicle(bike);
    router.push("/booking");
  };

  return (
    <div className="sticky top-8 space-y-6">
      <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-outline-variant/10">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">
              Rental Price
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-primary">
                {formatPrice(bike.pricePerDay)}
              </span>
              <span className="text-sm text-secondary font-medium">/day</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-secondary">Verified fleet</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="p-4 rounded-2xl bg-surface-container/50 border border-outline-variant/10 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                Pickup Location
              </p>
              <p className="text-sm font-bold text-on-surface">Da Nang City</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-surface-container/50 border border-outline-variant/10 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                Availability
              </p>
              <p className="text-sm font-bold text-on-surface">
                {bike.status === "available"
                  ? "Available Today"
                  : "Not Available"}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleBookNow}
          className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-primary-container transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
        >
          Book Now
          <ChevronRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>

        <div className="mt-8 pt-8 border-t border-outline-variant/10 space-y-4">
          <div className="flex items-center gap-3 text-sm text-secondary">
            <Shield size={18} className="text-primary" />
            <span>Basic insurance included</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-secondary">
            <Clock size={18} className="text-primary" />
            <span>Free cancellation up to 24h</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-secondary">
            <Info size={18} className="text-primary" />
            <span>No hidden fees, pay on pickup</span>
          </div>
        </div>
      </div>

      {/* Support Card */}
      <div className="bg-primary/5 rounded-4xl p-6 border border-primary/10 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
          <Info size={24} />
        </div>
        <div>
          <h4 className="font-bold text-on-surface">Need help?</h4>
          <p className="text-sm text-secondary">Chat with us</p>
        </div>
        <button className="ml-auto text-primary font-bold text-sm hover:underline">
          Chat
        </button>
      </div>
    </div>
  );
}
