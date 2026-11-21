import type { CSSProperties } from "react";
import { AppRouter } from "./router";
import { UserProvider } from "@/context/user-context";
import { AuthProvider } from "@/context/auth-context";
import { assertEnv } from "@/config/env";

import "react-modern-drawer/dist/index.css";
import "react-toastify/dist/ReactToastify.css";
import "./i18n";
import { ToastContainer } from "react-toastify"

const toastTheme = {
  "--toastify-color-dark": "var(--color-surface-raised)",
  "--toastify-text-color-dark": "var(--color-foreground)",
  "--toastify-color-info": "var(--color-info-light)",
  "--toastify-color-success": "var(--color-success-light)",
  "--toastify-color-warning": "var(--color-warning-light)",
  "--toastify-color-error": "var(--color-danger-light)",
  "--toastify-color-progress-dark": "var(--color-accent)",
  "--toastify-toast-background": "var(--color-surface-raised)",
  "--toastify-font-family": "var(--font-sans)",
  "--toastify-toast-bd-radius": "var(--radius-control)",
  "--toastify-toast-shadow": "var(--shadow-card)",
} as CSSProperties;

assertEnv();

export const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <ToastContainer
          theme="dark"
          style={toastTheme}
          className="text-sm text-foreground"
          toastClassName="border border-card-border rounded-control shadow-card"
          progressClassName="bg-accent"
        />
        <AppRouter />
      </UserProvider>
    </AuthProvider>
  );
};
