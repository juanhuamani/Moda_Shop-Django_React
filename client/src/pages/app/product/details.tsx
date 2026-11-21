import { useCallback, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { AxiosError } from "axios"
import { Minus, Plus, ShoppingBag } from "lucide-react"

import { Button, Image } from "@/components/ui"
import { ProductCard } from "@/components/common/ProductCard"
import { PageHeader } from "@/components/PageHeader"
import { AnimatedPage } from "@/components/layouts/AnimatedPage"
import LoadingPage from "@/components/common/LoadingPage"
import { api } from "@/axios/BaseAxios"
import { addToCart, updateCartItem } from "@/services/cartService"
import { paths } from "@/config/paths"
import { Product } from "@/types/Product"
import { formatPrice } from "@/utils/formatPrice"

interface ProductDetail extends Product {
  similar_products?: Product[]
}

type PageStatus = "loading" | "ready" | "not-found" | "error"

export function ProductDetailRoute() {
  const { productSlug } = useParams<{ productSlug: string }>()

  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [similarProducts, setSimilarProducts] = useState<Product[]>([])
  const [status, setStatus] = useState<PageStatus>("loading")
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const fetchProduct = useCallback(async () => {
    if (!productSlug) {
      setStatus("not-found")
      return
    }

    setStatus("loading")
    try {
      const { data } = await api.get(
        `/api/products/${encodeURIComponent(productSlug)}`
      )
      const fetchedProduct = data.product as ProductDetail
      setProduct(fetchedProduct)
      setSimilarProducts(fetchedProduct.similar_products ?? [])
      setStatus("ready")
    } catch (error) {
      const httpStatus = (error as AxiosError).response?.status
      if (httpStatus === 404) {
        setStatus("not-found")
        return
      }
      console.error("Error al obtener el producto:", error)
      setStatus("error")
    }
  }, [productSlug])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = async () => {
    if (!product) return

    setIsAdding(true)
    try {
      const result = await addToCart(product.id)
      const cartItemId: number | undefined = result?.cart_item?.id
      if (quantity > 1 && cartItemId) {
        await updateCartItem(cartItemId, quantity)
      }
    } catch (error) {
      console.error("Error al agregar al carrito:", error)
    } finally {
      setIsAdding(false)
    }
  }

  if (status === "loading") {
    return <LoadingPage message="Cargando producto" />
  }

  if (status === "not-found") {
    return (
      <div className="p-4 md:p-6">
        <PageHeader
          breadcrumbs={[
            { label: "Inicio", href: paths.home.getHref() },
            { label: "Productos", href: paths.app.products.getHref() },
            { label: "Producto no encontrado" },
          ]}
        />
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-heading font-bold text-foreground">
            Producto no encontrado
          </h1>
          <p className="text-muted-foreground">
            El producto que buscas no existe o ya no está disponible.
          </p>
          <Link to={paths.app.products.getHref()}>
            <Button variant="outline" className="rounded-control">
              Volver a productos
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (status === "error" || !product) {
    return (
      <div className="p-4 md:p-6">
        <PageHeader
          breadcrumbs={[
            { label: "Inicio", href: paths.home.getHref() },
            { label: "Productos", href: paths.app.products.getHref() },
            { label: "Error" },
          ]}
        />
        <div className="flex flex-col items-start gap-4">
          <p className="text-muted-foreground">No se pudo cargar el producto.</p>
          <Button variant="outline" className="rounded-control" onClick={fetchProduct}>
            Reintentar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <AnimatedPage>
      <div className="p-4 md:p-6">
        <PageHeader
          breadcrumbs={[
            { label: "Inicio", href: paths.home.getHref() },
            { label: "Productos", href: paths.app.products.getHref() },
            { label: product.name },
          ]}
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-card border border-border bg-surface-raised shadow-card">
            <Image
              src={product.image}
              alt={product.name}
              className="h-full w-full rounded-card object-contain object-center p-4"
            />
          </div>

          <div>
            {product.category && (
              <p className="mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                {product.category}
              </p>
            )}
            <h1 className="mb-4 text-heading font-bold text-foreground">
              {product.name}
            </h1>
            <div className="mb-6 flex items-center gap-2">
              <span className="text-heading font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
            </div>

            {product.description && (
              <p className="mb-6 whitespace-pre-line text-muted-foreground">
                {product.description}
              </p>
            )}

            <div className="mb-6">
              <h3 className="mb-2 font-medium text-foreground">Cantidad</h3>
              <div className="flex w-32 items-center rounded-control border border-border bg-surface">
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-l-control border-r border-border text-muted-foreground transition-colors hover:bg-surface-raised hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  aria-label="Disminuir cantidad"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(Number.parseInt(e.target.value) || 1)
                  }
                  className="w-12 border-none bg-transparent p-0 text-center text-foreground focus:outline-none focus:ring-0"
                  aria-label="Cantidad"
                />
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-r-control border-l border-border text-muted-foreground transition-colors hover:bg-surface-raised hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Button
              className="w-full rounded-control sm:w-auto"
              onClick={handleAddToCart}
              isLoading={isAdding}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Añadir al carrito
            </Button>
          </div>
        </div>

        {similarProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-heading font-bold text-foreground">
              Productos relacionados
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {similarProducts.map((similarProduct) => (
                <ProductCard
                  key={similarProduct.id}
                  product={similarProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </AnimatedPage>
  )
}
