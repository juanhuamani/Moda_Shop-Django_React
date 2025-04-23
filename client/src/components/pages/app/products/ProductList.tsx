import { Star, Heart, ShoppingCart } from "lucide-react"
import { Badge, Button } from "@/components/ui"
import { Tooltip } from "@/components/ui/ToolTip"
import { Product } from "@/types/Product"

export function ProductList( { allProducts }: { allProducts: Product[] } ) {
  return (
      <div className="space-y-4">
        {allProducts.map((product, index) => (
          <div
            key={index}
            className="group flex flex-col overflow-hidden rounded-lg border border-[hsl(224,34%,30%)] bg-[hsl(224,34%,22%)] sm:flex-row"
          >
            <div className="relative h-48 w-full sm:h-auto sm:w-48">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              {product.discount && (
                <Badge variant="destructive" className="absolute left-2 top-2">
                  -{product.discount}
                </Badge>
              )}
              {product.isNew && (
                <Badge variant="primary" className="absolute left-2 top-2">
                  Nuevo
                </Badge>
              )}
            </div>
            <div className="flex flex-1 flex-col justify-between p-4">
              <div>
                <h3 className="mb-1 text-lg font-medium text-[hsl(215,100%,92%)]">{product.name}</h3>
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <span className="ml-2 text-sm text-[hsl(215,100%,92%)/70]">
                      {product.rating} ({product.reviews} reseñas)
                    </span>
                  </div>
                </div>
                <p className="mb-4 text-sm text-[hsl(215,100%,92%)/70]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
                  nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.
                </p>
                <div className="mb-2 flex flex-wrap gap-2">
                  <Badge variant="secondary">Disponible</Badge>
                  <Badge variant="outline">Envío gratis</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-[hsl(215,100%,92%)]">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-[hsl(215,100%,92%)/70] line-through">{product.originalPrice}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Tooltip content="Añadir a favoritos">
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </Tooltip>
                  <Button>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Añadir al carrito
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
  )
}
