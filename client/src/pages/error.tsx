import type { FC } from "react";
import { Link } from "react-router-dom";
import { paths } from "@/config/paths";
import { buttonVariants } from "@/components/ui/Button";
import { StatusPage } from "@/components/common/StatusPage";

export const ErrorRoute: FC = () => {
  return (
    <StatusPage
      code="500"
      tone="error"
      title="Algo salió mal"
      description="Lo sentimos, ocurrió un error inesperado. Inténtalo de nuevo más tarde."
      action={
        <Link
          to={paths.auth.login.getHref()}
          replace
          className={buttonVariants({ variant: "primary" })}
        >
          Ir al inicio de sesión
        </Link>
      }
    />
  );
};
