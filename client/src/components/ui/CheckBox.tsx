import * as React from "react"
import { Check } from 'lucide-react'

import { cn } from "@/utils/cn"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "primary" | "secondary"
  indeterminate?: boolean
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, variant = "default", indeterminate, ...props }, ref) => {
    const innerRef = React.useRef<HTMLInputElement>(null)
    const combinedRef = useCombinedRefs(ref, innerRef)

    React.useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = !!indeterminate
      }
    }, [indeterminate])

    return (
      <div className="relative flex items-center">
        <input
          type="checkbox"
          ref={combinedRef}
          className={cn(
            "peer h-4 w-4 shrink-0 rounded-sm border border-secondary bg-transparent ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "appearance-none",
            className
          )}
          {...props}
        />
        <div
          className={cn(
            "pointer-events-none absolute left-0 top-0 flex h-4 w-4 items-center justify-center rounded-sm border border-secondary",
            "peer-checked:border-transparent",
            {
              "peer-checked:bg-[hsl(215,100%,92%)] peer-checked:text-[hsl(220,47%,10%)]": variant === "default",
              "peer-checked:bg-[hsl(220,47%,10%)] peer-checked:text-tertiary": variant === "primary",
              "peer-checked:bg-secondary peer-checked:text-tertiary": variant === "secondary",
            },
            "peer-disabled:opacity-50"
          )}
        >
          <Check className="h-3 w-3 peer-checked:opacity-100" />
        </div>
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

function useCombinedRefs<T>(...refs: Array<React.Ref<T> | null | undefined>) {
  const targetRef = React.useRef<T>(null)

  React.useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(targetRef.current)
      } else {
        // @ts-ignore
        ref.current = targetRef.current
      }
    })
  }, [refs])

  return targetRef
}

export { Checkbox }