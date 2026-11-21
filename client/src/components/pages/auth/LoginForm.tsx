import React, { useState } from "react";
import { Button, Checkbox, Input, Label } from "@/components/ui";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form"
import { api } from "@/axios/BaseAxios";
import { useUser } from "@/context/user-context";
import { useAuth } from "@/context/auth-context";
import { showErrorToast, showSuccessToast } from "@/utils/toast";

interface LoginFormProps {
  onSuccess: () => void;
}

interface Inputs {
  identifier: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login } = useUser();
  const { refreshAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, } = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    api.post("/auth/login", data)
      .then((response) => {
        const { user } = response.data;
        if (user) {
          login(user);
          refreshAuth();  
        }
        showSuccessToast("Sesión iniciada correctamente");
        onSuccess();
      })
      .catch((error) => {
        console.error(error);
        showErrorToast(error.response?.data?.detail ?? "No se pudo iniciar sesión");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Iniciar sesión
        </h1>
        <p className="text-sm text-muted-foreground">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="identifier">
            Correo electrónico
          </Label>
          <Input
            id="identifier"
            placeholder="nombre@ejemplo.com"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            {...register("identifier", { 
              required: "Este campo es obligatorio"
            })}
            errorMessage={errors.identifier?.message}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">
              Contraseña
            </Label>
            <Link
              to="/forgot-password"
              className="text-xs text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              className="pr-12"
              icon={
                <button
                  type="button"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((value) => !value)}
                  className="flex h-8 w-8 items-center justify-center rounded-control text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
              iconPosition="right"
              {...register("password", { 
                required: "Este campo es obligatorio" ,
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
              errorMessage={errors.password?.message}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">
            Recordar mi sesión
          </Label>
        </div>
        <Button type="submit" className="w-full" isLoading={isLoading} loadingText="Iniciando sesión...">
          Iniciar sesión
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">
          ¿No tienes una cuenta?{" "}
        </span>
        <Link
          to="/register"
          className="font-medium text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Regístrate
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
