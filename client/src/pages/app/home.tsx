"use client"
import { BenefitsSection } from "@/components/pages/app/home/BenefitsSection"
import { CategoriesSection } from "@/components/pages/app/home/CategoriesSection"
import { CollectionsSection } from "@/components/pages/app/home/CollectionsSection"
import { FeaturedProduct } from "@/components/pages/app/home/FeaturedProduct"
import { Footer } from "@/components/Footer"
import { HeroSection } from "@/components/pages/app/home/HeroSection"
import { HotDeals } from "@/components/pages/app/home/HotDeals"
import { InstagramFeed } from "@/components/pages/app/home/InstagramFeed"
import { PageHeader } from "@/components/PageHeader"
import { SpecialOffer } from "@/components/pages/app/home/SpecialOffer"
import { TrendingProducts } from "@/components/pages/app/home/TrendingProducts"

// Datos de ejemplo para productos
const featuredProducts = [
  {
    id: 1,
    name: "Zapatillas deportivas premium",
    price: "€129.99",
    image: "/placeholder.svg?height=400&width=400",
    discount: "20%",
    rating: 4.8,
    reviews: 124,
    isNew: true,
  },
  {
    id: 2,
    name: "Chaqueta impermeable",
    price: "€89.99",
    image: "/placeholder.svg?height=400&width=400",
    originalPrice: "€119.99",
    rating: 4.6,
    reviews: 98,
  },
  {
    id: 3,
    name: "Reloj inteligente",
    price: "€199.99",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.9,
    reviews: 215,
    isNew: true,
  },
  {
    id: 4,
    name: "Auriculares inalámbricos",
    price: "€79.99",
    image: "/placeholder.svg?height=400&width=400",
    originalPrice: "€99.99",
    rating: 4.7,
    reviews: 156,
  },
]

const categories = [
  { name: "Ropa", icon: "👕", count: 245 },
  { name: "Calzado", icon: "👟", count: 189 },
  { name: "Accesorios", icon: "👜", count: 312 },
  { name: "Deportes", icon: "🏃", count: 178 },
  { name: "Tecnología", icon: "📱", count: 203 },
]

const collections = [
  { name: "Verano 2025", image: "/placeholder.svg?height=600&width=800" },
  { name: "Esenciales", image: "/placeholder.svg?height=600&width=800" },
  { name: "Deportiva", image: "/placeholder.svg?height=600&width=800" },
]

export function HomePage() {
  return (
    <div className="p-4 md:p-6">
      <PageHeader />

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-6 lg:grid-cols-12">
        <HeroSection />
        <CategoriesSection categories={categories} />
        <FeaturedProduct />
        <SpecialOffer />
        <TrendingProducts products={featuredProducts} />
        <BenefitsSection />
        <CollectionsSection collections={collections} />
        <HotDeals />
        <InstagramFeed />
      </div>

      <Footer />
    </div>
  )
}
