import { Link } from "react-router-dom";
import { paths } from "@/config/paths";
import { buttonVariants } from "@/components/ui/Button";
import { StatusPage } from "@/components/common/StatusPage";

export const NotFoundRoute = () => {
  return (
    <StatusPage
      code="404"
      title="Página no encontrada"
      description="Lo sentimos, la página que buscas no existe o ha sido movida."
      action={
        <Link
          to={paths.home.getHref()}
          replace
          className={buttonVariants({ variant: "primary" })}
        >
          Volver al inicio
        </Link>
      }
    />
  );
};
