import { Navigate } from 'react-router-dom';
import { paths } from '@/config/paths';
import  LoadingPage  from '@/components/common/LoadingPage';
import { JSX } from 'react';
import { useAuth } from '@/context/auth-context';
import { useEffect } from'react';
import { useLocation } from'react-router-dom';


export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, refreshAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    refreshAuth(); 
  }, [location.pathname]);
  

  if (isAuthenticated === null) {
    return <LoadingPage message="Verifying authentication..." />;
  }

  return isAuthenticated ? children : <Navigate to={paths.auth.login.path} replace />;
};
