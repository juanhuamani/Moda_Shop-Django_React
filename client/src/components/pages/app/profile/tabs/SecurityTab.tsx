import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button, Input, Label, Switch, Badge } from "@/components/ui"
import { Lock } from "lucide-react"
import { useForm } from "react-hook-form";
import { protectedApi } from "@/axios/BaseAxios";

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
  const { register, watch, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    const { password, newPassword } = data;
    protectedApi.post("/user/change-password", { password, newPassword })
      .then((response) => {
        console.log(response.data);
      }
      ).catch((error) => {
        console.error(error);
      }
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="bg-secondary-light border-secondary" onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle className="text-tertiary">Cambiar contraseña</CardTitle>
          <CardDescription className="text-tertiary/70">
            Actualiza tu contraseña para mantener tu cuenta segura
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password" className="text-tertiary">
              Contraseña actual
            </Label>
            <Input
              id="current-password"
              type="password"
              className="bg-secondary border-secondary text-tertiary"
              icon={<Lock className="h-4 w-4 text-tertiary/70" />}
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
            <Label htmlFor="new-password" className="text-tertiary">
              Nueva contraseña
            </Label>
            <Input
              id="new-password"
              type="password"
              className="bg-secondary border-secondary text-tertiary"
              icon={<Lock className="h-4 w-4 text-tertiary/70" />}
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
            <Label htmlFor="confirm-password" className="text-tertiary">
              Confirmar nueva contraseña
            </Label>
            <Input
              id="confirm-password"
              type="password"
              className="bg-secondary border-secondary text-tertiary"
              icon={<Lock className="h-4 w-4 text-tertiary/70" />}
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
          <Button type="submit" className="bg-primary text-tertiary hover:bg-secondary">Actualizar contraseña</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

function TwoFactorCard() {
  return (
    <Card className="bg-secondary-light border-secondary">
      <CardHeader>
        <CardTitle className="text-tertiary">Autenticación de dos factores</CardTitle>
        <CardDescription className="text-tertiary/70">
          Añade una capa adicional de seguridad a tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-tertiary">Autenticación de dos factores</Label>
            <p className="text-sm text-tertiary/70">Protege tu cuenta con autenticación de dos factores</p>
          </div>
          <Switch id="2fa" />
        </div>
        <div className="rounded-md bg-primary p-4">
          <p className="text-sm text-tertiary">
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
    <Card className="bg-secondary-light border-secondary">
      <CardHeader>
        <CardTitle className="text-tertiary">Sesiones activas</CardTitle>
        <CardDescription className="text-tertiary/70">
          Gestiona tus sesiones activas en diferentes dispositivos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {sessions.map((session, index) => (
          <div key={index} className="flex items-center justify-between rounded-md border border-secondary p-4">
            <div className="space-y-1">
              <div className="flex items-center">
                <p className="font-medium text-tertiary">{session.device}</p>
                {session.current && <Badge className="ml-2 bg-primary text-tertiary">Actual</Badge>}
              </div>
              <p className="text-sm text-tertiary/70">
                {session.location} • {session.lastActive}
              </p>
            </div>
            {!session.current && (
              <Button
                variant="outline"
                size="sm"
                className="border-secondary text-tertiary hover:bg-secondary hover:text-tertiary"
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

