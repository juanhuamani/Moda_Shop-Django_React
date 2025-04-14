import { Badge, Button } from "@/components/ui"
import { Card } from "@/components/ui/Card"
import { Star } from "lucide-react"

export function FeaturedProduct() {
  return (
    <Card className="col-span-full md:col-span-4 lg:col-span-5">
      <div className="relative h-full">
        <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
          <Badge variant="primary">Destacado</Badge>
          <Badge variant="destructive">-30%</Badge>
        </div>
        <div className="grid h-full grid-rows-[1fr_auto]">
          <div className="flex items-center justify-center overflow-hidden bg-[hsl(224,34%,25%)] p-6">
            <img
              src="/placeholder.svg?height=500&width=500"
              alt="Producto destacado"
              className="max-h-[300px] w-auto object-contain transition-transform hover:scale-105"
            />
          </div>
          <div className="p-6">
            <h3 className="mb-2 text-xl font-bold text-[hsl(215,100%,92%)]">Zapatillas Ultra Boost</h3>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <Star className="h-4 w-4 fill-current text-yellow-500" />
              </div>
              <span className="text-sm text-[hsl(215,100%,92%)/70]">(128 reseñas)</span>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl font-bold text-[hsl(215,100%,92%)]">€89.99</span>
              <span className="text-lg text-[hsl(215,100%,92%)/70] line-through">€129.99</span>
            </div>
            <Button className="w-full">Añadir al carrito</Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
