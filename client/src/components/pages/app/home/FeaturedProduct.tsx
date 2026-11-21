import { ProductCard } from "@/components/common/ProductCard"
import { Product } from "@/types/Product"

export function FeaturedProduct({ product }: { product: Product }) {
  return (
    <div className="col-span-full md:col-span-4 lg:col-span-5">
      <ProductCard product={product} highlightLabel="Destacado" />
    </div>
  )
}
