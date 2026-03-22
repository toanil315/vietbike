"use client";

import { MapPin } from "lucide-react";
import { useCallback } from "react";
import { useBookingStore } from "@/store/bookingStore";
import { useLocations } from "@/hooks/useLocations";
import { LOCATIONS } from "@/data/mockData";
import { LocationSelect } from "./components/LocationSelect";

/**
 * Pickup and dropoff location selector with API integration
 */
export default function LocationSelector() {
  const { pickupLocation, dropoffLocation, setLocations } = useBookingStore();
  const { data: apiLocations } = useLocations();
  const locations =
    apiLocations && apiLocations.length > 0
      ? apiLocations.map((l) => l.name)
      : LOCATIONS;

  /**
   * Handle pickup location change
   */
  const handlePickupChange = useCallback(
    (value: string) => {
      setLocations(value, dropoffLocation);
    },
    [dropoffLocation, setLocations],
  );

  /**
   * Handle dropoff location change
   */
  const handleDropoffChange = useCallback(
    (value: string) => {
      setLocations(pickupLocation, value);
    },
    [pickupLocation, setLocations],
  );

  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-outline-variant/10 space-y-10">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <MapPin size={24} />
        </div>
        <h2 className="text-2xl font-bold text-on-surface">Pickup & Dropoff</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <LocationSelect
          label="Pickup Location"
          value={pickupLocation}
          onChange={handlePickupChange}
          options={locations}
        />
        <LocationSelect
          label="Dropoff Location"
          value={dropoffLocation}
          onChange={handleDropoffChange}
          options={locations}
        />
      </div>
    </div>
  );
}
