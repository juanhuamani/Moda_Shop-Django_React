import { Badge, Button } from "@/components/ui"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { ArrowRight, ChevronRight } from "lucide-react"

interface Category {
  name: string
  icon: string
  count: number
}

interface CategoriesSectionProps {
  categories: Category[]
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <Card className="col-span-full md:col-span-4">
      <CardHeader>
        <CardTitle>Categorías populares</CardTitle>
        <CardDescription>Explora nuestras categorías más buscadas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {categories.map((category) => (
          <a
            key={category.name}
            href="#"
            className="flex items-center justify-between rounded-lg border border-[hsl(224,34%,30%)] p-3 transition-colors hover:bg-[hsl(224,34%,25%)]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[hsl(224,34%,25%)] text-xl">
                {category.icon}
              </div>
              <span className="font-medium text-[hsl(215,100%,92%)]">{category.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{category.count}</Badge>
              <ChevronRight className="h-4 w-4 text-[hsl(215,100%,92%)/50]" />
            </div>
          </a>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full">
          Ver todas las categorías <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
