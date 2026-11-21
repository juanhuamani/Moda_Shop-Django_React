import type React from "react";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button, Input, Label, Switch, Select } from "@/components/ui";
import {
  Edit,
  Save,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import { useUser } from "@/context/user-context";
import { User as UserType } from "@/types/User";
import { api } from "@/axios/BaseAxios";
import { toast } from "react-toastify";

export function PersonalInfoTab() {
  const { user, uploadUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  return (
    <>
      {user && (
        <ProfileInfoCard
          user={user}
          uploadUser={uploadUser}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleSaveProfile={handleSaveProfile}
        />
      )}
      <PreferencesCard />
    </>
  );
}

const getChangedProfileFields = (
  data: UserType,
  current: UserType
): Partial<UserType> => {
  const changed: Partial<UserType> = {};

  if (data.first_name !== current.first_name) changed.first_name = data.first_name;
  if (data.last_name !== current.last_name) changed.last_name = data.last_name;
  if (data.email !== current.email) changed.email = data.email;
  if (data.phone !== current.phone) changed.phone = data.phone;
  if (data.location !== current.location) changed.location = data.location;
  if (data.birthdate !== current.birthdate) changed.birthdate = data.birthdate;

  return changed;
};

function ProfileInfoCard({
  user,
  isEditing,
  setIsEditing,
  handleSaveProfile,
  uploadUser,
}: {
  user: UserType;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleSaveProfile: () => void;
  uploadUser: (user: UserType) => void;
}) {
  const [isSaving, setIsSaving] = useState(false);
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<UserType>({
    defaultValues: user,
  });

  useEffect(() => {
    reset(user);
  }, [user, reset]);

  const onSubmit = (data: UserType) => {
    const updatedData = getChangedProfileFields(data, user);

    if (Object.keys(updatedData).length > 0) {
      setIsSaving(true);
      api
        .put(`/auth/profile/update`, updatedData)
        .then((response) => {
          uploadUser(response.data.user);
          toast.success('Informacion actualizada',{
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
          });
          handleSaveProfile();
        })
        .catch((error) => {
          if (error.response?.data) {
            const { data } = error.response;
            for (const key in data) {
              const errorMessage = data[key][0];
              setError(key as keyof UserType, {
                type: "manual",
                message: errorMessage,
              });
            }
          }
        })
        .finally(() => {
          setIsSaving(false);
        });
    } else {
      toast.info('No se han realizado cambios',{
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      handleSaveProfile();
    }
  };

  const handleReset = () => {
    reset(user);
    setIsEditing(false);
  };

  return (
    <Card className="bg-surface border-card-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Información del perfil</CardTitle>
          <CardDescription>
            Actualiza tu información personal
          </CardDescription>
        </div>
        {!isEditing ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="mr-2 h-4 w-4" aria-hidden="true" />
            Editar
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
            >
              <X className="mr-2 h-4 w-4" aria-hidden="true" />
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              isLoading={isSaving}
            >
              <Save className="mr-2 h-4 w-4" aria-hidden="true" />
              Guardar
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first_name">Nombre</Label>
                <Input
                  {...register("first_name")}
                  errorMessage={errors?.first_name?.message}
                  id="first_name"
                  disabled={!isEditing}
                  icon={<User className="h-4 w-4 text-muted-foreground" aria-hidden="true" />}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Apellido</Label>
                <Input
                  {...register("last_name")}
                  errorMessage={errors?.last_name?.message}
                  id="last_name"
                  disabled={!isEditing}
                  icon={<User className="h-4 w-4 text-muted-foreground" aria-hidden="true" />}
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              {...register("email")}
              errorMessage={errors?.email?.message}
              id="email"
              type="email"
              disabled={!isEditing}
              icon={<Mail className="h-4 w-4 text-muted-foreground" aria-hidden="true" />}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              {...register("phone")}
              errorMessage={errors?.phone?.message}
              id="phone"
              disabled={!isEditing}
              icon={<Phone className="h-4 w-4 text-muted-foreground" aria-hidden="true" />}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Ubicación</Label>
            <Input
              {...register("location")}
              errorMessage={errors?.location?.message}
              id="location"
              disabled={!isEditing}
              icon={<MapPin className="h-4 w-4 text-muted-foreground" aria-hidden="true" />}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthdate">Fecha de nacimiento</Label>
            <Input
              {...register("birthdate")}
              errorMessage={errors?.birthdate?.message}
              id="birthdate"
              disabled={!isEditing}
              icon={<Calendar className="h-4 w-4 text-muted-foreground" aria-hidden="true" />}
            />
          </div>
          <div className="space-y-2" role="group" aria-label="Rol">
            <Label>Rol</Label>
            <Select
              options={[
                { value: "developer", label: "Desarrollador" },
                { value: "designer", label: "Diseñador" },
                { value: "manager", label: "Gerente" },
                { value: "admin", label: "Administrador" },
              ]}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Biografía</Label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            className="w-full rounded-control border border-input bg-subtle px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={!isEditing}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function PreferencesCard() {
  return (
    <Card className="bg-surface border-card-border">
      <CardHeader>
        <CardTitle>Preferencias</CardTitle>
        <CardDescription>
          Configura tus preferencias de la plataforma
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Mostrar actividad en línea</Label>
            <p className="text-sm text-muted-foreground">
              Permite que otros usuarios vean cuando estás en línea
            </p>
          </div>
          <Switch aria-label="Mostrar actividad en línea" />
        </div>
        <div className="flex items-center justify-between" role="group" aria-label="Idioma">
          <div className="space-y-0.5">
            <Label>Idioma</Label>
            <p className="text-sm text-muted-foreground">
              Selecciona el idioma de la plataforma
            </p>
          </div>
          <Select
            options={[
              { value: "es", label: "Español" },
              { value: "en", label: "English" },
              { value: "fr", label: "Français" },
              { value: "de", label: "Deutsch" },
            ]}
            value="es"
            onChange={() => {}}
            className="w-40"
          />
        </div>
      </CardContent>
    </Card>
  );
}
