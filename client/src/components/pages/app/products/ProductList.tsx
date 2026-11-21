import { ProductCard } from "@/components/common/ProductCard"
import { Product } from "@/types/Product"

export function ProductList({ allProducts }: { allProducts: Product[] }) {
  return (
    <div className="space-y-4">
      {allProducts.map((product) => (
        <ProductCard key={product.id} product={product} variant="list" />
      ))}
    </div>
  )
}
