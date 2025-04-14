import { useNavigate, useSearchParams } from "react-router-dom";

import LoginForm from "@/components/pages/auth/LoginForm";

export const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return (
      <LoginForm
        onSuccess={() => {
          if (redirectTo) {
            navigate(redirectTo);
          } else {
            navigate("/");
          }
        }}
      />
  );
};
