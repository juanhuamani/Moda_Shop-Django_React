import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Button, Spinner } from "@/components/ui";
import { StatusPage } from "@/components/common/StatusPage";

export const AppRoot = () => {
  return (
    <Suspense
      fallback={
        <div
          className="flex min-h-[40vh] items-center justify-center"
          role="status"
          aria-live="polite"
        >
          <Spinner className="h-6 w-6 text-ring" />
          <span className="sr-only">Cargando página...</span>
        </div>
      }
    >
      <Outlet />
    </Suspense>
  );
};

export const AppRootErrorBoundary = ({ reset }: { reset?: () => void }) => {
  return (
    <StatusPage
      code="500"
      tone="error"
      title="Algo salió mal"
      description="No pudimos cargar esta sección. Inténtalo de nuevo más tarde."
      action={
        reset ? (
          <Button variant="primary" onClick={reset}>
            Reintentar
          </Button>
        ) : null
      }
    />
  );
};
