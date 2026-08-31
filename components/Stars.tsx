import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({
  rating,
  size = 16,
  className,
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.round(rating);
        return (
          <Star
            key={i}
            width={size}
            height={size}
            className={filled ? "text-gold" : "text-border"}
            fill={filled ? "currentColor" : "none"}
            strokeWidth={filled ? 0 : 1.5}
          />
        );
      })}
    </div>
  );
}
