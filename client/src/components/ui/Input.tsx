import * as React from "react"
import { cn } from "@/utils/cn"
import { AlertTriangle } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "search" | "dark" | "light"
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", icon, iconPosition = "left", errorMessage, ...props }, ref) => {
    const inputClasses = cn(
      "flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      {
        "!border-red-500 bg-white text-gray-900 placeholder:text-gray-500 focus-visible:ring-red-500": errorMessage,
        "bg-secondary-light border-secondary text-tertiary placeholder:text-[hsl(215,100%,92%)/50]":
          variant === "default" && !errorMessage,
        "bg-[hsl(224,34%,18%)] border-transparent text-tertiary placeholder:text-[hsl(215,100%,92%)/50] rounded-full pl-10":
          variant === "search" && !errorMessage,
        "bg-[hsl(220,47%,10%)] border-secondary text-tertiary placeholder:text-[hsl(215,100%,92%)/50]":
          variant === "dark" && !errorMessage,
        "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500": variant === "light" && !errorMessage,
        "pl-10": icon && iconPosition === "left",
        "pr-10": icon && iconPosition === "right",
        "pr-12": errorMessage, 
      },
      className
    );

    return (
      <>
        <div className="relative">
          {icon && iconPosition === "left" && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(215,100%,92%)/70]">{icon}</div>
          )}
          <input type={type} className={inputClasses} ref={ref} {...props} />
          {errorMessage && (
            <div className={cn("absolute top-1/2 -translate-y-1/2 text-red-500", iconPosition == "right" ? "right-9" : "right-3")}>
              <AlertTriangle size={18} />
            </div>
          )}
          {icon && iconPosition === "right" && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(215,100%,92%)/70]">{icon}</div>
          )}
        </div>
        <div className="mt-1 flex items-center justify-between">
          {errorMessage && (
            <p className="text-xs text-red-500">
              {errorMessage}
            </p>
          )}
        </div>
      </>
    )
  },
)
Input.displayName = "Input"

export { Input }

