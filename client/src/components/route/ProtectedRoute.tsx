import { Navigate } from 'react-router-dom';
import { paths } from '@/config/paths';
import LoadingPage from '@/components/common/LoadingPage';
import { JSX } from 'react';
import { useAuth } from '@/context/auth-context';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <LoadingPage message="Verificando autenticación..." />;
  }

  return isAuthenticated ? children : <Navigate to={paths.auth.login.path} replace />;
};
