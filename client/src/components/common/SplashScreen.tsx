import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import Logo from "@/assets/logo.webp"
import { Spinner } from "@/components/ui"

interface SplashScreenProps {
  onComplete: () => void
}

const stages = [
  { at: 0, label: "Preparando tu experiencia..." },
  { at: 35, label: "Cargando la colección..." },
  { at: 70, label: "Casi listo..." },
  { at: 100, label: "¡Bienvenido a ModaShop!" },
]

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const reduceMotion = useReducedMotion()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((value) => Math.min(100, value + 7))
    }, 70)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress < 100) return

    const timer = window.setTimeout(onComplete, reduceMotion ? 0 : 250)
    return () => window.clearTimeout(timer)
  }, [progress, onComplete, reduceMotion])

  const stage = [...stages].reverse().find((item) => progress >= item.at) ?? stages[0]

  return (
    <motion.div
      key="splash"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background px-6"
      role="status"
      aria-live="polite"
      aria-label="Cargando ModaShop"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.35 } }}
    >
      <motion.div
        className="flex h-24 w-24 items-center justify-center rounded-full bg-accent p-3 shadow-elevated"
        initial={reduceMotion ? false : { scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
      >
        <img src={Logo} alt="ModaShop" className="h-full w-full rounded-full object-cover" />
      </motion.div>

      <motion.div
        className="text-center"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.15 }}
      >
        <p className="text-display font-bold tracking-tight text-foreground">ModaShop</p>
        <p className="mt-1 text-sm text-muted-foreground">Tu tienda de moda online</p>
      </motion.div>

      <motion.div
        className="flex items-center gap-2 text-muted-foreground"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : 0.3 }}
      >
        {progress < 100 ? (
          <Spinner className="h-5 w-5 text-ring" />
        ) : (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-success-foreground text-xs">
            ✓
          </span>
        )}
        <span className="text-sm">{stage.label}</span>
      </motion.div>

      <div
        className="w-full max-w-xs"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-label="Progreso de carga"
      >
        <div className="mb-2 flex justify-between text-xs text-muted-foreground">
          <span>Cargando</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-surface-raised">
          <motion.div
            className="h-full rounded-full bg-ring"
            animate={{ width: `${progress}%` }}
            transition={{ duration: reduceMotion ? 0 : 0.12, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  )
}
