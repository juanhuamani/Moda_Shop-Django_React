import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3 px-4 py-8 text-center", className)}>
      {icon && (
        <div
          aria-hidden="true"
          className="mb-1 flex h-16 w-16 items-center justify-center rounded-full bg-surface-raised text-muted-foreground"
        >
          {icon}
        </div>
      )}
      <h2 className="text-title font-semibold text-foreground">{title}</h2>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>
      {action && (
        <div className="mt-3 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          {action}
        </div>
      )}
    </div>
  );
}
