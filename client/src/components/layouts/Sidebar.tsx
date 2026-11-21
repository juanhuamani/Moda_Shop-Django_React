import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { UserAvatar } from "../ui/UserAvatar"
import { Tooltip } from "@/components/ui/ToolTip"
import { NavList } from "@/components/common/NavList"
import { useUser } from "@/context/user-context"
import { paths } from "@/config/paths"
import { cn } from "@/utils/cn"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user } = useUser()
  const reduceMotion = useReducedMotion()
  const spring = reduceMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 280, damping: 30 } as const)

  return (
    <motion.aside
      id="desktop-navigation"
      className="fixed inset-y-0 left-0 z-50 hidden overflow-visible border-r border-border bg-surface md:flex md:flex-col"
      initial={false}
      animate={{ width: collapsed ? 80 : 256 }}
      transition={spring}
    >
      <div className="flex h-16 shrink-0 items-center border-b border-border px-3">
        <Link
          to={paths.app.root.path}
          aria-label="ModaShop - Inicio"
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-dark shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            !collapsed && "mr-3"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M2 15h10" />
            <path d="m9 18 3-3-3-3" />
          </svg>
        </Link>

        {!collapsed && (
          <motion.span
            className="truncate text-heading font-bold text-foreground"
            initial={false}
            animate={{ opacity: 1 }}
          >
            ModaShop
          </motion.span>
        )}
      </div>

      <Tooltip
        content={collapsed ? "Expandir menú" : "Contraer menú"}
        position="right"
      >
        <motion.button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
          aria-expanded={!collapsed}
          aria-controls="desktop-navigation"
          className="absolute -right-3 top-20 z-10 flex h-10 w-6 items-center justify-center rounded-r-full border border-l-0 border-border bg-surface text-foreground shadow-card transition-colors hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          whileHover={reduceMotion ? undefined : { scale: 1.08 }}
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </motion.button>
      </Tooltip>

      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
        <Tooltip content={`${user?.first_name ?? "Mi"} ${user?.last_name ?? "perfil"}`} position="right" disabled={!collapsed}>
          <Link
            to={paths.app.profile.path}
            className={cn(
              "mx-3 mb-4 flex rounded-card bg-subtle text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              collapsed ? "justify-center p-2" : "items-center gap-3 p-3 hover:bg-surface-raised"
            )}
          >
            <UserAvatar />
            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="truncate text-xs text-muted-foreground">{user?.username}</p>
              </div>
            )}
          </Link>
        </Tooltip>

        <NavList variant="sidebar" collapsed={collapsed} />
      </div>
    </motion.aside>
  )
}
