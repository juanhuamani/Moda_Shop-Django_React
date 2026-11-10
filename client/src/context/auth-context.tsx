import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { bootstrapAuth } from "@/utils/auth";
import LoadingPage from "@/components/common/LoadingPage";

type AuthContextType = {
  isAuthenticated: boolean | null;
  refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const refreshAuth = useCallback(async () => {
    setIsAuthenticated(null);
    const valid = await bootstrapAuth();
    setIsAuthenticated(valid);
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  if (isAuthenticated === null) {
   return  <LoadingPage message="Verificando autenticación..." />; 
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return context;
};
