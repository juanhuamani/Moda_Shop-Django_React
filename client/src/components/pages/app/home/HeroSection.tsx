import { Button, Carousel } from "@/components/ui"
import { Card } from "@/components/ui/Card"
import HeroImage from "@/assets/pages/hero.jpg"
import HeroImage2 from "@/assets/pages/hero2.jpg"
import HeroImage3 from "@/assets/pages/hero3.jpg"

export function HeroSection() {
  return (
    <Card className="col-span-full overflow-hidden">
      <div className="relative h-[300px] w-full md:h-[400px]">
        <Carousel
          images={[HeroImage, HeroImage2, HeroImage3]}
          interval={5000}
          className="rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,47%,10%)] to-transparent p-8 flex flex-col justify-center">
          <h1 className="mb-2 max-w-md text-3xl font-bold text-[hsl(215,100%,92%)] md:text-4xl lg:text-5xl">
            Nueva Colección Primavera 2025
          </h1>
          <p className="mb-6 max-w-md text-[hsl(215,100%,92%)/80]">
            Descubre las últimas tendencias y renueva tu armario con nuestras prendas exclusivas.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg">Comprar ahora</Button>
            <Button variant="outline" size="lg">
              Ver catálogo
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}