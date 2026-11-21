import { motion, useReducedMotion, type Transition, type Variants } from "framer-motion";
import { ReactNode, useMemo } from "react";

interface AnimatedPageProps {
  children: ReactNode;
  className?: string;
  variant?: "fade" | "slide" | "zoom" | "flip" | "rotate" | "random" | "bounce";
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

type SlideDirection = "up" | "down" | "left" | "right";
type SimpleVariant = "fade" | "zoom" | "flip" | "rotate" | "bounce";

const slideVariants: Record<SlideDirection, Variants> = {
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
};

const variants: Record<SimpleVariant, Variants> = {
  fade: {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    exit: { opacity: 0 },
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

type TransitionKey = "default" | "smooth" | "bounce" | "elastic" | "slow";

const transitions: Record<TransitionKey, Transition> = {
  default: { duration: 0.5 },
  smooth: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  bounce: { type: "spring", stiffness: 300, damping: 20 },
  elastic: { type: "spring", stiffness: 400, damping: 15 },
  slow: { duration: 1, ease: "easeInOut" },
};

export const AnimatedPage = ({
  children,
  className = "",
  variant = "fade",
  direction = "right",
  duration = 0.25,
}: AnimatedPageProps) => {
  const reduceMotion = useReducedMotion()

  const pageMotion = useMemo<{ variants: Variants; transition: Transition }>(() => {
    if (reduceMotion) {
      return {
        variants: {
          initial: { opacity: 1 },
          in: { opacity: 1 },
          exit: { opacity: 1 },
        },
        transition: { duration: 0 },
      }
    }

    if (variant === "random") {
      return { variants: variants.fade, transition: { ...transitions.default, duration } }
    }

    if (variant === "slide") {
      return {
        variants: slideVariants[direction],
        transition: { ...transitions.smooth, duration },
      }
    }

    const transition: Transition =
      variant === "bounce"
        ? transitions.bounce
        : variant === "flip" || variant === "rotate"
          ? transitions.smooth
          : { ...transitions.default, duration }

    return { variants: variants[variant], transition }
  }, [variant, direction, duration, reduceMotion])

  return (
    <motion.div
      className={`animated-page ${className}`}
      initial={reduceMotion ? false : "initial"}
      animate="in"
      exit="exit"
      variants={pageMotion.variants}
      transition={pageMotion.transition}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        perspective: variant === "flip" ? "1200px" : undefined,
        transformStyle: variant === "flip" ? "preserve-3d" : undefined,
      }}
    >
      {children}
    </motion.div>
  );
};
