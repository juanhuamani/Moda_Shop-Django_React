import { ProductCard } from "@/components/common/ProductCard"
import { Product } from "@/types/Product"

export function ProductGrid({ allProducts }: { allProducts: Product[]}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
      {allProducts.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  )
}
