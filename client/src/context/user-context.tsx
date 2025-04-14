import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react';

import { authApi } from '@/axios/BaseAxios';
import { User } from '@/types/User';
import Cookies from 'js-cookie';

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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          return;
        }
        const token = Cookies.get('access_token');
        const response = await authApi.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData: User = response.data.user;
        if (userData) {
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        }
      } catch (error) {
        console.error('Error loading user data:', error);

      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = (userData: User) => {
    console.log('userData', userData);
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