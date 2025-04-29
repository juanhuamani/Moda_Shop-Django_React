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
import { authAuthenticatedApi } from "@/axios/BaseAxios";
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
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<UserType>({
    defaultValues: user,
  });

  useEffect(() => {
    reset(user);
  }, [user, reset]);

  const onSubmit = (data: UserType) => {
    const updatedData: Partial<UserType> = {};

    Object.keys(data).forEach((key) => {
      if (data[key as keyof UserType] !== user[key as keyof UserType]) {
        //@ts-expect-error Type 'string' cannot be used as an index type for partial user data
        updatedData[key ] = data[key as keyof UserType];
      }
    });

    if (Object.keys(updatedData).length > 0) {
      authAuthenticatedApi
        .put(`/profile/update`, updatedData)
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
    <Card className="bg-secondary-light border-secondary">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-tertiary">
            Información del perfil
          </CardTitle>
          <CardDescription className="text-tertiary/70">
            Actualiza tu información personal
          </CardDescription>
        </div>
        {!isEditing ? (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            className="border-secondary text-tertiary hover:bg-secondary hover:text-tertiary"
          >
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-secondary text-tertiary hover:bg-secondary hover:text-tertiary"
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              className="bg-primary text-tertiary hover:bg-primary/90"
            >
              <Save className="mr-2 h-4 w-4" />
              Guardar
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-tertiary">
              Nombre completo
            </Label>
            <div className="flex flex-row gap-2">
              <Input
                {...register("first_name")}
                errorMessage={errors?.first_name?.message}
                id="first_name"
                disabled={!isEditing}
                className="bg-secondary border-secondary text-tertiary"
                icon={<User className="h-4 w-4 text-tertiary/70" />}
              />
              <Input
                {...register("last_name")}
                errorMessage={errors?.last_name?.message}
                id="last_name"
                disabled={!isEditing}
                className="bg-secondary border-secondary text-tertiary"
                icon={<User className="h-4 w-4 text-tertiary/70" />}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-tertiary">
              Correo electrónico
            </Label>
            <Input
              {...register("email")}
              errorMessage={errors?.email?.message}
              id="email"
              type="email"
              disabled={!isEditing}
              className="bg-secondary border-secondary text-tertiary"
              icon={<Mail className="h-4 w-4 text-tertiary/70" />}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-tertiary">
              Teléfono
            </Label>
            <Input
              {...register("phone")}
              errorMessage={errors?.phone?.message}
              id="phone"
              disabled={!isEditing}
              className="bg-secondary border-secondary text-tertiary"
              icon={<Phone className="h-4 w-4 text-tertiary/70" />}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location" className="text-tertiary">
              Ubicación
            </Label>
            <Input
              {...register("location")}
              errorMessage={errors?.location?.message}
              id="location"
              disabled={!isEditing}
              className="bg-secondary border-secondary text-tertiary"
              icon={<MapPin className="h-4 w-4 text-tertiary/70" />}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthdate" className="text-tertiary">
              Fecha de nacimiento
            </Label>
            <Input
              {...register("birthdate")}
              errorMessage={errors?.birthdate?.message}
              id="location"
              disabled={!isEditing}
              className="bg-secondary border-secondary text-tertiary"
              icon={<Calendar className="h-4 w-4 text-tertiary/70" />}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role" className="text-tertiary">
              Rol
            </Label>
            <Select
              options={[
                { value: "developer", label: "Desarrollador" },
                { value: "designer", label: "Diseñador" },
                { value: "manager", label: "Gerente" },
                { value: "admin", label: "Administrador" },
              ]}
              //value={user.role === "Desarrollador Senior" ? "developer" : ""}
              disabled={!isEditing}
              className="bg-secondary border-secondary text-tertiary"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio" className="text-tertiary">
            Biografía
          </Label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            className={`w-full rounded-md border border-secondary bg-secondary px-3 py-2 text-tertiary placeholder:text-tertiary/50 focus:outline-none focus:ring-2 focus:ring-tertiary/50 ${
              !isEditing ? "opacity-70" : ""
            }`}
            //value={user.bio}
            disabled={!isEditing}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function PreferencesCard() {
  return (
    <Card className="bg-secondary-light border-secondary">
      <CardHeader>
        <CardTitle className="text-tertiary">Preferencias</CardTitle>
        <CardDescription className="text-tertiary/70">
          Configura tus preferencias de la plataforma
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-tertiary">Mostrar actividad en línea</Label>
            <p className="text-sm text-tertiary/70">
              Permite que otros usuarios vean cuando estás en línea
            </p>
          </div>
          <Switch id="online-status" />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-tertiary">Idioma</Label>
            <p className="text-sm text-tertiary/70">
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
            className="w-40 bg-secondary border-secondary text-tertiary"
          />
        </div>
      </CardContent>
    </Card>
  );
}
