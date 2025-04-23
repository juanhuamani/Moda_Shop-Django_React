import { Navigate } from 'react-router-dom';
import { paths } from '@/config/paths';
import { JSX } from 'react';
import { useAuth } from '@/context/auth-context';
import LoadingPage from '@/components/common/LoadingPage';

export const GuestRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  if (isAuthenticated === null) {
    return <LoadingPage message="Verifying authentication..." />;
  }

  return isAuthenticated ? <Navigate to={paths.app.root.path} replace /> : children;
};
