import { AppRouter } from "./router";
import { UserProvider } from "@/context/user-context";
import { AuthProvider } from "@/context/auth-context";

import "react-modern-drawer/dist/index.css";
import "./i18n";
import { ToastContainer } from "react-toastify"

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
