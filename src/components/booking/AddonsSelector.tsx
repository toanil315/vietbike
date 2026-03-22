"use client";

import { Package } from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";
import { useAddons } from "@/hooks/useLocations";
import { ADDONS } from "@/data/mockData";
import { AddonItem } from "./components/AddonItem";

/**
 * Addons selection component with API integration
 */
export default function AddonsSelector() {
  const { selectedAddons, toggleAddon } = useBookingStore();
  const { data: apiAddons } = useAddons();
  const addons = apiAddons && apiAddons.length > 0 ? apiAddons : ADDONS;

  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-outline-variant/10 space-y-10">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <Package size={24} />
        </div>
        <h2 className="text-2xl font-bold text-on-surface">Select Add-ons</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addons.map((addon) => (
          <AddonItem
            key={addon.id}
            id={addon.id}
            name={addon.name}
            description={addon.description || ""}
            price={addon.price}
            isSelected={selectedAddons.includes(addon.id)}
            onToggle={toggleAddon}
          />
        ))}
      </div>
    </div>
  );
}
