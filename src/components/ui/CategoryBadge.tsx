import { Crown, Bike, Zap, Fuel } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  categoryName: string;
  className?: string;
}

/**
 * Derives badge config from the real backend category name.
 * Category names from API: "Premium Scooters", "50cc Scooters",
 * "Electric Scooters", "Budget Scooters"
 */
function getCategoryConfig(categoryName: string) {
  const lower = categoryName.toLowerCase();

  if (lower.includes("premium")) {
    return {
      label: "Premium",
      icon: Crown,
      colorClass: "text-amber-700 bg-amber-50",
    };
  }

  if (lower.includes("electric")) {
    return {
      label: "No license",
      icon: Zap,
      colorClass: "text-emerald-700 bg-emerald-50",
    };
  }

  if (lower.includes("50cc")) {
    return {
      label: "No license",
      icon: Fuel,
      colorClass: "text-blue-700 bg-blue-50",
    };
  }

  if (lower.includes("budget")) {
    return {
      label: "Budget",
      icon: Bike,
      colorClass: "text-secondary bg-surface-container",
    };
  }

  // Fallback: use raw category name
  return {
    label: categoryName,
    icon: Bike,
    colorClass: "text-secondary bg-surface-container",
  };
}

export default function CategoryBadge({
  categoryName,
  className,
}: CategoryBadgeProps) {
  const config = getCategoryConfig(categoryName);
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold",
        config.colorClass,
        className,
      )}
    >
      <Icon size={13} />
      {config.label}
    </span>
  );
}
