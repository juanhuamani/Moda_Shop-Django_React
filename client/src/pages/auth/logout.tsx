import { authApi } from "@/axios/BaseAxios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui";
import Cookies from 'js-cookie';
import { useAuth } from "@/context/auth-context";

export const LogoutRoute = () => {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();

  useEffect(() => {
    const token = Cookies.get("access_token");

    const logout = async () => {
      try {
        await authApi.post("/logout", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        await refreshAuth();
        navigate("/login"); 
      }
    };

    setTimeout(() => {
      if (token) {
        logout();
      } else {
        navigate("/login");
      }
    }, 3000);
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
