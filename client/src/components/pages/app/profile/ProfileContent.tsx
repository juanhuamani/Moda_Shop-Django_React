"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { PersonalInfoTab } from "./tabs/PersonalInfoTab"
import { SecurityTab } from "./tabs/SecurityTab"
import { NotificationsTab } from "./tabs/NotificationsTab"
import { BillingTab } from "./tabs/BillingTabs"

export function ProfileContent() {
  return (
    <Tabs defaultValue="personal" className="space-y-6">
      <TabsList className="w-full justify-start bg-secondary-light text-tertiary">
        <TabsTrigger value="personal" className="data-[state=active]:bg-primary data-[state=active]:text-tertiary">
          Información personal
        </TabsTrigger>
        <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-tertiary">
          Seguridad
        </TabsTrigger>
        <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-tertiary">
          Notificaciones
        </TabsTrigger>
        <TabsTrigger value="billing" className="data-[state=active]:bg-primary data-[state=active]:text-tertiary">
          Facturación
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="space-y-6 pt-4">
        <PersonalInfoTab />
      </TabsContent>

      <TabsContent value="security" className="space-y-6 pt-4">
        <SecurityTab />
      </TabsContent>

      <TabsContent value="notifications" className="space-y-6 pt-4">
        <NotificationsTab />
      </TabsContent>

      <TabsContent value="billing" className="space-y-6 pt-4">
        <BillingTab />
      </TabsContent>
    </Tabs>
  )
}

