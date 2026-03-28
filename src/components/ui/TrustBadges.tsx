import { ShieldCheck, Truck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadgesProps {
  className?: string;
}

const BADGES = [
  { icon: ShieldCheck, label: "NO DEPOSIT" },
  { icon: Truck, label: "FREE DELIVERY" },
  { icon: Zap, label: "INSTANT BOOKING" },
] as const;

export default function TrustBadges({ className }: TrustBadgesProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 py-3 px-4 border-t border-outline-variant/10 text-secondary",
        className,
      )}
    >
      {BADGES.map((badge, idx) => (
        <span key={badge.label} className="flex items-center gap-1">
          {idx > 0 && (
            <span className="text-outline-variant/30 mr-2 select-none">|</span>
          )}
          <badge.icon size={12} className="text-primary shrink-0" />
          <span className="text-[9px] font-bold tracking-wider whitespace-nowrap">
            {badge.label}
          </span>
        </span>
      ))}
    </div>
  );
}
