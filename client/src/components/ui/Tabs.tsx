import * as React from "react"
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion"
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

  const handleTabChange = React.useCallback((id: string) => { 
    if (value === undefined) { 
      setSelectedTab(id) 
    } 
    onValueChange?.(id) 
  }, [onValueChange, value])

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

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(({ 
  className, 
  variant = "default", 
  ...props 
}, ref) => (
  <div 
    ref={ref} 
    className={cn(
      "inline-flex items-center justify-center relative",
      { 
        "rounded-md bg-secondary-light p-1": variant === "default",
        "border-b border-secondary": variant === "outline",
        "space-x-1": variant === "pills",
      },
      className
    )} 
    role="tablist" 
    {...props} 
  />
))
TabsList.displayName = "TabsList"

export interface TabsTriggerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> { 
  value: string 
  variant?: "default" | "outline" | "pills" 
  disabled?: boolean 
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(({ 
  className, 
  value, 
  variant = "default", 
  disabled, 
  ...props 
}, ref) => { 
  const { selectedTab, setSelectedTab } = useTabsContext()
  const isSelected = selectedTab === value

  return (
    <motion.button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={isSelected}
      aria-controls={`panel-${value}`}
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "px-3 py-1.5 text-white": variant === "default",
          "px-4 py-2 text-black": variant === "outline",
        },
        className
      )}
      onClick={() => setSelectedTab(value)}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props as HTMLMotionProps<"button">} 
    >
      {/* Resto del componente permanece igual */}
      <span className="relative z-10">{props.children}</span>
      
      {variant === "default" && (
        <motion.span
          className={cn(
            "absolute inset-0 z-0 bg-background rounded-sm shadow-sm",
            isSelected ? "bg-tertiary/20" : "bg-transparent"
          )}
          animate={isSelected ? "active" : "inactive"}
          variants={{
            active: { opacity: 1 },
            inactive: { opacity: 0 }
          }}
          transition={{ duration: 0.2 }}
        />
      )}

      {variant === "outline" && (
        <motion.span
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-tertiary"
          initial={false}
          animate={{ 
            scaleX: isSelected ? 1 : 0,
            originX: 0 
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      )}

      {variant === "pills" && isSelected && (
        <motion.span
          layoutId="pills-bg"
          className="absolute inset-0 z-0 bg-secondary rounded-md"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.button>
  )
})
TabsTrigger.displayName = "TabsTrigger"

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> { 
  value: string 
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(({ 
  className, 
  value, 
  ...props 
}, ref) => { 
  const { selectedTab } = useTabsContext()
  const isSelected = selectedTab === value

  return (
    <AnimatePresence mode="wait">
      {isSelected && (
        <motion.div
          ref={ref}
          role="tabpanel"
          id={`panel-${value}`}
          aria-labelledby={`tab-${value}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={cn(
            "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
          )}
          {...props as HTMLMotionProps<"div">}
        />
      )}
    </AnimatePresence>
  )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }