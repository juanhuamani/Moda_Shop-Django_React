import { ProductCard } from "@/components/common/ProductCard"
import { Product } from "@/types/Product"

type Collection = Product

interface CollectionsSectionProps {
  collections: Collection[]
}

export function CollectionsSection({ collections }: CollectionsSectionProps) {
  return (
    <div className="col-span-full">
      <h2 className="mb-6 text-heading font-bold text-foreground">
        Colecciones destacadas
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {collections.map((collection) => (
          <ProductCard
            key={collection.id}
            product={collection}
            highlightLabel="Colección"
          />
        ))}
      </div>
    </div>
  )
}
