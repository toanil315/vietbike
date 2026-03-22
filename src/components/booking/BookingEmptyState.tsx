/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Link from "next/link";
import { Info } from "lucide-react";

/**
 * Display when no vehicle is selected for booking
 */
export function BookingEmptyState() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center text-secondary mx-auto mb-6">
        <Info size={40} />
      </div>
      <h2 className="text-3xl font-bold mb-4">No bike selected</h2>
      <p className="text-secondary mb-8">
        Please choose a motorbike from our fleet to start your booking.
      </p>
      <Link
        href="/bikes"
        className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-container transition-all shadow-lg inline-block"
      >
        Browse our fleet
      </Link>
    </div>
  );
}
