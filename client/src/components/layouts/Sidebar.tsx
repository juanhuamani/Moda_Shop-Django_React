"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { UserAvatar } from "../ui/UserAvatar"
import { sidebarItems } from "@/constants/sidebar-item"
import { useUser } from "@/context/user-context"


export function Sidebar() {
  const { user } = useUser()

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
    hover: {
      backgroundColor: "hsl(224,34%,25%)",
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r border-[hsl(224,34%,30%)] bg-[hsl(224,34%,22%)] md:block">
      <div className="flex h-16 items-center border-b border-[hsl(224,34%,30%)] px-4">
        <div className="flex items-center">
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
          <motion.span
            className="ml-2 text-xl font-bold text-[hsl(215,100%,92%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            ModaShop
          </motion.span>
        </div>
      </div>

      <div className="px-4 py-6">
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 rounded-lg bg-[hsl(224,34%,18%)] px-2 py-3">
            <motion.div whileHover={{ scale: 1.1 }}>
              <UserAvatar />
            </motion.div>
            <div>
              <p className="text-sm font-medium text-[hsl(215,100%,92%)]">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-xs text-tertiary">{user?.username}</p>
            </div>
          </div>
        </motion.div>

        <nav>
          <ul className="space-y-1">
            {sidebarItems.map((item, index) => (
              <motion.li
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                whileHover="hover"
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 rounded-md px-2 py-2 text-[hsl(215,100%,92%)] transition-colors ${
                    item.href === "/home" ? "bg-[hsl(224,34%,25%)]" : ""
                  }`}
                >
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
                  <span>{item.title}</span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
