import { useCallback, useState } from 'react'
import { AnimatePresence } from "framer-motion"
import { App } from "./index";
import { SplashScreen } from "@/components/common/SplashScreen";

export function RootShell() {
  const [showSplash, setShowSplash] = useState(true)
  const completeSplash = useCallback(() => setShowSplash(false), [])

  return (
    <>
      <App />
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={completeSplash} />}
      </AnimatePresence>
    </>
  )
}
