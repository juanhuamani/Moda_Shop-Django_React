import { Navigate } from 'react-router-dom';
import { paths } from '@/config/paths';
import { checkAuthCookie } from '@/utils/auth';
import { JSX } from 'react';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = checkAuthCookie();
  console.log('isAuthenticated', isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to={paths.auth.login.path} replace />;
  }

  return children;
};