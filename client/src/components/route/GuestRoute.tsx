import { Navigate } from 'react-router-dom';
import { paths } from '@/config/paths';
import { checkAuthCookie } from '@/utils/auth';
import { JSX } from 'react';

export const GuestRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = checkAuthCookie();

  if (isAuthenticated) {
    return <Navigate to={paths.app.root.path} replace />;
  }

  return children;
};