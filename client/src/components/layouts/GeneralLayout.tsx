import type React from "react"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, Bell, Heart, ShoppingCart, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { UserAvatar } from "@/components/ui/UserAvatar"
import { Badge, Button, Input } from "@/components/ui"
import { Tooltip } from "@/components/ui/ToolTip"
import { Sidebar } from "./Sidebar"
import { sidebarItems } from "@/constants/sidebar-item"
import { useUser } from "@/context/user-context"
import { paths } from "@/config/paths"

export function GeneralLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user } = useUser()
  
  useEffect(() => {
    if (mobileMenuOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY

      // Add styles to prevent scrolling and maintain position
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
    } else {
      // Get the scroll position from the body's top property
      const scrollY = document.body.style.top

      // Remove the styles that prevent scrolling
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""

      // Restore the scroll position
      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY || "0", 10) * -1)
      }
    }

    // Cleanup function to ensure scrolling is re-enabled if component unmounts
    return () => {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
    }
  }, [mobileMenuOpen])

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false)
  }


  return (
    <div className="flex min-h-screen bg-[hsl(220,47%,10%)]">
      {/* Desktop Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-[hsl(224,34%,30%)] bg-[hsl(220,47%,10%)]">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <motion.button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(224,34%,25%)] text-[hsl(215,100%,92%)] md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
                whileHover={{
                  backgroundColor: "hsl(224,34%,28%)",
                  transition: { duration: 0.2 },
                }}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </motion.button>

              <div className="md:hidden">
                <Link to="/home" className="flex items-center">
                  <motion.div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(215,100%,92%)]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-[hsl(220,47%,10%)]"
                    >
                      <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M2 15h10" />
                      <path d="m9 18 3-3-3-3" />
                    </svg>
                  </motion.div>
                  <span className="ml-2 text-xl font-bold text-[hsl(215,100%,92%)]">ModaShop</span>
                </Link>
              </div>
              <div className="hidden md:block">
                <Input
                  variant="search"
                  placeholder="Buscar productos..."
                  className="w-64"
                  icon={<Search className="h-4 w-4" />}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Tooltip content="Notificaciones">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="icon" className="relative">
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
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                </motion.div>
              </Tooltip>
              <Tooltip content="Carrito">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <Badge
                      variant="primary"
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0"
                    >
                      3
                    </Badge>
                  </Button>
                </motion.div>
              </Tooltip>
              <div className="hidden md:block">
                <Link to={paths.app.profile.path}>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <UserAvatar size="md" />
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Background Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        {/* Mobile Menu with AnimatePresence for smooth enter/exit animations */}
        <AnimatePresence mode="wait">
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-x-0 top-16 z-40 overflow-hidden bg-[hsl(224,34%,22%)] shadow-lg md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: {
                  height: { duration: 0.3 },
                  opacity: { duration: 0.2 },
                },
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: {
                  height: { duration: 0.2 },
                  opacity: { duration: 0.1 },
                },
              }}
            >
              {/* Mobile Search */}
              <motion.div
                className="border-b border-[hsl(224,34%,30%)] p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                <Input
                  variant="search"
                  placeholder="Buscar productos..."
                  className="w-full bg-[hsl(224,34%,18%)] focus-within:ring-2 focus-within:ring-[hsl(215,100%,70%)]"
                  icon={<Search className="h-4 w-4" />}
                />
              </motion.div>

              {/* Mobile Sidebar Items */}
              <motion.div
                className="max-h-[calc(100vh-8rem)] overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <div className="p-4">
                  <motion.div
                    className="mb-4 rounded-lg bg-[hsl(224,34%,18%)] p-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center gap-3">
                      <Link to={paths.app.profile.path}>
                        <motion.div whileHover={{ scale: 1.1 }}>
                          <UserAvatar size="md"/>
                        </motion.div>
                      </Link>
                      <div>
                        <p className="text-sm font-medium text-[hsl(215,100%,92%)]">
                          {user?.first_name} {user?.last_name || "Usuario"}
                        </p>
                        <p className="text-xs text-[hsl(215,100%,80%)]">{user?.username || "usuario@example.com"}</p>
                      </div>
                    </div>
                  </motion.div>

                  <nav>
                    <ul className="space-y-2">
                      {sidebarItems.map((item, index) => (
                        <motion.li
                          key={index}
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 },
                          }}
                          initial="hidden"
                          animate="visible"
                          transition={{
                            delay: 0.25 + index * 0.05,
                            duration: 0.2,
                          }}
                          whileHover={{
                            scale: 1.02,
                            backgroundColor: "hsl(224,34%,25%)",
                            transition: { duration: 0.2 },
                          }}
                          className="rounded-md"
                        >
                          <Link
                            to={item.href}
                            className="flex items-center justify-between rounded-md p-3 text-[hsl(215,100%,92%)]"
                            onClick={handleMobileMenuClose}
                          >
                            <div className="flex items-center gap-3">
                              <motion.div
                                className="flex h-8 w-8 items-center justify-center rounded-md bg-[hsl(224,34%,18%)]"
                                whileHover={{
                                  backgroundColor: "hsl(215,100%,70%)",
                                  color: "hsl(220,47%,10%)",
                                  transition: { duration: 0.2 },
                                }}
                              >
                                <item.icon className="h-5 w-5" />
                              </motion.div>
                              <span className="font-medium">{item.title}</span>
                            </div>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 + index * 0.05 }}
                            >
                              <div className="h-2 w-2 rounded-full bg-[hsl(215,100%,70%)]" />
                            </motion.div>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content - Children */}
        <main>{children}</main>
      </div>
    </div>
  )
}
