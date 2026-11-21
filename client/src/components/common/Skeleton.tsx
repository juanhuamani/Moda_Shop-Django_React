import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  rounded?: "card" | "control" | "full";
}

export function Skeleton({ className, rounded = "control", ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-surface-raised motion-reduce:animate-none",
        rounded === "card" && "rounded-card",
        rounded === "control" && "rounded-control",
        rounded === "full" && "rounded-full",
        className
      )}
      {...props}
    />
  );
}
