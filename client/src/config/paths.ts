export const paths = {
    home: {
      path: "/",
      getHref: () => "/",
    },
  
    error: {
      path: "/error",
      getHref: () => "/error",
    },
  
    auth: {
      register: {
        path: "/register",
        getHref: (redirectTo?: string | null | undefined) =>
          `/register${
            redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
          }`,
      },
      login: {
        path: "/login",
        getHref: (redirectTo?: string | null | undefined) =>
          `/login${
            redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
          }`,
      },
      forgotPassword: {
        path: "/forgot-password",
        getHref: () => "/forgot-password",
      },
      passwordReset: {
        path: "/password-reset",
        getHref: () => "/password-reset",
      },
      logout: {
        path: "/logout",
        getHref: () => "/logout",
      },
    },
  
    app: {
      root: {
        path: "/app",
        getHref: () => "/app",
      },
      profile: {
        path: "/app/profile",
        getHref: () => "/app/profile",
      },
      settings: {
        path: "/app/settings",
        getHref: () => "/app/settings",
      },
      products: {
        path: "/app/products",
        getHref: () => "/app/products", 
      },
      categories: {
        path: "/app/categories",
        getHref: () => "/app/categories", 
      },
      cart: {
        path: "/app/cart",
        getHref: () => "/app/cart", 
      },
      discounts: {
        path: "/app/discounts",
        getHref: () => "/app/discounts",
      },
      help: {
        path: "/app/help",
        getHref: () => "/app/help",
      },
      customers: {
        path: "/app/customers",
        getHref: () => "/app/customers",
      },
    },
  } as const;
  