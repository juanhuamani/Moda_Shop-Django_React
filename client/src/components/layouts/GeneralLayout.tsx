"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, Bell, Heart, ShoppingCart, Menu, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Badge, Button, Input } from "@/components/ui"
import { Tooltip } from "@/components/ui/ToolTip"
import { Sidebar } from "./Sidebar"

export function GeneralLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false)
  }

  return (
      <div className="flex min-h-screen bg-[hsl(220,47%,10%)]">
        {/* Sidebar Component */}
        <Sidebar mobileMenuOpen={mobileMenuOpen} onMobileMenuClose={handleMobileMenuClose} />

        {/* Main Content */}
        <div className="flex-1 md:ml-64">
          {/* Header */}
          <header className="sticky top-0 z-40 border-b border-[hsl(224,34%,30%)] bg-[hsl(220,47%,10%)]">
            <div className="flex h-16 items-center justify-between px-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
                <div className="md:hidden">
                  <Link to="/home" className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(215,100%,92%)]">
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
                    </div>
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
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge
                      variant="primary"
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0"
                    >
                      5
                    </Badge>
                  </Button>
                </Tooltip>
                <Tooltip content="Favoritos">
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                </Tooltip>
                <Tooltip content="Carrito">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <Badge
                      variant="primary"
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0"
                    >
                      3
                    </Badge>
                  </Button>
                </Tooltip>
                <div className="hidden md:block">
                  <Avatar size="sm">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>

            {/* Mobile Search */}
            {mobileMenuOpen && (
              <div className="border-t border-[hsl(224,34%,30%)] bg-[hsl(220,47%,10%)] p-4 md:hidden">
                <Input
                  variant="search"
                  placeholder="Buscar productos..."
                  className="mb-4"
                  icon={<Search className="h-4 w-4" />}
                />
              </div>
            )}
          </header>

          {/* Main content - Children */}
          <main>{children}</main>
        </div>
      </div>
  )
}
