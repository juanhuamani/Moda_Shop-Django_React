import { Star } from "lucide-react"
import { cn } from "@/utils/cn"

interface RatingProps {
  value: number
  className?: string
}

export function Rating({ value, className }: RatingProps) {
  const rating = Math.max(0, Math.min(5, value))
  console.log(rating)
  return (
    <div className={cn("flex items-center", className)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            "h-4 w-4",
            index < rating
              ? "fill-current text-yellow-400"
              : "text-[hsl(215,100%,92%)/30]" 
          )}
        />
      ))}
    </div>
  )
}