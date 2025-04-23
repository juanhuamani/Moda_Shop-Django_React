import { authApi } from "@/axios/BaseAxios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  exp: number;
  [key: string]: unknown;
};

const extraTime = 30;

export const checkAuthCookie = async (): Promise<boolean> => {
  try {
    const authCookie = Cookies.get("access_token");
    if (!authCookie) {
      return false;
    }
    const decodedToken = jwtDecode<JwtPayload>(authCookie);
    const expirationTime = decodedToken.exp;
    const currentTime = Date.now() / 1000;

    if (currentTime + extraTime > expirationTime) {
      console.log("El token está próximo a expirar. Actualizando...");
      return await refreshToken();
    } 
    else{
      console.log("El token está dentro del tiempo de vida.");
      return true;
    }
  } catch (error) {
    console.error("Token inválido o mal formado:", error);
    return false;
  }
};

const refreshToken = async (): Promise<boolean> => {
  const refreshToken = Cookies.get("refresh_token");
  if (!refreshToken) {
    return false;
  }

  try {
    const res = await authApi.post("/refresh", { refresh: refreshToken });
    const { access, refresh } = res.data;
    Cookies.set("access_token", access, { secure: true, sameSite: 'Strict' });
    Cookies.set("refresh_token", refresh, { secure: true, sameSite: 'Strict' });
    console.log("Esto es true porque el token se actualizo");
    return true;
  } catch (error) {
    console.error("Error al actualizar el token:", error);
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    return false;
  }
};
