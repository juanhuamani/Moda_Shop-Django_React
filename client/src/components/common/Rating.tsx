import { Star } from "lucide-react"
import { cn } from "@/utils/cn"

interface RatingProps {
  value: number
  className?: string
}

export function Rating({ value, className }: RatingProps) {
  const rating = Math.max(0, Math.min(5, value))
  return (
    <div
      className={cn("flex items-center", className)}
      role="img"
      aria-label={`${value} de 5`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn(
            "h-4 w-4",
            index < rating
              ? "fill-current text-warning-light"
              : "text-foreground/30"
          )}
        />
      ))}
    </div>
  )
}
