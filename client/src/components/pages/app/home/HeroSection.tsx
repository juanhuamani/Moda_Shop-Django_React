import { Button, Carousel } from "@/components/ui"
import { Card } from "@/components/ui/Card"
import HeroImage from "@/assets/pages/hero.jpg"
import HeroImage2 from "@/assets/pages/hero2.jpg"
import HeroImage3 from "@/assets/pages/hero3.jpg"
import { paths } from "@/config/paths"
import { useNavigate } from "react-router-dom"

export function HeroSection() {
  const navigate = useNavigate()

  return (
    <Card className="col-span-full overflow-hidden">
      <div className="relative h-[300px] w-full md:h-[400px]">
        <Carousel
          images={[HeroImage, HeroImage2, HeroImage3]}
          interval={5000}
          className="rounded-card shadow-card"
        />
        <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-primary via-primary/80 to-transparent p-8">
          <span className="mb-4 inline-flex w-fit items-center rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-success-light">
            Nueva temporada
          </span>
          <h1 className="text-glow mb-2 max-w-lg text-display font-bold text-foreground md:text-6xl">
            Nueva Colección Primavera 2025
          </h1>
          <p className="mb-6 max-w-md text-foreground/80">
            Descubre las últimas tendencias y renueva tu armario con nuestras prendas exclusivas.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" rounded="full" onClick={() => navigate(paths.app.products.path)}>
              Comprar ahora
            </Button>
            <Button variant="outline" size="lg" rounded="full" onClick={() => navigate(paths.app.categories.path)}>
              Ver catálogo
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}