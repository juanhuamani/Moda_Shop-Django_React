import { Badge, Button } from "@/components/ui"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { ArrowRight, Clock, Flame } from "lucide-react"

interface HotDeal {
  name: string
  price: string
  originalPrice: string
  discount: string
  image: string
}

export function HotDeals() {
  const hotDeals: HotDeal[] = [
    {
      name: "Camiseta premium",
      price: "€24.99",
      originalPrice: "€39.99",
      discount: "38%",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Pantalones vaqueros",
      price: "€49.99",
      originalPrice: "€79.99",
      discount: "38%",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  return (
    <Card className="col-span-full lg:col-span-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <Flame className="mr-2 h-5 w-5 text-red-500" /> Ofertas calientes
          </CardTitle>
          <CardDescription>¡Date prisa! Ofertas por tiempo limitado</CardDescription>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-[hsl(224,34%,25%)] px-3 py-1">
          <Clock className="h-4 w-4 text-[hsl(215,100%,92%)]" />
          <span className="text-sm font-medium text-[hsl(215,100%,92%)]">Finaliza en 2d 14h 35m</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {hotDeals.map((product, index) => (
            <div
              key={index}
              className="flex overflow-hidden rounded-lg border border-[hsl(224,34%,30%)] bg-[hsl(224,34%,22%)]"
            >
              <div className="relative h-[120px] w-[120px] flex-shrink-0 bg-[hsl(224,34%,25%)]">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                <Badge variant="destructive" className="absolute left-1 top-1">
                  -{product.discount}
                </Badge>
              </div>
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <h3 className="font-medium text-[hsl(215,100%,92%)]">{product.name}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="font-bold text-[hsl(215,100%,92%)]">{product.price}</span>
                    <span className="text-sm text-[hsl(215,100%,92%)/70] line-through">{product.originalPrice}</span>
                  </div>
                </div>
                <Button size="sm" className="mt-2">
                  Comprar ahora
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full">
          Ver todas las ofertas <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
