"use client";

import { Package } from "lucide-react";

/**
 * Addons selection component with API integration
 */
export default function AddonsSelector() {
  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-outline-variant/10 space-y-10">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <Package size={24} />
        </div>
        <h2 className="text-2xl font-bold text-on-surface">Add-ons</h2>
      </div>

      <p className="text-secondary">
        Add-ons are currently managed by staff during confirmation.
      </p>
    </div>
  );
}
