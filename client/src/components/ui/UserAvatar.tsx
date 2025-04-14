import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { useUser } from "@/context/user-context";
import { cn } from "@/utils/cn";

export const UserAvatar = ({
  size = "md",
}: {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}) => {
  const { user } = useUser();
  const avatarUrl = user?.avatar?.startsWith("http")
    ? `${import.meta.env.VITE_API_URL}/avatars/${user.avatar}`
    : "/default-avatar.png";

  return (
    <Avatar className={cn(
      "h-12 w-12",
      size === "xs" && "h-8 w-8",
      size === "sm" && "h-10 w-10",
      size === "md" && "h-12 w-12",
      size === "lg" && "h-14 w-14",
      size === "xl" && "h-16 w-16",
    )}>
      <AvatarImage
        src={avatarUrl}
        alt="Avatar"
      />
      <AvatarFallback className="bg-primary text-tertiary">
        {user?.first_name[0]}
        {user?.last_name[0]}
      </AvatarFallback>
    </Avatar>
  );
};
