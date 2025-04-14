import * as React from "react"

import { cn } from "@/utils/cn"

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "primary" | "success"
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(({ className, variant = "default", ...props }, ref) => {
  const id = React.useId()

  return (
    <div className="relative inline-flex items-center">
      <input type="checkbox" id={id} className="peer sr-only" ref={ref} {...props} />
      <label
        htmlFor={id}
        className={cn(
          "peer-focus-visible:ring-offset-background peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
          "inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
          "after:absolute after:left-0 after:top-0 after:h-5 after:w-5 after:translate-x-0.5 after:rounded-full after:bg-tertiary after:transition-transform",
          "peer-checked:after:translate-x-5",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          {
            "bg-secondary peer-checked:bg-tertiary": variant === "default",
            "bg-secondary peer-checked:bg-[hsl(220,47%,10%)]": variant === "primary",
            "bg-secondary peer-checked:bg-[#2DD4BF]": variant === "success",
          },
          className,
        )}
      />
    </div>
  )
})
Switch.displayName = "Switch"

export { Switch }

