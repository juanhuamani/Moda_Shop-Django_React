import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/utils/cn"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  variant?: "default" | "dark" | "light" | "outline"
}

const variantClasses: Record<NonNullable<SelectProps["variant"]>, string> = {
  default: "border-input bg-subtle text-foreground",
  dark: "border-border bg-background text-foreground",
  light: "border-border bg-surface text-foreground",
  outline: "border-border bg-transparent text-foreground",
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      className,
      options,
      value,
      defaultValue,
      onChange,
      placeholder,
      variant = "default",
      disabled,
      ...props
    },
    ref
  ) => {
    const controlled = value !== undefined

    return (
      <div ref={ref} className={cn("relative w-full", className)}>
        <select
          {...props}
          value={controlled ? value : undefined}
          defaultValue={controlled ? undefined : (defaultValue ?? "")}
          disabled={disabled}
          onChange={(event) => onChange?.(event.target.value)}
          className={cn(
            "h-10 w-full cursor-pointer appearance-none rounded-control border px-3 pr-10 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
            variantClasses[variant],
            className
          )}
        >
          <option value="" disabled>
            {placeholder ?? "Select an option"}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }
