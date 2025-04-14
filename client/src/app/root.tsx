import { Outlet } from 'react-router-dom';

export const AppRoot = () => {
  return (
      <Outlet />
  );
};

export const AppRootErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};