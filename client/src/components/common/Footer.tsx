import { Link } from "react-router-dom"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { Button, Input } from "@/components/ui"
import { Container } from "@/components/ui/Container"
import { paths } from "@/config/paths"
import { cn } from "@/utils/cn"

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

const quickLinks = [
  { label: "Inicio", href: paths.app.root.path },
  { label: "Productos", href: paths.app.products.path },
  { label: "Categorías", href: paths.app.categories.path },
  { label: "Ofertas", href: paths.app.discounts.path },
  { label: "Novedades", href: paths.app.products.path },
  { label: "Contacto", href: paths.app.help.path },
]

const helpLinks = [
  "Preguntas frecuentes",
  "Envíos y entregas",
  "Devoluciones",
  "Métodos de pago",
  "Política de privacidad",
  "Términos y condiciones",
].map((label) => ({ label, href: paths.app.help.path }))

const socialLinks = [
  { label: "Facebook", href: paths.home.path, Icon: Facebook },
  { label: "Twitter", href: paths.home.path, Icon: Twitter },
  { label: "Instagram", href: paths.home.path, Icon: Instagram },
]

export function Footer() {
  return (
    <footer className="mt-12 border-t border-border bg-surface/40">
      <Container className="py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="mb-4 text-heading font-bold text-card-foreground">ModaShop</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Tu destino para la moda de alta calidad. Ofrecemos las últimas tendencias con un servicio excepcional.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  to={href}
                  aria-label={label}
                  className={cn("rounded-control text-muted-foreground transition-colors hover:text-foreground", focusRing)}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-title font-bold text-card-foreground">Enlaces rápidos</h2>
            <ul className="space-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className={cn("rounded-control text-sm text-muted-foreground transition-colors hover:text-foreground", focusRing)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-title font-bold text-card-foreground">Ayuda</h2>
            <ul className="space-y-2">
              {helpLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className={cn("rounded-control text-sm text-muted-foreground transition-colors hover:text-foreground", focusRing)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-title font-bold text-card-foreground">Contacto</h2>
            <address className="not-italic text-sm text-muted-foreground">
              <p className="mb-2">Calle Comercio 123</p>
              <p className="mb-2">28001 Madrid, España</p>
              <p className="mb-2">info@modashop.com</p>
              <p className="mb-4">+34 912 345 678</p>
            </address>
            <div className="flex flex-col gap-2">
              <Input type="email" placeholder="Tu correo electrónico" aria-label="Correo electrónico" className="bg-surface-raised" />
              <Button type="button" className={focusRing}>Suscribirse</Button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ModaShop. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  )
}
