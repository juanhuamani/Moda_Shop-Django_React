import { Badge, Button, Image } from "@/components/ui"
import { Card } from "@/components/ui/Card"
import { Star } from "lucide-react"
import { Product } from "@/types/Product"
import { cn } from "@/utils/cn"

import { addToCart } from "@/services/cartService"
import { useState } from "react"

export function FeaturedProduct( { product }: { product: Product } ) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      await addToCart(product.id)
    } catch (error) {
      console.error('Error al añadir al carrito:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="col-span-full md:col-span-4 lg:col-span-5">
      <div className="relative h-full">
        <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
          <Badge variant="primary">Destacado</Badge>
          {product.discount && 
            <Badge variant="destructive">{product.discount}</Badge>
          }
        </div>
        <div className="grid h-full grid-rows-[1fr_auto]">
          <div className="flex items-center justify-center overflow-hidden bg-[hsl(224,34%,25%)] p-6">
            <Image
              src={product.image}
              alt={product.name}
              className=" w-full h-full max-h-80"         
            />
          </div>
          <div className="p-6">
            <h3 className="mb-2 text-xl font-bold text-[hsl(215,100%,92%)]">{ product.name }</h3>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn(
                    "h-4 w-4 text-yellow-400",
                    i < (product.rating ?? 0) ? "fill-current" : "fill-transparent"
                  )}/>
                ))}
              </div>
              <span className="text-sm text-[hsl(215,100%,92%)/70]">({product.reviews ?? 0} reseñas)</span>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl font-bold text-[hsl(215,100%,92%)]">{product.originalPrice ?? product.price}</span>
              {product.discount &&
                <span className="text-lg font-bold text-[hsl(215,100%,92%)]">{product.discount}</span>
              }
            </div>
            <Button className="w-full" onClick={handleAddToCart} isLoading={isLoading}>
              Añadir al carrito
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
