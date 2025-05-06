import { Badge, Button, Image } from "@/components/ui"
import { Tooltip } from "@/components/ui/ToolTip"
import { Heart, Search, ShoppingCart } from "lucide-react"
import { Product } from "@/types/Product"
import { addToCart } from '@/services/cartService'
import { useState } from "react"
import { Rating } from "./Rating"
import { paths } from "@/config/paths"
import { useNavigate } from "react-router-dom"
interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      await addToCart(product.id)
    } catch (error) {
      console.error('Error al agregar al carrito:', error)
    } finally {
      setIsLoading(false)
    }
  }
  const handleToProduct = (slug :string) => {
    navigate(paths.app.products.details.getHref(slug))
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border border-[hsl(224,34%,30%)]">
      <div className="relative aspect-square overflow-hidden bg-[hsl(224,34%,25%)]">
        <Image
          src={product.image}
          alt={product.name}
          className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-110 cursor-pointer"
          onClick={()=> handleToProduct(product.slug)}
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
            <Rating value={product.rating ?? 0}/>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[hsl(215,100%,92%)]">{product.price} $</span>
            {product.originalPrice && (
              <span className="text-sm text-[hsl(215,100%,92%)/70] line-through">{product.originalPrice}</span>
            )}
          </div>
          <Button variant="ghost" size="icon-sm" onClick={handleAddToCart} isLoading={isLoading}>
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
