import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react';

import { api } from '@/axios/BaseAxios';
import { User } from '@/types/User';
import { useAuth } from '@/context/auth-context';

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  uploadUser: (userData: User) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
  uploadUser: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const loadUser = async () => {
      // Cache solo para el primer pintado; la respuesta del servidor manda.
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser) as User);
        } catch {
          localStorage.removeItem('user');
        }
      }

      try {
        const response = await api.get('/auth/profile');
        const userData: User = response.data.user;
        if (!cancelled && userData) {
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadUser();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const uploadUser = async (userData: User) => {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    };

  return (
    <UserContext.Provider value={{ user, uploadUser, isLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
