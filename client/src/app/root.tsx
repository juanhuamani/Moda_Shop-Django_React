import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Suspense } from "react";

export const AppRoot = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Suspense key={location.pathname} fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </AnimatePresence>
  );
};

export const AppRootErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};