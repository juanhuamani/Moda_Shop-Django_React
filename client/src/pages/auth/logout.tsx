import { api } from "@/axios/BaseAxios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui";
import { useAuth } from "@/context/auth-context";

export const LogoutRoute = () => {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();

  useEffect(() => {
    const logout = async () => {
      try {
        // Sin cabecera Authorization: el servidor limpia las cookies httpOnly
        // aunque el access token ya haya expirado.
        await api.post("/auth/logout");
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        localStorage.removeItem("user");
        await refreshAuth();
        navigate("/login");
      }
    };

    const timer = setTimeout(logout, 3000);

    return () => clearTimeout(timer);
  }, [navigate, refreshAuth]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Logging out...</h1>
      <p className="text-gray-600">You are being securely logged out. Please wait.</p>
      <div className="flex items-center justify-center mt-4">
        <Spinner className="h-8 w-8 text-blue-500" />
      </div>
      <p className="text-gray-600 mt-4">Redirecting to login page...</p>
      <p className="text-gray-600 mt-4">If you are not redirected, click <a href="/login" className="text-blue-500">here</a>.</p>
    </div>
  );
};
