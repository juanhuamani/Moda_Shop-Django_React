"use client"

import * as React from "react"
import { Tooltip as ReactTooltip } from "react-tooltip"
import { v4 as uuidv4 } from "uuid"
import { cn } from "@/utils/cn"

type TooltipPosition = "top" | "right" | "bottom" | "left"

export interface TooltipProps {
  children: React.ReactElement
  content: React.ReactNode
  position?: TooltipPosition
  delay?: number
  className?: string
  contentClassName?: string
  arrow?: boolean
  disabled?: boolean
  id?: string
}

export function Tooltip({
  children,
  content,
  position = "top",
  delay = 300,
  className,
  contentClassName,
  arrow = true,
  disabled = false,
  id,
}: TooltipProps) {
  const [isMounted, setIsMounted] = React.useState(false)
  const tooltipId = React.useMemo(() => id || `tooltip-${uuidv4()}`, [id])

  // Handle mounting for SSR
  React.useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Clone the child element to add data attributes
  const childElement = React.cloneElement(children, {
    "data-tooltip-id": tooltipId,
    "data-tooltip-content": typeof content === "string" ? content : undefined,
  })

  // Don't render tooltip on server
  if (!isMounted) return childElement

  return (
    <>
      {childElement}
      {typeof content === "string" ? (
        <ReactTooltip
          id={tooltipId}
          place={position}
          delayShow={delay}
          className={cn(
            "!bg-[hsl(224,34%,22%)] !text-[hsl(215,100%,92%)] !rounded-md !shadow-md !px-3 !py-1.5 !text-xs !font-medium !z-50",
            className
          )}
          noArrow={!arrow}
          isOpen={disabled ? false : undefined}
        />
      ) : (
        <ReactTooltip
          id={tooltipId}
          place={position}
          delayShow={delay}
          className={cn(
            "!bg-[hsl(224,34%,22%)] !text-[hsl(215,100%,92%)] !rounded-md !shadow-md !px-3 !py-1.5 !text-xs !font-medium !z-50",
            className
          )}
          noArrow={!arrow}
          isOpen={disabled ? false : undefined}
          render={() => <div className={cn(contentClassName)}>{content}</div>}
        />
      )}
    </>
  )
}

// Componente simplificado para un uso más sencillo
export interface SimpleTooltipProps {
  content: React.ReactNode
  children: React.ReactElement
  position?: TooltipPosition
  delay?: number
  className?: string
  contentClassName?: string
  arrow?: boolean
  disabled?: boolean
}

export function SimpleTooltip(props: SimpleTooltipProps) {
  return <Tooltip {...props} />
}

export const TooltipRoot = Tooltip
