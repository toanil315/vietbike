import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  className?: string;
}

export default function StarRating({
  rating,
  reviewCount,
  size = "sm",
  className,
}: StarRatingProps) {
  const starSize = size === "sm" ? 14 : 18;
  const totalStars = 5;

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: totalStars }, (_, i) => {
          const filled = i < Math.round(rating);
          return (
            <Star
              key={i}
              size={starSize}
              className={cn(
                filled
                  ? "text-amber-400 fill-amber-400"
                  : "text-outline-variant/40",
              )}
            />
          );
        })}
      </div>
      {reviewCount !== undefined && (
        <span
          className={cn(
            "text-secondary font-medium",
            size === "sm" ? "text-[11px]" : "text-xs",
          )}
        >
          {reviewCount} reviews
        </span>
      )}
    </div>
  );
}
