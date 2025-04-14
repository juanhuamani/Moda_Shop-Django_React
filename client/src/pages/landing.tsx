import { FC } from "react";
import { Navigate } from "react-router-dom";

export const LandingRoute: FC = () => {
  return (
    <Navigate to="/app"  />
  );
};
