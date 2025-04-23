import { ProfileContent } from "@/components/pages/app/profile/ProfileContent";
import { ProfileSidebar } from "@/components/pages/app/profile/ProfileSidebar";
import { AnimatedPage } from "@/components/layouts/AnimatedPage";


export function ProfileRoute() {
  return (
    <AnimatedPage>
    <div className="min-h-screen bg-secondary p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-tertiary">Mi Perfil</h1>
          <p className="text-tertiary/70">
            Gestiona tu información personal y configuración de cuenta
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <ProfileSidebar />
          <ProfileContent />
        </div>
      </div>
    </div>
    </AnimatedPage>
  );
}
