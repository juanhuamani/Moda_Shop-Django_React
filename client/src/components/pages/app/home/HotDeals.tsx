import { Button } from "@/components/ui"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { ProductCard } from "@/components/common/ProductCard"
import { Product } from "@/types/Product"
import { ArrowRight, Clock, Flame } from "lucide-react"

const hotDeals: Product[] = [
  {
    id: 101,
    name: "Camiseta premium",
    slug: "camiseta-premium",
    image: "",
    description: "",
    category: "Ofertas",
    price: 24.99,
    originalPrice: 39.99,
    discount: 38,
  },
  {
    id: 102,
    name: "Pantalones vaqueros",
    slug: "pantalones-vaqueros",
    image: "",
    description: "",
    category: "Ofertas",
    price: 49.99,
    originalPrice: 79.99,
    discount: 38,
  },
]

export function HotDeals() {
  return (
    <Card className="col-span-full lg:col-span-8">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="flex items-center text-heading text-foreground">
            <Flame className="mr-2 h-5 w-5 text-danger" /> Ofertas calientes
          </CardTitle>
          <CardDescription>¡Date prisa! Ofertas por tiempo limitado</CardDescription>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-surface-raised px-3 py-1">
          <Clock className="h-4 w-4 text-warning" />
          <span className="text-sm font-medium text-foreground">Finaliza en 2d 14h 35m</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {hotDeals.map((deal) => (
            <ProductCard key={deal.id} product={deal} variant="compact" />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full rounded-control">
          Ver todas las ofertas <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
