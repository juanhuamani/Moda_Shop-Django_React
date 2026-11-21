import type { ReactNode } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/utils/cn";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
  icon?: ReactNode;
  className?: string;
}

export function ErrorState({
  title = "Algo salió mal",
  description = "No pudimos cargar la información. Inténtalo de nuevo.",
  onRetry,
  isRetrying = false,
  icon,
  className,
}: ErrorStateProps) {
  return (
    <div role="alert" className={cn("flex flex-col items-center gap-3 px-4 py-8 text-center", className)}>
      <div
        aria-hidden="true"
        className="mb-1 flex h-16 w-16 items-center justify-center rounded-full bg-danger-light/20 text-danger-light"
      >
        {icon ?? <RefreshCw className="h-7 w-7" />}
      </div>
      <h2 className="text-title font-semibold text-foreground">{title}</h2>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>
      {onRetry && (
        <Button variant="primary" className="mt-3" onClick={onRetry} isLoading={isRetrying}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reintentar
        </Button>
      )}
    </div>
  );
}
