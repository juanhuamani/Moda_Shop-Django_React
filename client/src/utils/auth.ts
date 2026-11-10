import { AxiosError } from "axios";
import { api, refreshOnce } from "@/axios/BaseAxios";

/**
 * Determina si hay sesion activa sin leer tokens desde JavaScript.
 *
 * 1. `GET /auth/session` -> 204 si la cookie de acceso es valida.
 * 2. Si responde 401, se intenta **un** refresco con la cookie de refresco
 *    (`refreshOnce`, el unico propietario del refresco) y se informa el
 *    resultado.
 *
 * Nunca redirige: una visita anonima a una pagina publica permanece en ella.
 */
export const bootstrapAuth = async (): Promise<boolean> => {
  try {
    await api.get("/auth/session");
    return true;
  } catch (error) {
    const status = (error as AxiosError).response?.status;
    if (status !== 401) {
      return false;
    }
  }

  try {
    await refreshOnce();
    return true;
  } catch {
    // Single mecanismo de limpieza de la cache de usuario.
    localStorage.removeItem("user");
    return false;
  }
};
