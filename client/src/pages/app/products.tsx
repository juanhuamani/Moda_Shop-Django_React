import { useCallback, useEffect, useState } from "react"

import { AnimatedPage } from "@/components/layouts/AnimatedPage"
import { PageHeader } from "@/components/PageHeader"
import { ProductCard } from "@/components/common/ProductCard"
import { Button } from "@/components/ui"
import { api } from "@/axios/BaseAxios"
import { paths } from "@/config/paths"
import { Product } from "@/types/Product"

type FetchStatus = "loading" | "ready" | "error"

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
          <p className="text-muted-foreground">Cargando productos...</p>
        )}

        {status === "error" && (
          <div className="flex flex-col items-start gap-4">
            <p className="text-muted-foreground">
              No se pudieron cargar los productos.
            </p>
            <Button variant="outline" className="rounded-control" onClick={fetchProducts}>
              Reintentar
            </Button>
          </div>
        )}

        {status === "ready" && products.length === 0 && (
          <p className="text-muted-foreground">No hay productos disponibles.</p>
        )}

        {status === "ready" && products.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </AnimatedPage>
  )
}
