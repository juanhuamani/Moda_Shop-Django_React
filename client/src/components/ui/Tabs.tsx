import * as React from "react"

import { cn } from "@/utils/cn"

type TabsContextValue = {
  selectedTab: string
  setSelectedTab: (id: string) => void
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined)

function useTabsContext() {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider")
  }
  return context
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

const Tabs = ({ defaultValue, value, onValueChange, children, ...props }: TabsProps) => {
  const [selectedTab, setSelectedTab] = React.useState(value || defaultValue || "")

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedTab(value)
    }
  }, [value])

  const handleTabChange = React.useCallback(
    (id: string) => {
      if (value === undefined) {
        setSelectedTab(id)
      }
      onValueChange?.(id)
    },
    [onValueChange, value],
  )

  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab: handleTabChange }}>
      <div {...props}>{children}</div>
    </TabsContext.Provider>
  )
}
Tabs.displayName = "Tabs"

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "pills"
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center",
        {
          "rounded-md bg-secondary-light p-1": variant === "default",
          "border-b border-secondary": variant === "outline",
          "space-x-1": variant === "pills",
        },
        className,
      )}
      role="tablist"
      {...props}
    />
  ),
)
TabsList.displayName = "TabsList"

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  variant?: "default" | "outline" | "pills"
  disabled?: boolean
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, variant = "default", disabled, ...props }, ref) => {
    const { selectedTab, setSelectedTab } = useTabsContext()
    const isSelected = selectedTab === value

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isSelected}
        aria-controls={`panel-${value}`}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "rounded-sm px-3 py-1.5 text-[hsl(215,100%,92%)/70] data-[state=active]:bg-background data-[state=active]:text-tertiary data-[state=active]:shadow-sm":
              variant === "default",
            "border-b-2 border-transparent px-4 py-2 text-[hsl(215,100%,92%)/70] data-[state=active]:border-tertiary data-[state=active]:text-[hsl(  data-[state=active]:border-tertiary data-[state=active]:text-tertiary":
              variant === "outline",
            "rounded-md px-3 py-1.5 text-[hsl(215,100%,92%)/70] hover:bg-[hsl(224,34%,25%)] data-[state=active]:bg-secondary data-[state=active]:text-tertiary":
              variant === "pills",
          },
          isSelected && "data-[state=active]",
          className,
        )}
        onClick={() => setSelectedTab(value)}
        {...props}
      />
    )
  },
)
TabsTrigger.displayName = "TabsTrigger"

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(({ className, value, ...props }, ref) => {
  const { selectedTab } = useTabsContext()
  const isSelected = selectedTab === value

  if (!isSelected) return null

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    />
  )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }

