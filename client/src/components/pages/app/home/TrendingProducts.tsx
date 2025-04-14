import { Button } from "@/components/ui"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { ProductCard } from "./components/ProductCard"

interface Product {
  id: number
  name: string
  price: string
  image: string
  originalPrice?: string
  discount?: string
  rating?: number
  reviews?: number
  isNew?: boolean
}

interface TrendingProductsProps {
  products: Product[]
}

export function TrendingProducts({ products }: TrendingProductsProps) {
  return (
    <Card className="col-span-full lg:col-span-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Productos tendencia</CardTitle>
            <CardDescription>Los productos más populares de esta semana</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            Ver todos
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
