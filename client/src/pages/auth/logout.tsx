import { api } from "@/axios/BaseAxios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui";
import { buttonVariants } from "@/components/ui/Button";
import { useAuth } from "@/context/auth-context";
import { StatusPage } from "@/components/common/StatusPage";
import { paths } from "@/config/paths";

export const LogoutRoute = () => {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();

  useEffect(() => {
    const logout = async () => {
      try {
        await api.post("/auth/logout");
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        localStorage.removeItem("user");
        await refreshAuth();
        navigate(paths.auth.login.getHref());
      }
    };

    const timer = setTimeout(logout, 3000);

    return () => clearTimeout(timer);
  }, [navigate, refreshAuth]);

  return (
    <StatusPage
      title="Cerrando sesión..."
      description="Estamos cerrando tu sesión de forma segura. Serás redirigido al inicio de sesión."
      action={
        <div className="flex flex-col items-center gap-4">
          <div role="status" aria-live="polite">
            <Spinner className="h-8 w-8 text-info-light" />
          </div>
          <Link to={paths.auth.login.getHref()} className={buttonVariants({ variant: "link" })}>
            Ir al inicio de sesión
          </Link>
        </div>
      }
    />
  );
};
