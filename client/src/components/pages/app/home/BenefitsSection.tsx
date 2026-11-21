import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { ArrowRight, Clock, Sparkles, Truck } from "lucide-react"
import type { ReactNode } from "react"

interface Benefit {
  icon: ReactNode
  title: string
  description: string
}

export function BenefitsSection() {
  const benefits: Benefit[] = [
    {
      icon: <Truck className="h-5 w-5" />,
      title: "Envío gratuito",
      description: "En pedidos superiores a €50",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Entrega rápida",
      description: "Recibe tu pedido en 24-48h",
    },
    {
      icon: <ArrowRight className="h-5 w-5 rotate-180" />,
      title: "Devoluciones gratuitas",
      description: "30 días para devoluciones",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Productos de calidad",
      description: "Garantía en todos los productos",
    },
  ]

  return (
    <Card className="col-span-full lg:col-span-4">
      <CardHeader>
        <CardTitle>Por qué elegirnos</CardTitle>
        <CardDescription>Beneficios de comprar en ModaShop</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="flex items-start gap-4 rounded-card border border-border p-4 transition-colors hover:bg-surface-raised"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary text-primary">
              {benefit.icon}
            </div>
            <div>
              <h3 className="font-medium text-foreground">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
