import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui"
import { Card, CardContent } from "@/components/ui/Card"

export function EmptyCart() {
  return (
    <Card className="mx-auto max-w-2xl">
      <CardContent className="flex flex-col items-center p-8 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(224,34%,25%)]">
          <ShoppingCart className="h-10 w-10 text-[hsl(215,100%,92%)/70]" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-[hsl(215,100%,92%)]">Tu carrito está vacío</h2>
        <p className="mb-6 text-[hsl(215,100%,92%)/70]">Parece que aún no has añadido ningún producto a tu carrito.</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg">
            <a href="/products">Explorar productos</a>
          </Button>
          <Button variant="outline" size="lg">
            <a href="/categories">Ver categorías</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
