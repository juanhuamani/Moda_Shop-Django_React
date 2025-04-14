import { useNavigate, useSearchParams } from 'react-router-dom';
import RegisterForm from '@/components/pages/auth/RegisterForm';


export const RegisterRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
      <RegisterForm
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