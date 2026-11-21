import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/utils/cn"
import { paths } from "@/config/paths"

interface BrandLogoProps {
  className?: string
  showText?: boolean
}

export function BrandLogo({ className, showText = true }: BrandLogoProps) {
  const reduceMotion = useReducedMotion()

  return (
    <Link
      to={paths.app.root.path}
      aria-label="ModaShop - Inicio"
      className={cn(
        "flex items-center gap-2 rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <motion.div
        className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-dark shadow-card"
        whileHover={reduceMotion ? undefined : { scale: 1.05 }}
        whileTap={reduceMotion ? undefined : { scale: 0.95 }}
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
      </motion.div>
      {showText && (
        <motion.span
          className="text-heading font-bold text-foreground"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
        >
          ModaShop
        </motion.span>
      )}
    </Link>
  )
}
