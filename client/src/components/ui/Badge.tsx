import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/cn"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-secondary-light text-tertiary",
        primary: "border-transparent bg-tertiary text-[hsl(220,47%,10%)]",
        secondary: "border-transparent bg-secondary text-tertiary",
        destructive: "border-transparent bg-[#F43F5E] text-white",
        outline: "text-tertiary border-secondary",
        success: "border-transparent bg-[#2DD4BF] text-[hsl(220,47%,10%)]",
        warning: "border-transparent bg-[#F59E0B] text-white",
        info: "border-transparent bg-[#3B82F6] text-white",
        status: {
          active: "border-transparent bg-[#2DD4BF] text-[hsl(220,47%,10%)]",
          completed: "border-transparent bg-[#2DD4BF] text-[hsl(220,47%,10%)]",
          canceled: "border-transparent bg-[#F43F5E] text-white",
          pending: "border-transparent bg-[#F59E0B] text-white",
        },
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
