import { Link, useLocation } from "react-router-dom"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { cn } from "@/utils/cn"
import { paths } from "@/config/paths"
import { sidebarItems } from "@/constants/sidebar-item"
import { Tooltip } from "@/components/ui/ToolTip"

interface NavListProps {
  variant?: "sidebar" | "mobile"
  onNavigate?: () => void
  className?: string
  collapsed?: boolean
}

export function NavList({ variant = "sidebar", onNavigate, className, collapsed = false }: NavListProps) {
  const { pathname } = useLocation()
  const reduceMotion = useReducedMotion()
  const isMobile = variant === "mobile"
  const iconOnly = collapsed && !isMobile

  const isActive = (href: string) =>
    pathname === href ||
    (href !== paths.app.root.path && pathname.startsWith(`${href}/`))

  return (
    <nav aria-label={isMobile ? "Navegación móvil" : "Navegación principal"} className={className}>
      <ul className={cn("space-y-1", isMobile && "space-y-2")}>
        {sidebarItems.map((item) => {
          const active = isActive(item.href)

          return (
            <li key={item.id}>
              <Tooltip content={item.title} position="right" disabled={!iconOnly}>
                <Link
                  to={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative flex items-center overflow-hidden rounded-control text-sm font-medium text-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    iconOnly ? "justify-center p-2" : "gap-3 px-3 py-2",
                    active && "text-foreground"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId={`nav-active-${variant}`}
                      className="absolute inset-0 rounded-control bg-gradient-to-r from-ring/25 via-ring/10 to-transparent shadow-card ring-1 ring-inset ring-ring/20"
                      transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 30 }}
                    />
                  )}

                  <span
                    className={cn(
                      "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-control bg-subtle text-foreground transition-colors group-hover:bg-ring group-hover:text-background",
                      active && "bg-ring text-background"
                    )}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <AnimatePresence initial={false}>
                    {!iconOnly && (
                      <motion.span
                        key="label"
                        className="relative overflow-hidden whitespace-nowrap"
                        initial={reduceMotion ? false : { opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, width: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.18 }}
                      >
                        {item.title}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {isMobile && (
                    <span
                      className={cn("relative ml-auto h-2 w-2 rounded-full bg-subtle", active && "bg-ring")}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </Tooltip>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
