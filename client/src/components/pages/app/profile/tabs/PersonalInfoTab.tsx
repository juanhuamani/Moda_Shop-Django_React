import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button, Input, Label, Switch, Select } from "@/components/ui"
import { Edit, Save, X, User, Mail, Phone, MapPin, Calendar } from "lucide-react"
import { useUser } from "@/context/user-context"
import { User as UserType } from "@/types/User"

export function PersonalInfoTab() {
  const { user  } = useUser()
  const [isEditing, setIsEditing] = useState(false)

  const handleSaveProfile = () => {
    // Aquí iría la lógica para guardar los cambios en el servidor
    setIsEditing(false)
  }

  return (
    <>
      {user && (
        <ProfileInfoCard
          user={user}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleSaveProfile={handleSaveProfile}
        />
      )}
      <PreferencesCard />
    </>
  )
}

function ProfileInfoCard({
  user,
  isEditing,
  setIsEditing,
  handleSaveProfile,
}: {
  user: UserType;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleSaveProfile: () => void;
}) {
  return (
    <Card className="bg-secondary-light border-secondary">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-tertiary">Información del perfil</CardTitle>
          <CardDescription className="text-tertiary/70">Actualiza tu información personal</CardDescription>
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
              onClick={() => setIsEditing(false)}
              className="border-secondary text-tertiary hover:bg-secondary hover:text-tertiary"
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button onClick={handleSaveProfile} className="bg-primary text-tertiary hover:bg-primary/90">
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
                id="first_name"
                name="first_name"
                value={user.first_name}
                disabled={!isEditing}
                className="bg-secondary border-secondary text-tertiary"
                icon={<User className="h-4 w-4 text-tertiary/70" />}
                />
                <Input
                id="last_name"
                name="last_name"
                value={user.last_name}
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
              id="email"
              name="email"
              type="email"
              value={user.email}
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
              id="phone"
              name="phone"
              //value={user.phone}
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
              id="location"
              name="location"
              //value={user.location}
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
              id="birthdate"
              name="birthdate"
              //value={user.birthdate}
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
  )
}

function PreferencesCard() {
  return (
    <Card className="bg-secondary-light border-secondary">
      <CardHeader>
        <CardTitle className="text-tertiary">Preferencias</CardTitle>
        <CardDescription className="text-tertiary/70">Configura tus preferencias de la plataforma</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-tertiary">Mostrar actividad en línea</Label>
            <p className="text-sm text-tertiary/70">Permite que otros usuarios vean cuando estás en línea</p>
          </div>
          <Switch id="online-status" />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-tertiary">Idioma</Label>
            <p className="text-sm text-tertiary/70">Selecciona el idioma de la plataforma</p>
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
  )
}

