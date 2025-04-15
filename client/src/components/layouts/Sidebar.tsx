import { Link } from "react-router-dom"
import {  ChevronRight } from 'lucide-react'
import { UserAvatar } from "../ui/UserAvatar"
import { sidebarItems } from "@/constants/sidebar-item"

import { useUser } from "@/context/user-context";

interface SidebarProps {
  mobileMenuOpen?: boolean
  onMobileMenuClose?: () => void
}

export function Sidebar({ mobileMenuOpen, onMobileMenuClose }: SidebarProps) {
  const { user } = useUser();
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r border-[hsl(224,34%,30%)] bg-[hsl(224,34%,22%)] md:block">
        <div className="flex h-16 items-center border-b border-[hsl(224,34%,30%)] px-4">
          <div className="flex items-center">
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
          </div>
        </div>

        <div className="px-4 py-6">
          <div className="mb-6">
            <div className="flex items-center gap-3 px-2 py-3">
              <UserAvatar  />
              <div>
                <p className="text-sm font-medium text-[hsl(215,100%,92%)]">{user?.first_name} {user?.last_name}</p>
                <p className="text-xs text-tertiary">{user?.username}</p>
              </div>
            </div>
          </div>

          <nav>
            <ul className="space-y-1">
              {sidebarItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.href}
                    className={`flex items-center gap-3 rounded-md px-2 py-2 text-[hsl(215,100%,92%)] transition-colors hover:bg-[hsl(224,34%,25%)] ${
                      item.href === "/home" ? "bg-[hsl(224,34%,25%)]" : ""
                    }`}
                  >
                    <item.icon className="h-6 w-6" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="border-t border-[hsl(224,34%,30%)] bg-[hsl(220,47%,10%)] md:hidden">
          <div className="p-4">
            <nav>
              <ul className="space-y-2">
                {sidebarItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.href}
                      className="flex items-center justify-between rounded-md p-2 text-[hsl(215,100%,92%)] hover:bg-[hsl(224,34%,25%)]"
                      onClick={onMobileMenuClose}
                    >
                      <div className="flex items-center gap-3">
                      <item.icon className="h-6 w-6" />
                      <span>{item.title}</span>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}