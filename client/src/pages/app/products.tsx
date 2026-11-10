import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { AnimatedPage } from "@/components/layouts/AnimatedPage"
import { PageHeader } from "@/components/PageHeader"
import { Button, Card, Image } from "@/components/ui"
import { CardContent } from "@/components/ui/Card"
import { api } from "@/axios/BaseAxios"
import { paths } from "@/config/paths"
import { Product } from "@/types/Product"

type FetchStatus = "loading" | "ready" | "error"

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

export function ProductsRoute() {
  const [products, setProducts] = useState<Product[]>([])
  const [status, setStatus] = useState<FetchStatus>("loading")

  const fetchProducts = useCallback(async () => {
    setStatus("loading")
    try {
      const { data } = await api.get("/api/products")
      setProducts((data.products ?? []) as Product[])
      setStatus("ready")
    } catch (error) {
      console.error("Error al obtener los productos:", error)
      setStatus("error")
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <AnimatedPage>
      <div className="p-4 md:p-6">
        <PageHeader
          breadcrumbs={[
            { label: "Inicio", href: paths.home.getHref() },
            { label: "Productos" },
          ]}
        />

        {status === "loading" && (
          <p className="text-tertiary">Cargando productos...</p>
        )}

        {status === "error" && (
          <div className="flex flex-col items-start gap-4">
            <p className="text-tertiary">
              No se pudieron cargar los productos.
            </p>
            <Button variant="outline" onClick={fetchProducts}>
              Reintentar
            </Button>
          </div>
        )}

        {status === "ready" && products.length === 0 && (
          <p className="text-tertiary">No hay productos disponibles.</p>
        )}

        {status === "ready" && products.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden border-[hsl(224,34%,30%)]"
              >
                <Link
                  to={paths.app.products.details.getHref(product.slug)}
                  className="block"
                >
                  <div className="relative aspect-square overflow-hidden bg-[hsl(224,34%,25%)]">
                    <Image
                      src={product.image || ""}
                      alt={product.name}
                      className="object-cover object-center w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="mb-1 font-medium text-[hsl(215,100%,92%)]">
                      {product.name}
                    </h3>
                    <span className="font-bold text-[hsl(215,100%,92%)]">
                      {formatPrice(product.price)}
                    </span>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AnimatedPage>
  )
}
