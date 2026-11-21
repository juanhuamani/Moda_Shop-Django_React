import type React from "react"

import { useCallback, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Search, Bell, Heart, ShoppingCart, Menu, X } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { UserAvatar } from "@/components/ui/UserAvatar"
import { Badge, Button, Input } from "@/components/ui"
import { Tooltip } from "@/components/ui/ToolTip"
import { Container } from "@/components/ui/Container"
import { BrandLogo } from "@/components/common/BrandLogo"
import { NavList } from "@/components/common/NavList"
import { Sidebar } from "./Sidebar"
import { useUser } from "@/context/user-context"
import { paths } from "@/config/paths"
import { getCart } from "@/services/cartService"
import { cn } from "@/utils/cn"

export function GeneralLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    () => typeof window !== "undefined" && window.localStorage.getItem("modashop-sidebar-collapsed") === "true"
  )
  const [cartCount, setCartCount] = useState(0)
  const { user } = useUser()
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const scrollYRef = useRef(0)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileNavRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let active = true

    getCart()
      .then((data) => {
        if (active) setCartCount(data?.cart?.items?.length ?? 0)
      })
      .catch(() => {})

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem("modashop-sidebar-collapsed", String(sidebarCollapsed))
  }, [sidebarCollapsed])

  useEffect(() => {
    if (mobileMenuOpen) {
      scrollYRef.current = window.scrollY

      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollYRef.current}px`
      document.body.style.width = "100%"
    } else {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""

      window.scrollTo(0, scrollYRef.current)
    }

    return () => {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
    }
  }, [mobileMenuOpen])

  const handleMobileMenuClose = useCallback(() => {
    setMobileMenuOpen(false)
    menuButtonRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleMobileMenuClose()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [mobileMenuOpen, handleMobileMenuClose])

  useEffect(() => {
    if (!mobileMenuOpen) return

    const frame = window.requestAnimationFrame(() => {
      mobileNavRef.current?.querySelector<HTMLAnchorElement>("nav a")?.focus()
    })

    return () => window.cancelAnimationFrame(frame)
  }, [mobileMenuOpen])

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((value) => !value)}
      />

      <div
        className={cn(
          "flex-1 transition-[margin] duration-300",
          sidebarCollapsed ? "md:ml-20" : "md:ml-64"
        )}
      >
        <header className="sticky top-0 z-40 border-b border-border bg-background">
          <Container className="flex h-16 items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <motion.button
                ref={menuButtonRef}
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-surface-raised text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                whileTap={reduceMotion ? undefined : { scale: 0.95 }}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2 }}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </motion.button>

              <div className="md:hidden">
                <BrandLogo showText />
              </div>
              <div className="hidden md:block">
                <Input
                  variant="search"
                  placeholder="Buscar productos..."
                   className="w-64 rounded-full border-transparent bg-surface-raised"
                  icon={<Search className="h-4 w-4" />}
                />
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Tooltip content="Notificaciones">
                <motion.div
                  whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    rounded="full"
                    aria-label="Notificaciones, ir a ayuda"
                    onClick={() => navigate(paths.app.help.path)}
                    className="relative"
                  >
                    <Bell className="h-5 w-5" />
                    <Badge
                      variant="primary"
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0"
                    >
                      5
                    </Badge>
                  </Button>
                </motion.div>
              </Tooltip>
              <Tooltip content="Favoritos">
                <motion.div
                  whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    rounded="full"
                    aria-label="Favoritos, ver productos"
                    onClick={() => navigate(paths.app.products.path)}
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </motion.div>
              </Tooltip>
              <Tooltip content="Carrito">
                <motion.div
                  whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    rounded="full"
                    className="relative"
                    aria-label={`Carrito, ${cartCount} ${cartCount === 1 ? "producto" : "productos"}`}
                    onClick={() => navigate(paths.app.cart.path)}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <Badge
                        variant="primary"
                        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0"
                      >
                        {cartCount}
                      </Badge>
                    )}
                  </Button>
                </motion.div>
              </Tooltip>
              <div className="hidden md:block">
                <Link
                  to={paths.app.profile.path}
                  aria-label="Ir a mi perfil"
                  className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <motion.div whileHover={reduceMotion ? undefined : { scale: 1.05 }}>
                    <UserAvatar size="md" />
                  </motion.div>
                </Link>
              </div>
            </div>
          </Container>
        </header>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              onClick={handleMobileMenuClose}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {mobileMenuOpen && (
            <motion.div
              ref={mobileNavRef}
              id="mobile-navigation"
              className="fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-border bg-surface shadow-elevated md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
            >
              <Container className="border-b border-border py-4">
                <Input
                  variant="search"
                  placeholder="Buscar productos..."
                  className="w-full"
                  icon={<Search className="h-4 w-4" />}
                />
              </Container>

              <Container className="py-4">
                <Link
                  to={paths.app.profile.path}
                  onClick={handleMobileMenuClose}
                  className="mb-4 flex items-center gap-3 rounded-card bg-subtle p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <UserAvatar size="md" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {user?.first_name} {user?.last_name || "Usuario"}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user?.username || "usuario@example.com"}
                    </p>
                  </div>
                </Link>

                <NavList variant="mobile" onNavigate={handleMobileMenuClose} />
              </Container>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={cn(
            "fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-surface/95 backdrop-blur transition-[left] duration-300",
            sidebarCollapsed ? "md:left-20" : "md:left-64"
          )}
        >
          <Container className="flex h-16 items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-dark shadow-card">
                <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">Tu carrito</p>
                <p className="truncate text-xs text-muted-foreground">
                  {cartCount} {cartCount === 1 ? "producto" : "productos"}
                </p>
              </div>
            </div>

            <div className="hidden h-1 w-40 overflow-hidden rounded-full bg-surface-raised sm:block">
              <div className="h-full w-1/3 rounded-full bg-accent" />
            </div>

            <Button
              size="sm"
              rounded="full"
              onClick={() => navigate(paths.app.cart.path)}
              aria-label="Ver carrito"
            >
              Ver carrito
            </Button>
          </Container>
        </div>

        <main className="pb-24">{children}</main>
      </div>
    </div>
  )
}
