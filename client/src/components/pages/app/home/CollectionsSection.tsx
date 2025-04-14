import { Button } from "@/components/ui"
import { Card } from "@/components/ui/Card"

interface Collection {
  name: string
  image: string
}

interface CollectionsSectionProps {
  collections: Collection[]
}

export function CollectionsSection({ collections }: CollectionsSectionProps) {
  return (
    <div className="col-span-full">
      <h2 className="mb-6 text-2xl font-bold text-[hsl(215,100%,92%)]">Colecciones destacadas</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {collections.map((collection, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="relative h-[300px]">
              <img
                src={collection.image || "/placeholder.svg"}
                alt={collection.name}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[hsl(220,47%,10%)] to-transparent p-6">
                <div>
                  <h3 className="mb-2 text-xl font-bold text-[hsl(215,100%,92%)]">Colección {collection.name}</h3>
                  <Button variant="outline" className="border-[hsl(215,100%,92%)] text-[hsl(215,100%,92%)]">
                    Explorar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
