import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Badge, Button } from "@/components/ui";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Camera,
  ChevronRight,
  LogOut,
  User,
  Bell,
  Shield,
  CreditCard,
} from "lucide-react";
import { Spinner } from "@/components/ui";
import { useUser } from "@/context/user-context";
import { useNavigate } from "react-router-dom";
import { User as UserType } from "@/types/User";
import { JSX, useRef, useState } from "react";
import { protectedApi } from "@/axios/BaseAxios";

export function ProfileSidebar() {
  const { user, uploadUser } = useUser();
  const navigate = useNavigate();

  const navigationItems = [
    { icon: <User className="h-4 w-4" />, label: "Información personal" },
    { icon: <Bell className="h-4 w-4" />, label: "Notificaciones" },
    { icon: <Shield className="h-4 w-4" />, label: "Seguridad" },
    { icon: <CreditCard className="h-4 w-4" />, label: "Facturación" },
  ];

  return (
    <div className="space-y-6">
      {user && (
        <>
          <ProfileCard
            user={user}
            uploadUser={uploadUser}
            navigate={navigate}
          />
          <NavigationCard items={navigationItems} />
        </>
      )}
    </div>
  );
}

function ProfileCard({
  user,
  navigate,
  uploadUser,
}: {
  user: UserType;
  navigate: ReturnType<typeof useNavigate>;
  uploadUser: (user: UserType) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setIsUploading(true);

      const formData = new FormData();
      formData.append("avatar", file);

      const { data } = await protectedApi.put("/user/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedUser = { ...user, avatar: data.avatar };
      uploadUser(updatedUser);
    } catch (error) {
      console.error("Error al actualizar el avatar:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="bg-secondary-light border-secondary">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <Avatar className="h-20 w-20">
              {isUploading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
                  <Spinner className="h-8 w-8 text-tertiary" />
                </div>
              ) : null}
              <AvatarImage
                src={user.avatar.startsWith("http") ? user.avatar : `${import.meta.env.VITE_API_URL}/avatars/${user.avatar}`}
                alt="Avatar"
                />
              <AvatarFallback className="bg-primary text-tertiary">
                {user.first_name[0]}
                {user.last_name[0]}
              </AvatarFallback>
            </Avatar>

            {/* Input de archivo oculto */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
            <Button
              size="icon"
              className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0 bg-secondary hover:bg-secondary/90 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Camera className="h-4 w-4 text-tertiary" />
            </Button>
          </div>
          <h2 className="text-xl font-bold text-tertiary">
            {user.first_name} {user.last_name}
          </h2>
          <p className="text-sm text-tertiary/70">{user.email}</p>
          <div className="mt-2">
            <Badge className="bg-primary text-tertiary"></Badge>
          </div>
          <div className="mt-4 w-full space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-tertiary/70">Plan:</span>
              <span className="font-medium text-tertiary"></span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-tertiary/70">Miembro desde:</span>
              <span className="font-medium text-tertiary"></span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-secondary p-4">
        <Button
          variant="outline"
          className="w-full border-secondary text-tertiary hover:bg-secondary hover:text-tertiary"
          onClick={() => navigate("/logout")}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar sesión
        </Button>
      </CardFooter>
    </Card>
  );
}

type NavigationItem = {
  icon: JSX.Element;
  label: string;
};

function NavigationCard({ items }: { items: NavigationItem[] }) {
  return (
    <Card className="bg-secondary-light border-secondary">
      <CardHeader>
        <CardTitle className="text-lg text-tertiary">
          Navegación rápida
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <nav>
          <ul className="space-y-1">
            {items.map((item, index) => (
              <li key={index}>
                <button className="flex w-full items-center justify-between rounded-md px-4 py-2 text-tertiary hover:bg-secondary">
                  <div className="flex items-center">
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-tertiary/50" />
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </CardContent>
    </Card>
  );
}
