import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button, Label, Checkbox } from "@/components/ui"

export function NotificationsTab() {
  return (
    <Card className="bg-surface border-card-border">
      <CardHeader>
        <CardTitle>Preferencias de notificaciones</CardTitle>
        <CardDescription>
          Configura cómo y cuándo quieres recibir notificaciones
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <EmailNotifications />
        <PushNotifications />
      </CardContent>
      <CardFooter>
        <Button type="button" className="w-full sm:w-auto">Guardar preferencias</Button>
      </CardFooter>
    </Card>
  )
}

function EmailNotifications() {
  const emailOptions = [
    {
      title: "Actualizaciones de la plataforma",
      description: "Recibe notificaciones sobre nuevas funciones y mejoras",
    },
    {
      title: "Alertas de seguridad",
      description: "Recibe notificaciones sobre actividad sospechosa o inicios de sesión",
    },
    {
      title: "Boletín informativo",
      description: "Recibe nuestro boletín mensual con noticias y consejos",
    },
    {
      title: "Ofertas y promociones",
      description: "Recibe información sobre ofertas especiales y descuentos",
    },
  ]

  return (
    <div>
      <h3 className="mb-4 text-lg font-medium text-foreground">Notificaciones por correo electrónico</h3>
      <div className="space-y-4">
        {emailOptions.map((item, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Checkbox id={`email-${index}`} className="border-border" />
            <div className="space-y-1">
              <Label htmlFor={`email-${index}`}>
                {item.title}
              </Label>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PushNotifications() {
  const pushOptions = [
    {
      title: "Mensajes nuevos",
      description: "Recibe notificaciones cuando recibas un nuevo mensaje",
      checked: true,
    },
    {
      title: "Actualizaciones de estado",
      description: "Recibe notificaciones sobre cambios en el estado de tus proyectos",
      checked: false,
    },
    {
      title: "Recordatorios",
      description: "Recibe recordatorios sobre tareas pendientes y eventos",
      checked: false,
    },
  ]

  return (
    <div>
      <h3 className="mb-4 text-lg font-medium text-foreground">Notificaciones push</h3>
      <div className="space-y-4">
        {pushOptions.map((item, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Checkbox id={`push-${index}`} checked={item.checked} className="border-border" />
            <div className="space-y-1">
              <Label htmlFor={`push-${index}`}>
                {item.title}
              </Label>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
