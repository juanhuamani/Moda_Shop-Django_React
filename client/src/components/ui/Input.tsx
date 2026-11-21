import * as React from "react"
import { cn } from "@/utils/cn"
import { AlertTriangle } from "lucide-react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "search" | "dark" | "light"
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  errorMessage?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", icon, iconPosition = "left", errorMessage, ...props }, ref) => {
    const inputId = React.useId()
    const errorId = `${inputId}-error`
    const describedBy = [props["aria-describedby"], errorMessage ? errorId : undefined]
      .filter(Boolean)
      .join(" ")

    const inputClasses = cn(
      "flex h-10 w-full rounded-control border border-input bg-subtle px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      {
        "border-danger focus-visible:ring-danger": errorMessage,
        "bg-surface-raised border-border": variant === "default" && !errorMessage,
        "bg-subtle border-transparent rounded-full pl-10": variant === "search" && !errorMessage,
        "bg-background border-border": variant === "dark" && !errorMessage,
        "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500": variant === "light" && !errorMessage,
        "pl-10": icon && iconPosition === "left",
        "pr-10": icon && iconPosition === "right",
        "pr-12": errorMessage,
      },
      className
    )

    return (
      <>
        <div className="relative">
          {icon && iconPosition === "left" && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>
          )}
          <input
            id={props.id ?? inputId}
            type={type}
            className={inputClasses}
            ref={ref}
            aria-invalid={errorMessage ? true : props["aria-invalid"]}
            aria-describedby={describedBy || undefined}
            {...props}
          />
          {errorMessage && (
            <div
              className={cn(
                "absolute top-1/2 -translate-y-1/2 text-danger-light",
                iconPosition === "right" ? "right-9" : "right-3"
              )}
            >
              <AlertTriangle size={18} />
            </div>
          )}
          {icon && iconPosition === "right" && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>
          )}
        </div>
        {errorMessage && (
          <p id={errorId} role="alert" className="mt-1 text-xs text-danger-light">
            {errorMessage}
          </p>
        )}
      </>
    )
  }
)
Input.displayName = "Input"

export { Input }
