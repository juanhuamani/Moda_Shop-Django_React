import { useCallback, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { AxiosError } from "axios"
import { Minus, Plus, ShoppingBag } from "lucide-react"

import { Button, Card, Image } from "@/components/ui"
import { CardContent } from "@/components/ui/Card"
import { PageHeader } from "@/components/PageHeader"
import { AnimatedPage } from "@/components/layouts/AnimatedPage"
import LoadingPage from "@/components/common/LoadingPage"
import { api } from "@/axios/BaseAxios"
import { addToCart, updateCartItem } from "@/services/cartService"
import { paths } from "@/config/paths"
import { Product } from "@/types/Product"

interface ProductDetail extends Product {
  similar_products?: Product[]
}

type PageStatus = "loading" | "ready" | "not-found" | "error"

const formatPrice = (price: string | number): string => {
  const numeric = typeof price === "number" ? price : Number.parseFloat(price)
  if (Number.isNaN(numeric)) {
    return String(price)
  }
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(numeric)
}

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
          <h1 className="text-2xl font-bold text-[hsl(215,100%,92%)]">
            Producto no encontrado
          </h1>
          <p className="text-tertiary">
            El producto que buscas no existe o ya no está disponible.
          </p>
          <Link to={paths.app.products.getHref()}>
            <Button variant="outline">Volver a productos</Button>
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
          <p className="text-tertiary">No se pudo cargar el producto.</p>
          <Button variant="outline" onClick={fetchProduct}>
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
          <div className="relative aspect-square overflow-hidden rounded-lg border border-[hsl(224,34%,30%)] bg-[hsl(224,34%,25%)]">
            <Image
              src={product.image || ""}
              alt={product.name}
              className="object-contain object-center w-full h-full p-4"
            />
          </div>

          <div>
            {product.category && (
              <p className="mb-2 text-sm uppercase tracking-wide text-[hsl(215,100%,92%)/70]">
                {product.category}
              </p>
            )}
            <h1 className="mb-4 text-3xl font-bold text-[hsl(215,100%,92%)]">
              {product.name}
            </h1>
            <div className="mb-6 flex items-center gap-2">
              <span className="text-3xl font-bold text-[hsl(215,100%,92%)]">
                {formatPrice(product.price)}
              </span>
            </div>

            {product.description && (
              <p className="mb-6 whitespace-pre-line text-[hsl(215,100%,92%)/80]">
                {product.description}
              </p>
            )}

            <div className="mb-6">
              <h3 className="mb-2 font-medium text-[hsl(215,100%,92%)]">
                Cantidad
              </h3>
              <div className="flex w-32 items-center rounded-md border border-[hsl(224,34%,30%)]">
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center border-r border-[hsl(224,34%,30%)] text-[hsl(215,100%,92%)/70] hover:bg-[hsl(224,34%,25%)] hover:text-[hsl(215,100%,92%)]"
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
                  className="w-12 border-none bg-transparent p-0 text-center text-[hsl(215,100%,92%)] focus:outline-none focus:ring-0"
                />
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center border-l border-[hsl(224,34%,30%)] text-[hsl(215,100%,92%)/70] hover:bg-[hsl(224,34%,25%)] hover:text-[hsl(215,100%,92%)]"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Button
              className="w-full sm:w-auto"
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
            <h2 className="mb-6 text-2xl font-bold text-[hsl(215,100%,92%)]">
              Productos relacionados
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {similarProducts.map((similarProduct) => (
                <Card
                  key={similarProduct.id}
                  className="overflow-hidden border-[hsl(224,34%,30%)]"
                >
                  <Link
                    to={paths.app.products.details.getHref(similarProduct.slug)}
                  >
                    <div className="relative aspect-square overflow-hidden bg-[hsl(224,34%,25%)]">
                      <Image
                        src={similarProduct.image || ""}
                        alt={similarProduct.name}
                        className="object-cover object-center w-full h-full transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="mb-1 font-medium text-[hsl(215,100%,92%)]">
                        {similarProduct.name}
                      </h3>
                      <span className="font-bold text-[hsl(215,100%,92%)]">
                        {formatPrice(similarProduct.price)}
                      </span>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </AnimatedPage>
  )
}
