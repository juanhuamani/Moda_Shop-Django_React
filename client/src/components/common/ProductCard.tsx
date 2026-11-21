import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Heart, Search, ShoppingCart } from "lucide-react"

import { Badge, Button, Card, Image } from "@/components/ui"
import { Tooltip } from "@/components/ui/ToolTip"
import { paths } from "@/config/paths"
import { addToCart } from "@/services/cartService"
import { Product } from "@/types/Product"
import { cn } from "@/utils/cn"
import { formatPrice } from "@/utils/formatPrice"
import { showInfoToast, showSuccessToast } from "@/utils/toast"
import { Rating } from "./Rating"

type ProductCardVariant = "grid" | "list" | "compact"

interface ProductCardProps {
  product: Product
  variant?: ProductCardVariant
  highlightLabel?: string
}

const rootVariants: Record<ProductCardVariant, string> = {
  grid: "flex flex-col",
  list: "flex flex-col sm:flex-row",
  compact: "flex items-center gap-3 p-3",
}

const mediaVariants: Record<ProductCardVariant, string> = {
  grid: "aspect-square w-full",
  list: "h-48 w-full shrink-0 sm:h-auto sm:w-56",
  compact: "h-24 w-24 shrink-0 rounded-control",
}

export function ProductCard({
  product,
  variant = "grid",
  highlightLabel,
}: ProductCardProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const navigate = useNavigate()

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      await addToCart(product.id)
    } catch (error) {
      console.error("Error al agregar al carrito:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToProduct = () => {
    navigate(paths.app.products.details.getHref(product.slug))
  }

  const handleToggleFavorite = () => {
    const next = !isFavorite
    setIsFavorite(next)

    if (next) {
      showSuccessToast(`${product.name} añadido a favoritos`)
    } else {
      showInfoToast(`${product.name} quitado de favoritos`)
    }
  }

  const favoriteLabel = isFavorite
    ? `Quitar ${product.name} de favoritos`
    : `Añadir ${product.name} a favoritos`
  const cartLabel = `Añadir ${product.name} al carrito`

  const media = (
    <div
      className={cn(
        "relative overflow-hidden bg-surface-raised",
        mediaVariants[variant]
      )}
    >
      <button
        type="button"
        onClick={handleToProduct}
        aria-label={`Ver ${product.name}`}
        className="block h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <Image
          src={product.image}
          alt={product.name}
          className="h-full w-full rounded-control object-cover object-center transition-transform duration-300 group-hover:scale-110"
        />
      </button>
      {highlightLabel && (
        <Badge variant="primary" className="absolute left-2 top-2">
          {highlightLabel}
        </Badge>
      )}
      {product.isNew && (
        <Badge
          variant="primary"
          className={cn("absolute left-2", highlightLabel ? "top-10" : "top-2")}
        >
          Nuevo
        </Badge>
      )}
      {product.discount ? (
        <Badge variant="destructive" className="absolute bottom-2 left-2">
          -{product.discount}%
        </Badge>
      ) : null}
      <div
        className={cn(
          "absolute right-2 top-2 z-10 flex flex-col gap-2",
          variant === "grid"
            ? "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
            : "opacity-100"
        )}
      >
        <Tooltip
          content={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
          position="left"
        >
          <Button
            variant="secondary"
            size="icon-sm"
            className="rounded-control"
            aria-label={favoriteLabel}
            aria-pressed={isFavorite}
            onClick={handleToggleFavorite}
          >
            <Heart
              className="h-4 w-4"
              fill={isFavorite ? "currentColor" : "none"}
            />
          </Button>
        </Tooltip>
        <Tooltip content="Vista rápida" position="left">
          <Button
            variant="secondary"
            size="icon-sm"
            className="rounded-control"
            aria-label={`Vista rápida de ${product.name}`}
            onClick={handleToProduct}
          >
            <Search className="h-4 w-4" />
          </Button>
        </Tooltip>
      </div>
    </div>
  )

  const title = (
    <button
      type="button"
      onClick={handleToProduct}
      aria-label={`Ver ${product.name}`}
      className="rounded-control text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
    >
      <h3
        className={cn(
          "font-medium text-foreground",
          variant === "compact" && "text-sm",
          variant !== "compact" && "text-title"
        )}
      >
        {product.name}
      </h3>
    </button>
  )

  const rating = (
    <div className="flex items-center gap-2">
      <Rating value={product.rating ?? 0} />
      {product.reviews !== undefined && (
        <span className="text-xs text-muted-foreground">
          ({product.reviews} reseñas)
        </span>
      )}
    </div>
  )

  const price = (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className={cn(
          "font-bold text-foreground",
          variant !== "grid" && "text-title"
        )}
      >
        {formatPrice(product.price)}
      </span>
      {product.originalPrice && (
        <span className="text-sm text-muted-foreground line-through">
          {formatPrice(product.originalPrice)}
        </span>
      )}
    </div>
  )

  const cartButton = (
    <Button
      variant="ghost"
      size="icon-sm"
      className="rounded-control text-foreground hover:bg-surface-raised"
      onClick={handleAddToCart}
      isLoading={isLoading}
      aria-label={cartLabel}
    >
      <ShoppingCart className="h-4 w-4" />
    </Button>
  )

  const labeledCartButton = (
    <Button
      size="sm"
      className="rounded-control"
      onClick={handleAddToCart}
      isLoading={isLoading}
      aria-label={cartLabel}
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Añadir al carrito
    </Button>
  )

  const rootClassName = cn(
    "group relative overflow-hidden rounded-card border border-card-border bg-card text-card-foreground shadow-card transition duration-300 hover:-translate-y-1 hover:border-border hover:shadow-elevated focus-within:-translate-y-1 focus-within:border-ring focus-within:shadow-elevated focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
    rootVariants[variant]
  )

  if (variant === "compact") {
    return (
      <Card className={rootClassName}>
        {media}
        <div className="min-w-0 flex-1">
          {title}
          <div className="mt-1">{price}</div>
          <div className="mt-2 flex justify-end">{cartButton}</div>
        </div>
      </Card>
    )
  }

  if (variant === "list") {
    return (
      <Card className={rootClassName}>
        {media}
        <div className="flex flex-1 flex-col justify-between gap-3 p-4">
          <div>
            {title}
            <div className="my-2">{rating}</div>
            {product.description && (
              <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                {product.description}
              </p>
            )}
            <div className="mb-2 flex flex-wrap gap-2">
              <Badge variant="success">Disponible</Badge>
              <Badge variant="outline">Envío gratis</Badge>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            {price}
            {labeledCartButton}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className={rootClassName}>
      {media}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {title}
        {rating}
        {price}
        <div className="mt-auto flex justify-end pt-1">{cartButton}</div>
      </div>
    </Card>
  )
}
