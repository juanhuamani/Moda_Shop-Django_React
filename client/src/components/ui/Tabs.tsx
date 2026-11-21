import * as React from "react"

import { cn } from "@/utils/cn"

type TabsContextValue = {
  baseId: string
  selectedTab: string
  setSelectedTab: (value: string) => void
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined)

function useTabsContext() {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider")
  }
  return context
}

function getIdPart(value: string) {
  return encodeURIComponent(value)
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

const Tabs = ({ defaultValue, value, onValueChange, children, ...props }: TabsProps) => {
  const generatedId = React.useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const baseId = `tabs-${generatedId || "root"}`
  const [internalValue, setInternalValue] = React.useState(value ?? defaultValue ?? "")
  const selectedTab = value ?? internalValue

  const setSelectedTab = React.useCallback(
    (nextValue: string) => {
      if (value === undefined) {
        setInternalValue(nextValue)
      }
      onValueChange?.(nextValue)
    },
    [onValueChange, value]
  )

  const contextValue = React.useMemo(
    () => ({ baseId, selectedTab, setSelectedTab }),
    [baseId, selectedTab, setSelectedTab]
  )

  return (
    <TabsContext.Provider value={contextValue}>
      <div data-orientation="horizontal" {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}
Tabs.displayName = "Tabs"

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "pills"
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(({ className, variant = "default", ...props }, ref) => (
  <div className="w-full max-w-full overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    <div
      ref={ref}
      {...props}
      role="tablist"
      aria-orientation="horizontal"
      data-orientation="horizontal"
      className={cn(
        "inline-flex min-w-max items-center gap-1 text-sm",
        {
          "rounded-control bg-surface p-1": variant === "default",
          "border-b border-border": variant === "outline",
          "gap-2": variant === "pills",
        },
        className
      )}
    />
  </div>
))
TabsList.displayName = "TabsList"

export interface TabsTriggerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragStart" | "onDragEnd"> {
  value: string
  variant?: "default" | "outline" | "pills"
  disabled?: boolean
}

const triggerVariants: Record<NonNullable<TabsTriggerProps["variant"]>, string> = {
  default:
    "rounded-control hover:bg-surface/60 data-[state=active]:bg-surface-raised data-[state=active]:text-foreground data-[state=active]:shadow-card",
  outline:
    "rounded-t-control border-b-2 border-transparent hover:border-border hover:text-foreground data-[state=active]:border-ring data-[state=active]:text-foreground",
  pills:
    "rounded-full hover:bg-surface/60 data-[state=active]:bg-surface-raised data-[state=active]:text-foreground data-[state=active]:shadow-card",
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(({ className, value, variant = "default", disabled, onClick, onKeyDown, ...props }, ref) => {
  const { baseId, selectedTab, setSelectedTab } = useTabsContext()
  const isSelected = selectedTab === value
  const idPart = getIdPart(value)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    if (!event.defaultPrevented) {
      setSelectedTab(value)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented) return
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Home" && event.key !== "End") return

    const tablist = event.currentTarget.closest('[role="tablist"]')
    const tabs = Array.from(tablist?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])') ?? [])
    if (tabs.length === 0) return

    const currentIndex = tabs.indexOf(event.currentTarget)
    let nextIndex: number

    switch (event.key) {
      case "Home":
        nextIndex = 0
        break
      case "End":
        nextIndex = tabs.length - 1
        break
      case "ArrowRight":
        nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % tabs.length
        break
      default:
        nextIndex = currentIndex === -1 ? tabs.length - 1 : (currentIndex - 1 + tabs.length) % tabs.length
    }

    const nextTab = tabs[nextIndex]
    if (!nextTab) return

    event.preventDefault()
    nextTab.focus()
    nextTab.scrollIntoView({ block: "nearest", inline: "nearest" })

    const nextValue = nextTab.dataset.value
    if (nextValue !== undefined) {
      setSelectedTab(nextValue)
    }
  }

  return (
    <button
      ref={ref}
      {...props}
      type="button"
      role="tab"
      id={`${baseId}-trigger-${idPart}`}
      aria-controls={`${baseId}-panel-${idPart}`}
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      data-state={isSelected ? "active" : "inactive"}
      data-value={value}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "inline-flex min-h-11 items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
        triggerVariants[variant],
        className
      )}
    />
  )
})
TabsTrigger.displayName = "TabsTrigger"

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(({ className, value, ...props }, ref) => {
  const { baseId, selectedTab } = useTabsContext()
  const isSelected = selectedTab === value
  const idPart = getIdPart(value)

  return (
    <div
      ref={ref}
      {...props}
      role="tabpanel"
      id={`${baseId}-panel-${idPart}`}
      aria-labelledby={`${baseId}-trigger-${idPart}`}
      data-state={isSelected ? "active" : "inactive"}
      hidden={!isSelected}
      tabIndex={0}
      className={cn(
        "mt-2 rounded-card ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    />
  )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
