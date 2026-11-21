import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button, Badge } from "@/components/ui"
import { CreditCard } from "lucide-react"

export function BillingTab() {
  return (
    <>
      <CurrentPlanCard />
      <BillingHistoryCard />
      <PaymentMethodCard />
    </>
  )
}

function CurrentPlanCard() {
  return (
    <Card className="bg-surface border-card-border">
      <CardHeader>
        <CardTitle>Plan actual</CardTitle>
        <CardDescription>Gestiona tu plan de suscripción</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-control bg-subtle p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-foreground">Plan Premium</h3>
              <p className="text-sm text-muted-foreground">Facturación anual</p>
            </div>
            <Badge variant="success">Activo</Badge>
          </div>
          <div className="mb-4 space-y-2">
            <div className="flex items-center">
              <div className="mr-2 h-5 w-5 text-success-light">✓</div>
              <p className="text-foreground">Acceso a todas las funciones</p>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-5 w-5 text-success-light">✓</div>
              <p className="text-foreground">Soporte prioritario</p>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-5 w-5 text-success-light">✓</div>
              <p className="text-foreground">Almacenamiento ilimitado</p>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-5 w-5 text-success-light">✓</div>
              <p className="text-foreground">Usuarios ilimitados</p>
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-foreground">€99.99</span>
            <span className="ml-1 text-muted-foreground">/ año</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Tu próxima facturación será el 15 de junio de 2025</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 hover:bg-surface-raised"
          >
            Cambiar plan
          </Button>
          <Button variant="destructive" className="flex-1">
            Cancelar suscripción
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function BillingHistoryCard() {
  const invoices = [
    {
      date: "15 Jun 2024",
      amount: "€99.99",
      status: "Pagado",
      invoice: "INV-2024-001",
    },
    {
      date: "15 Jun 2023",
      amount: "€89.99",
      status: "Pagado",
      invoice: "INV-2023-001",
    },
    {
      date: "15 Jun 2022",
      amount: "€79.99",
      status: "Pagado",
      invoice: "INV-2022-001",
    },
  ]

  return (
    <Card className="bg-surface border-card-border">
      <CardHeader>
        <CardTitle>Historial de facturación</CardTitle>
        <CardDescription>Visualiza y descarga tus facturas anteriores</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {invoices.map((invoice, index) => (
            <div key={index} className="flex items-center justify-between rounded-control border border-border p-4">
              <div>
                <p className="font-medium text-foreground">{invoice.date}</p>
                <p className="text-sm text-muted-foreground">
                  {invoice.invoice} • {invoice.amount}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success">{invoice.status}</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-surface-raised"
                >
                  Descargar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function PaymentMethodCard() {
  return (
    <Card className="bg-surface border-card-border">
      <CardHeader>
        <CardTitle>Método de pago</CardTitle>
        <CardDescription>Gestiona tus métodos de pago</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-control border border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-16 items-center justify-center rounded-control bg-surface-raised">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-foreground"
                  aria-hidden="true"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Visa terminada en 4242</p>
                <p className="text-sm text-muted-foreground">Expira 12/2025</p>
              </div>
            </div>
            <Badge variant="primary">Predeterminada</Badge>
          </div>
        </div>
        <Button variant="outline" className="hover:bg-surface-raised">
          <CreditCard className="mr-2 h-4 w-4" aria-hidden="true" />
          Añadir método de pago
        </Button>
      </CardContent>
    </Card>
  )
}
