/**
 * Unica lectura de `import.meta.env.VITE_*` en el cliente.
 *
 * Modo por defecto: mismo origen. Ambas variables vacias significan que el
 * navegador llama a rutas absolutas (`/api/...`, `/auth/...`) sobre el origen
 * actual; en desarrollo las resuelve el proxy de Vite y en produccion el
 * proxy del servidor.
 */

const ABSOLUTE_URL_PATTERN = /^https?:\/\/[^\s/]+/i;

const readEnv = (value: string | undefined): string => (value ?? "").trim();

const trimTrailingSlash = (value: string): string =>
  value.endsWith("/") ? value.slice(0, -1) : value;

const rawApiBaseUrl = readEnv(import.meta.env.VITE_API_URL as string | undefined);
const rawMediaBaseUrl = readEnv(
  import.meta.env.VITE_MEDIA_URL as string | undefined
);

/** Base de la API. Cadena vacia = mismo origen (recomendado). */
export const apiBaseUrl = trimTrailingSlash(rawApiBaseUrl);

/** Base de los archivos de media. Cadena vacia = mismo origen. */
export const mediaBaseUrl = trimTrailingSlash(rawMediaBaseUrl);

/**
 * Resuelve la URL de un archivo de media.
 *
 * - `http(s)://...` y `data:...` se devuelven sin tocar (nunca se les antepone
 *   la base, que es el doble prefijo actual).
 * - El resto se prefija con `mediaBaseUrl`; con la base vacia queda la ruta
 *   relativa (mismo origen).
 * - Vacio o nulo -> `null` para que el llamador use su imagen de respaldo.
 */
export const resolveMediaUrl = (src?: string | null): string | null => {
  const value = (src ?? "").trim();
  if (value === "") return null;
  if (/^https?:\/\//i.test(value) || /^data:/i.test(value)) return value;

  const normalized = value.startsWith("/") ? value : `/${value}`;
  return mediaBaseUrl === "" ? normalized : `${mediaBaseUrl}${normalized}`;
};

const assertAbsoluteOrEmpty = (value: string, variableName: string): void => {
  if (value === "") return;
  if (!ABSOLUTE_URL_PATTERN.test(value)) {
    throw new Error(
      `Configuracion invalida: ${variableName} debe ser una URL absoluta http(s) o quedar vacia para usar el mismo origen. ` +
        `Valor recibido: "${value}". Revisa client/.env y comparalo con client/.env.example.`
    );
  }
};

/**
 * Valida la configuracion de entorno al arrancar la aplicacion. Se invoca una
 * sola vez como efecto de importacion desde `src/app/index.tsx`, de modo que un
 * valor malformado falla en el arranque y no en la primera peticion.
 */
export const assertEnv = (): void => {
  assertAbsoluteOrEmpty(rawApiBaseUrl, "VITE_API_URL");
  assertAbsoluteOrEmpty(rawMediaBaseUrl, "VITE_MEDIA_URL");
};
