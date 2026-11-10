import { AppRouter } from "./router";
import { UserProvider } from "@/context/user-context";
import { AuthProvider } from "@/context/auth-context";
import { assertEnv } from "@/config/env";

import "react-modern-drawer/dist/index.css";
import "./i18n";
import { ToastContainer } from "react-toastify"

// Falla en el arranque (antes de renderizar) si `VITE_API_URL`/`VITE_MEDIA_URL`
// no son validas, en lugar de fallar en la primera peticion.
assertEnv();

export const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <ToastContainer/>
        <AppRouter />
      </UserProvider>
    </AuthProvider>
  );
};
