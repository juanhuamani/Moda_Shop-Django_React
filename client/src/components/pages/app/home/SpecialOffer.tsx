import { Button, Input } from "@/components/ui"
import { Card, CardContent } from "@/components/ui/Card"
import { Percent } from "lucide-react"

export function SpecialOffer() {
  return (
    <Card className="col-span-full md:col-span-4 lg:col-span-3">
      <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
        <Percent className="mb-4 h-12 w-12 text-[hsl(215,100%,92%)]" />
        <h3 className="mb-2 text-2xl font-bold text-[hsl(215,100%,92%)]">Oferta especial</h3>
        <p className="mb-4 text-[hsl(215,100%,92%)/80]">
          ¡Suscríbete a nuestro boletín y obtén un 15% de descuento en tu primera compra!
        </p>
        <div className="mb-4 w-full">
          <Input placeholder="Tu correo electrónico" className="mb-2" />
        </div>
        <Button variant="outline" className="border-[hsl(215,100%,92%)] text-[hsl(215,100%,92%)]">
          Suscribirse
        </Button>
      </CardContent>
    </Card>
  )
}
