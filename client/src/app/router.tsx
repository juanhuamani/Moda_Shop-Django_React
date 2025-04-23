import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { paths } from "@/config/paths";
import { useMemo } from "react";
import { AppRoot, AppRootErrorBoundary } from "@/app/root";

import { GeneralLayout } from "@/components/layouts/GeneralLayout";
import AuthLayout from "@/components/layouts/AuthLayout";
import { GuestRoute } from "@/components/route/GuestRoute";
import { ProtectedRoute } from "@/components/route/ProtectedRoute";

// eslint-disable-next-line react-refresh/only-export-components
export const createAppRouter = () =>
  createBrowserRouter(
    [
      {
        path: paths.home.path,
        lazy: async () => {
          const { LandingRoute } = await import("@/pages/landing");
          return { Component: LandingRoute };
        },
      },
      {
        element: (
          <GuestRoute>
            <AuthLayout>
              <AppRoot />
            </AuthLayout>
          </GuestRoute>
        ),
        ErrorBoundary: AppRootErrorBoundary,
        children: [
          {
            path: paths.auth.register.path,
            lazy: async () => {
              const { RegisterRoute } = await import("@/pages/auth/register");
              return { Component: RegisterRoute };
            },
          },
          {
            path: paths.auth.login.path,
            lazy: async () => {
              const { LoginRoute } = await import("@/pages/auth/login");
              return { Component: LoginRoute };
            },
          },
        ],
      },
      {
        path: paths.error.path,
        lazy: async () => {
          const { ErrorRoute } = await import("@/pages/error");
          return { Component: ErrorRoute };
        },
      },
      {
        path: paths.app.root.path,
        element: (
          <ProtectedRoute>
              <GeneralLayout>
                <AppRoot />
              </GeneralLayout>
          </ProtectedRoute>
                
        ),
        ErrorBoundary: AppRootErrorBoundary,
        children: [
          {
            path: paths.app.root.path,
            lazy: async () => {
              const { HomePage } = await import("@/pages/app/home");
              return {
                Component: HomePage,
              };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.app.products.path,
            lazy: async () => {
              const { ProductsRoute } = await import("@/pages/app/products");
              return {
                Component: ProductsRoute,
              };
            },
          },
          {
            path: paths.app.cart.path,
            lazy: async () => {
              const { CartPage } = await import("@/pages/app/cart");
              return {
                Component: CartPage,
              };
            },
          },
          {
            path: paths.app.profile.path,
            lazy: async () => {
              const { ProfileRoute } = await import("@/pages/app/profile");
              return {
                Component: ProfileRoute,
              };
            }
          }
        ],
      },
      {
        path: paths.auth.logout.path,
        element: (
            <AppRoot />
        ),
        ErrorBoundary: AppRootErrorBoundary,
        children: [
          {
            path: paths.auth.logout.path,
            lazy: async () => {
              const { LogoutRoute } = await import("@/pages/auth/logout");
              return { Component: LogoutRoute };
            },
          },
        ],
      },
      {
        path: "*",
        lazy: async () => {
          const { NotFoundRoute } = await import("@/pages/not-found");
          return { Component: NotFoundRoute };
        },
      },
    ],
  );

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);

  return (
    <RouterProvider router={router} />
  );
};
