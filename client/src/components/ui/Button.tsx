import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/cn"
import { Spinner } from "./Spinner"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-tertiary text-primary hover:bg-light active:bg-accent",
        primary: "bg-success text-dark hover:bg-success/90 active:bg-success/80",
        secondary: "bg-secondary-light text-tertiary hover:bg-secondary active:bg-secondary",
        destructive: "bg-danger text-white hover:bg-danger/90 active:bg-danger/80",
        outline: "border border-border bg-transparent text-foreground hover:bg-secondary-light active:bg-secondary",
        ghost: "bg-transparent text-foreground hover:bg-secondary-light/50 active:bg-secondary-light",
        link: "text-foreground underline-offset-4 hover:underline",
        status: {
          completed: "bg-success text-dark hover:bg-success/90",
          canceled: "bg-danger text-white hover:bg-danger/90",
          pending: "bg-warning text-white hover:bg-warning/90",
        },
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-7 rounded-md px-2.5 text-xs",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  loadingText?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, isLoading = false, loadingText, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        disabled={isLoading || disabled}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner className={cn("h-5 w-5 text-current", loadingText && "mr-2")} />
            {loadingText}
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
