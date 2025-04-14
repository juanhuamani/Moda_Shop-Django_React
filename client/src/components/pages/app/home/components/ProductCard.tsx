import { Badge, Button } from "@/components/ui"
import { Tooltip } from "@/components/ui/ToolTip"
import { Heart, Search, ShoppingCart, Star } from "lucide-react"

interface ProductCardProps {
  product: {
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
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-[hsl(224,34%,30%)]">
      <div className="relative aspect-square overflow-hidden bg-[hsl(224,34%,25%)]">
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
        <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Tooltip content="Añadir a favoritos">
            <Button variant="secondary" size="icon-sm" className="rounded-full">
              <Heart className="h-4 w-4" />
            </Button>
          </Tooltip>
          <Tooltip content="Vista rápida">
            <Button variant="secondary" size="icon-sm" className="rounded-full">
              <Search className="h-4 w-4" />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="p-3">
        <h3 className="mb-1 font-medium text-[hsl(215,100%,92%)]">{product.name}</h3>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex items-center">
            <Star className="h-3 w-3 fill-current text-yellow-500" />
            <span className="ml-1 text-xs text-[hsl(215,100%,92%)/70]">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[hsl(215,100%,92%)]">{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-[hsl(215,100%,92%)/70] line-through">{product.originalPrice}</span>
            )}
          </div>
          <Button variant="ghost" size="icon-sm">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
