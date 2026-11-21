import { Button } from "@/components/ui"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { ProductCard } from "@/components/common/ProductCard"
import { Product } from "@/types/Product"

interface TrendingProductsProps {
  products: Product[]
}

export function TrendingProducts({ products }: TrendingProductsProps) {
  return (
    <Card className="col-span-full lg:col-span-8">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle>Productos tendencia</CardTitle>
            <CardDescription>Los productos más populares de esta semana</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="rounded-control">
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
