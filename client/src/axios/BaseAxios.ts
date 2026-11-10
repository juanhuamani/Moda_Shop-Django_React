import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { apiBaseUrl } from "@/config/env";

/**
 * Instancia unica de la API.
 *
 * La autenticacion viaja en cookies httpOnly: no hay cabecera `Authorization`
 * ni token legible desde JavaScript. Con `apiBaseUrl` vacio las rutas se
 * resuelven contra el origen actual, por eso **todas** las llamadas pasan una
 * ruta absoluta (`/api/...` o `/auth/...`).
 */
export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

type RetriableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };

/** Rutas que nunca se reintentan ni se refrescan (emiten o verifican tokens). */
const REFRESH_SKIP_PATHS = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh",
  "/auth/session",
];

let refreshPromise: Promise<void> | null = null;

/**
 * Unico propietario del refresco de sesion.
 *
 * Single-flight: las llamadas concurrentes esperan la misma promesa. La promesa
 * se limpia en `finally` para que una expiracion posterior pueda refrescar de
 * nuevo.
 */
export const refreshOnce = (): Promise<void> => {
  refreshPromise ??= api
    .post("/auth/refresh")
    .then(() => undefined)
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};

const isTokenNotValid = (error: AxiosError): boolean => {
  const data = error.response?.data as { code?: string } | undefined;
  return data?.code === "token_not_valid";
};

const isRefreshSkipped = (url: string | undefined): boolean =>
  REFRESH_SKIP_PATHS.some((path) => (url ?? "").startsWith(path));

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetriableRequestConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !config ||
      config._retry ||
      !isTokenNotValid(error) ||
      isRefreshSkipped(config.url)
    ) {
      return Promise.reject(error);
    }

    // Exactamente un reintento por peticion.
    config._retry = true;

    try {
      await refreshOnce();
    } catch {
      // Sin redireccion aqui: solo `ProtectedRoute` navega al login.
      localStorage.removeItem("user");
      return Promise.reject(error);
    }

    return api(config);
  }
);
