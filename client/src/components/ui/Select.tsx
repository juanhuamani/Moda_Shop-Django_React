import * as React from "react"
import { Check, ChevronDown } from 'lucide-react'

import { cn } from "@/utils/cn"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  variant?: "default" | "dark" | "light" | "outline"
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ className, options, value, onChange, placeholder, variant = "default", disabled, ...props },_ref) => {
    const [open, setOpen] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState(value || "")
    const selectRef = React.useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setOpen(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [])

    // Update internal state when value prop changes
    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value)
      }
    }, [value])

    const handleSelect = (option: SelectOption) => {
      if (option.disabled) return
      
      setSelectedValue(option.value)
      onChange?.(option.value)
      setOpen(false)
    }

    const selectedOption = options.find(option => option.value === selectedValue)

    return (
      <div 
        ref={selectRef} 
        className={cn("relative", className)}
      >
        <div
          onClick={() => !disabled && setOpen(!open)}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-default",
            {
              "bg-secondary-light border-secondary text-tertiary": 
                variant === "default",
              "bg-[hsl(220,47%,10%)] border-secondary text-tertiary": 
                variant === "dark",
              "bg-white border-gray-300 text-gray-900": 
                variant === "light",
              "bg-transparent border-secondary text-tertiary": 
                variant === "outline",
              "opacity-50 cursor-not-allowed": disabled,
            }
          )}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={open ? "select-dropdown" : undefined}
        >
          <span className="flex-grow truncate">
            {selectedOption ? selectedOption.label : placeholder || "Select an option"}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </div>
        
        {open && (
          <div
            id="select-dropdown"
            className={cn(
              "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-secondary-light border-secondary text-tertiary shadow-md",
              "scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent"
            )}
            role="listbox"
          >
            <div className="p-1">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
                    option.value === selectedValue 
                      ? "bg-secondary" 
                      : "hover:bg-[hsl(224,34%,25%)]",
                    option.disabled && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => handleSelect(option)}
                  role="option"
                  aria-selected={option.value === selectedValue}
                  aria-disabled={option.disabled}
                >
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    {option.value === selectedValue && (
                      <Check className="h-4 w-4" />
                    )}
                  </span>
                  <span className="truncate">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Hidden native select for form submission */}
        <select
          {...props}
          value={selectedValue}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }
