import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button, Input, Label, Switch, Badge } from "@/components/ui"
import { Lock } from "lucide-react"
import { useForm } from "react-hook-form";
import { useState } from "react";
import { api } from "@/axios/BaseAxios";
import { showSuccessToast, showErrorToast } from '@/utils/toast';

export function SecurityTab() {
  return (
    <>
      <PasswordCard />
      <TwoFactorCard />
      <ActiveSessionsCard />
    </>
  )
}

function PasswordCard() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, watch, formState: { errors }, handleSubmit, setError, reset } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: { password: string; newPassword: string; confirmPassword: string }) => {
    setIsLoading(true);
    api.put("/auth/password/change", data)
      .then(() => {
        showSuccessToast("Contraseña actualizada");
        reset();
      }
      ).catch((error) => {
        if (error.response?.data) {
          const { data } = error.response;
          for (const key in data) {
            const errorMessage = data[key][0];
            setError(key as "password" | "newPassword" | "confirmPassword", {
              type: "manual",
              message: errorMessage,
            });
          }
        }
        else {
          showErrorToast('Error al actualizar la contrasena', { autoClose: 7000 });
        }
      }).finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="bg-surface border-card-border">
        <CardHeader>
          <CardTitle>Cambiar contraseña</CardTitle>
          <CardDescription>
            Actualiza tu contraseña para mantener tu cuenta segura
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">
              Contraseña actual
            </Label>
            <Input
              id="current-password"
              type="password"
              icon={<Lock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />}
              errorMessage={errors.password?.message}
              {...register("password", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">
              Nueva contraseña
            </Label>
            <Input
              id="new-password"
              type="password"
              icon={<Lock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />}
              errorMessage={errors.newPassword?.message}
              {...register("newPassword", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">
              Confirmar nueva contraseña
            </Label>
            <Input
              id="confirm-password"
              type="password"
              icon={<Lock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />}
              {...register("confirmPassword", {
                required: "Este campo es obligatorio",
                validate: (value) => {
                  if (value !== watch("newPassword")) {
                    return "Las contraseñas no coinciden";
                  }
                }
              })}
              errorMessage={errors.confirmPassword?.message}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" isLoading={isLoading}>Actualizar contraseña</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

function TwoFactorCard() {
  return (
    <Card className="bg-surface border-card-border">
      <CardHeader>
        <CardTitle>Autenticación de dos factores</CardTitle>
        <CardDescription>
          Añade una capa adicional de seguridad a tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Autenticación de dos factores</Label>
            <p className="text-sm text-muted-foreground">Protege tu cuenta con autenticación de dos factores</p>
          </div>
          <Switch aria-label="Autenticación de dos factores" />
        </div>
        <div className="rounded-control bg-surface-raised p-4">
          <p className="text-sm text-foreground">
            La autenticación de dos factores no está configurada. Activa el interruptor para comenzar la configuración.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function ActiveSessionsCard() {
  const sessions = [
    {
      device: "Windows PC - Chrome",
      location: "Madrid, España",
      lastActive: "Ahora",
      current: true,
    },
    {
      device: "iPhone 13 - Safari",
      location: "Madrid, España",
      lastActive: "Hace 2 horas",
      current: false,
    },
    {
      device: "MacBook Pro - Firefox",
      location: "Barcelona, España",
      lastActive: "Ayer, 18:42",
      current: false,
    },
  ]

  return (
    <Card className="bg-surface border-card-border">
      <CardHeader>
        <CardTitle>Sesiones activas</CardTitle>
        <CardDescription>
          Gestiona tus sesiones activas en diferentes dispositivos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {sessions.map((session, index) => (
          <div key={index} className="flex items-center justify-between rounded-control border border-border p-4">
            <div className="space-y-1">
              <div className="flex items-center">
                <p className="font-medium text-foreground">{session.device}</p>
                {session.current && <Badge variant="primary" className="ml-2">Actual</Badge>}
              </div>
              <p className="text-sm text-muted-foreground">
                {session.location} • {session.lastActive}
              </p>
            </div>
            {!session.current && (
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-surface-raised"
              >
                Cerrar sesión
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
