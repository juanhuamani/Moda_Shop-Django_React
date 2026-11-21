import type React from "react"
import {Link} from "react-router-dom"
import Logo from "@/assets/logo.webp"
import HeroImage from "@/assets/pages/hero.jpg"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Auth form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 lg:w-1/2 sm:px-6 lg:px-8 xl:px-12 bg-background">
        <div className="mx-auto w-full max-w-sm sm:max-w-md">
          <div className="mb-10">
            <Link to="/" className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary">
                <img
                  src={Logo}
                  alt="ModaShop"
                  className="h-8 w-8 rounded-full"
                />
              </div>
              <span className="ml-2 text-xl font-bold text-tertiary">ModaShop</span>
            </Link>
          </div>
          {children}
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 bg-secondary-light">
        <div className="flex h-full items-center justify-center p-8">
          <div className="relative h-full w-full max-w-2xl rounded-xl overflow-hidden">
            <img
              src={HeroImage}
              alt="Colección ModaShop"
              width={1200}
              height={800}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary-light to-transparent opacity-80"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <h2 className="mb-2 text-heading font-bold text-foreground">Descubre tu próximo look</h2>
              <p className="text-foreground/80">
                Explora la nueva colección y encuentra prendas exclusivas para renovar tu armario.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

