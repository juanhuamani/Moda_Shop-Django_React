import React, { useState } from "react";
import { Button, Checkbox, Input, Label } from "@/components/ui";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form"
import { authApi } from "@/axios/BaseAxios";
import { useUser } from "@/context/user-context";

interface LoginFormProps {
  onSuccess: () => void;
}

interface Inputs {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    authApi.post("/login", data)
      .then((response) => {
        console.log(response.data);
        const { user } = response.data;
        if (user) {
          login(user);  
        }
        onSuccess();
      })
      .catch((error) => {
        console.error(error);
      }
    );
    console.log(data);
    //onSuccess();
  };
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-tertiary">
          Iniciar sesión
        </h1>
        <p className="text-sm text-tertiary">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-tertiary">
            Correo electrónico
          </Label>
          <Input
            id="email"
            placeholder="nombre@ejemplo.com"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            className="bg-secondary-light border-secondary text-tertiary"
            {...register("email", { 
              required: "Este campo es obligatorio"
            })}
            errorMessage={errors.email?.message}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-tertiary">
              Contraseña
            </Label>
            <Link
              to="/forgot-password"
              className="text-xs text-tertiary hover:text-tertiary"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              className="bg-secondary-light border-secondary text-tertiary pr-10"
              icon={showPassword ? <EyeOff size={16} className="text-tertiary" onClick={() => setShowPassword(!showPassword)} /> : <Eye size={16} className="text-tertiary" onClick={() => setShowPassword(!showPassword)}/>}
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
          <Label
            htmlFor="remember"
            className="text-sm text-tertiary"
          >
            Recordar mi sesión
          </Label>
        </div>
        <Button className="w-full bg-tertiary text-[hsl(220,47%,10%)] hover:bg-[hsl(215,100%,85%)]">
          Iniciar sesión
        </Button>
      </form>

      {/*<div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-secondary" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[hsl(220,47%,10%)] px-2 text-tertiary">
            O continuar con
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="border-secondary bg-secondary-light text-tertiary hover:bg-[hsl(224,34%,25%)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="mr-2 h-4 w-4"
          >
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path
                fill="#4285F4"
                d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
              />
              <path
                fill="#34A853"
                d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
              />
              <path
                fill="#FBBC05"
                d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
              />
              <path
                fill="#EA4335"
                d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
              />
            </g>
          </svg>
          Google
        </Button>
        <Button
          variant="outline"
          className="border-secondary bg-secondary-light text-tertiary hover:bg-[hsl(224,34%,25%)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="mr-2 h-4 w-4 fill-current"
          >
            <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
          </svg>
          Apple
        </Button>
      </div>*/}

      <div className="text-center text-sm">
        <span className="text-tertiary">
          ¿No tienes una cuenta?{" "}
        </span>
        <Link
          to="/register"
          className="font-medium text-tertiary hover:underline"
        >
          Regístrate
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
