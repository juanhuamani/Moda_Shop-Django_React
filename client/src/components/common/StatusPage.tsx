import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui";
import { cn } from "@/utils/cn";

type StatusTone = "default" | "error" | "success";

interface StatusPageProps {
  title: string;
  description: string;
  code?: string | number;
  action?: ReactNode;
  tone?: StatusTone;
  className?: string;
}

const codeToneClasses: Record<StatusTone, string> = {
  default: "text-success-light",
  error: "text-danger-light",
  success: "text-success-light",
};

const accentToneClasses: Record<StatusTone, string> = {
  default: "bg-accent",
  error: "bg-danger",
  success: "bg-success",
};

export function StatusPage({
  title,
  description,
  code,
  action,
  tone = "default",
  className,
}: StatusPageProps) {
  return (
    <main
      tabIndex={-1}
      className={cn(
        "flex min-h-[60vh] w-full items-center justify-center bg-background px-4 py-12 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-6 sm:py-16",
        className
      )}
    >
      <Card className="w-full max-w-xl shadow-elevated">
        <CardContent className="flex flex-col items-center gap-4 px-5 py-10 text-center sm:px-10 sm:py-12">
          <div aria-hidden="true" className={cn("h-1 w-12 rounded-full", accentToneClasses[tone])} />
          {code !== undefined && (
            <span
              aria-hidden="true"
              className={cn(
                "text-display font-semibold leading-none tracking-tight",
                codeToneClasses[tone]
              )}
            >
              {code}
            </span>
          )}
          <h1
            className={cn(
              "font-semibold leading-tight tracking-tight text-foreground",
              code === undefined ? "text-heading sm:text-display" : "text-title sm:text-heading"
            )}
          >
            {title}
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
          {action && (
            <div className="mt-2 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
              {action}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

export default StatusPage;
