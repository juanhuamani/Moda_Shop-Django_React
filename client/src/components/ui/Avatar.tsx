"use client"

import * as React from "react"

import { cn } from "@/utils/cn"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({ className, size = "md", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex shrink-0 overflow-hidden rounded-full",
      {
        "h-6 w-6": size === "xs",
        "h-8 w-8": size === "sm",
        "h-10 w-10": size === "md",
        "h-12 w-12": size === "lg",
        "h-16 w-16": size === "xl",
      },
      className,
    )}
    {...props}
  />
))
Avatar.displayName = "Avatar"

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  onLoadingStatusChange?: (status: "loading" | "loaded" | "error") => void
}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt = "", onLoadingStatusChange, ...props }, ref) => {
    const [status, setStatus] = React.useState<"loading" | "loaded" | "error">(src ? "loading" : "error")
    React.useEffect(() => {
      if (!src) {
        setStatus("error")
        onLoadingStatusChange?.("error")
        return
      }

      setStatus("loading")
      onLoadingStatusChange?.("loading")
    }, [src, onLoadingStatusChange])

    return (
      <img
        ref={ref}
        src={src || "/placeholder.svg"}
        alt={alt}
        className={cn("aspect-square h-full w-full", status === "error" ? "hidden" : "", className)}
        onLoad={() => {
          setStatus("loaded")
          onLoadingStatusChange?.("loaded")
        }}
        onError={() => {
          setStatus("error")
          onLoadingStatusChange?.("error")
        }}
        {...props}
      />
    )
  },
)
AvatarImage.displayName = "AvatarImage"

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "secondary" | "tertiary"
}

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full",
        {
          "bg-secondary-light text-tertiary": variant === "default",
          "bg-[hsl(220,47%,10%)] text-tertiary": variant === "primary",
          "bg-secondary text-tertiary": variant === "secondary",
          "bg-tertiary text-[hsl(220,47%,10%)]": variant === "tertiary",
        },
        className,
      )}
      {...props}
    />
  ),
)
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }

