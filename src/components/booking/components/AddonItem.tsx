/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

interface AddonItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

/**
 * Individual addon item with selection toggle
 */
export function AddonItem({
  id,
  name,
  description,
  price,
  isSelected,
  onToggle,
}: AddonItemProps) {
  return (
    <button
      onClick={() => onToggle(id)}
      className={cn(
        "p-6 rounded-3xl border-2 text-left transition-all flex justify-between items-center group",
        isSelected
          ? "border-primary bg-primary/5 shadow-md shadow-primary/5"
          : "border-outline-variant/10 hover:border-primary/30 bg-surface-container/30",
      )}
    >
      <div className="flex-1 pr-4">
        <p className="font-bold text-on-surface group-hover:text-primary transition-colors">
          {name}
        </p>
        <p className="text-xs text-secondary mt-1">{description}</p>
        <p className="text-sm font-bold text-primary mt-3">
          +{formatPrice(price)}
          <span className="text-[10px] text-secondary font-medium">/day</span>
        </p>
      </div>
      <div
        className={cn(
          "w-8 h-8 rounded-xl flex items-center justify-center transition-all",
          isSelected
            ? "bg-primary text-white scale-110"
            : "bg-white text-secondary border border-outline-variant/20",
        )}
      >
        <Check size={18} />
      </div>
    </button>
  );
}
