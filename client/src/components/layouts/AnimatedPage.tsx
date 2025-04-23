import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface AnimatedPageProps {
  children: ReactNode;
  className?: string;
  variant?: "fade" | "slide" | "zoom" | "flip" | "rotate" | "random" | "bounce";
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

const variants = {
  fade: {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    up: {
      initial: { opacity: 0, y: 50 },
      in: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -50 },
    },
    down: {
      initial: { opacity: 0, y: -50 },
      in: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 50 },
    },
    left: {
      initial: { opacity: 0, x: 50 },
      in: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
    },
    right: {
      initial: { opacity: 0, x: -50 },
      in: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 50 },
    },
  },
  zoom: {
    initial: { opacity: 0, scale: 0.8 },
    in: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.2 },
  },
  flip: {
    initial: { opacity: 0, rotateY: 90 },
    in: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: -90 },
  },
  rotate: {
    initial: { opacity: 0, rotate: -10, scale: 0.95 },
    in: { opacity: 1, rotate: 0, scale: 1 },
    exit: { opacity: 0, rotate: 10, scale: 0.95 },
  },
  bounce: {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    in: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.9 },
  },
};

const transitions = {
  default: { duration: 0.5 },
  smooth: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  bounce: { type: "spring", stiffness: 300, damping: 20 },
  elastic: { type: "spring", stiffness: 400, damping: 15 },
  slow: { duration: 1, ease: "easeInOut" },
};

export const AnimatedPage = ({ 
  children, 
  className = "", 
  variant = "random", 
  direction = "right",
  duration = 0.5
}: AnimatedPageProps) => {
  const [currentVariant, setCurrentVariant] = useState<any>(null);
  const [currentTransition, setCurrentTransition] = useState<any>(null);

  useEffect(() => {
    if (variant === "random") {
      const options = ["fade", "slide", "zoom", "flip", "rotate", "bounce"];
      const randomVariant = options[Math.floor(Math.random() * options.length)];
      
      if (randomVariant === "slide") {
        const directions = ["up", "down", "left", "right"];
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        setCurrentVariant(variants.slide[randomDirection]);
      } else {
        setCurrentVariant(variants[randomVariant]);
      }
      
      const transitionOptions = ["default", "smooth", "bounce", "elastic", "slow"];
      const randomTransition = transitionOptions[Math.floor(Math.random() * transitionOptions.length)];
      setCurrentTransition({...transitions[randomTransition], duration});
    } else if (variant === "slide") {
      setCurrentVariant(variants.slide[direction]);
      setCurrentTransition({...transitions.smooth, duration});
    } else {
      setCurrentVariant(variants[variant]);
      
      if (variant === "bounce") {
        setCurrentTransition(transitions.bounce);
      } else if (variant === "flip" || variant === "rotate") {
        setCurrentTransition(transitions.smooth);
      } else {
        setCurrentTransition({...transitions.default, duration});
      }
    }
  }, [variant, direction, duration]);

  if (!currentVariant || !currentTransition) {
    return null;
  }

  return (
    <motion.div
      className={`animated-page ${className}`}
      initial="initial"
      animate="in"
      exit="exit"
      variants={currentVariant}
      transition={currentTransition}
      style={{ 
        position: "relative", 
        width: "100%", 
        height: "100%",
        perspective: variant === "flip" ? "1200px" : undefined,
        transformStyle: variant === "flip" ? "preserve-3d" : undefined,
      }}
    >
      {(variant === "zoom" || variant === "rotate") && (
        <motion.div
          className="backdrop-blur"
          initial={{ backdropFilter: "blur(8px)" }}
          animate={{ backdropFilter: "blur(0px)" }}
          exit={{ backdropFilter: "blur(8px)" }}
          transition={{ duration: duration * 0.8 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            pointerEvents: "none",
          }}
        />
      )}
      
      {children}
    </motion.div>
  );
};