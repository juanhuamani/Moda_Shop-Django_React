import { cn } from "@/utils/cn"
import { Badge } from "./Badge"

interface StatusBadgeProps {
  status: "completed" | "canceled" | "pending" | "active"
  className?: string
  size?: "default" | "sm" | "md" | "lg"
}

export function StatusBadge({ status, className, size = "default" }: StatusBadgeProps) {
  return (
    <Badge
      variant={
        status === "completed" || status === "active" ? "success" : status === "canceled" ? "destructive" : "warning"
      }
      size={size}
      className={cn("font-medium", className)}
    >
      {status === "completed"
        ? "Completed"
        : status === "canceled"
          ? "Canceled"
          : status === "active"
            ? "Active"
            : "Pending"}
    </Badge>
  )
}

