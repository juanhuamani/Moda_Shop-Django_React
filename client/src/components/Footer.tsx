import { Button, Input } from "@/components/ui"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-12 border-t border-[hsl(224,34%,30%)] py-8">
      <div className="px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold text-[hsl(215,100%,92%)]">ModaShop</h3>
            <p className="mb-4 text-[hsl(215,100%,92%)/70]">
              Tu destino para la moda de alta calidad. Ofrecemos las últimas tendencias con un servicio excepcional.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[hsl(215,100%,92%)] hover:text-[hsl(215,100%,92%)/80]">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-[hsl(215,100%,92%)] hover:text-[hsl(215,100%,92%)/80]">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-[hsl(215,100%,92%)] hover:text-[hsl(215,100%,92%)/80]">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold text-[hsl(215,100%,92%)]">Enlaces rápidos</h3>
            <ul className="space-y-2">
              {["Inicio", "Productos", "Categorías", "Ofertas", "Novedades", "Contacto"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[hsl(215,100%,92%)/70] transition-colors hover:text-[hsl(215,100%,92%)]">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold text-[hsl(215,100%,92%)]">Ayuda</h3>
            <ul className="space-y-2">
              {[
                "Preguntas frecuentes",
                "Envíos y entregas",
                "Devoluciones",
                "Métodos de pago",
                "Política de privacidad",
                "Términos y condiciones",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[hsl(215,100%,92%)/70] transition-colors hover:text-[hsl(215,100%,92%)]">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold text-[hsl(215,100%,92%)]">Contacto</h3>
            <address className="not-italic">
              <p className="mb-2 text-[hsl(215,100%,92%)/70]">Calle Comercio 123</p>
              <p className="mb-2 text-[hsl(215,100%,92%)/70]">28001 Madrid, España</p>
              <p className="mb-2 text-[hsl(215,100%,92%)/70]">info@modashop.com</p>
              <p className="mb-4 text-[hsl(215,100%,92%)/70]">+34 912 345 678</p>
            </address>
            <div className="flex flex-col space-y-2">
              <Input placeholder="Tu correo electrónico" className="bg-[hsl(224,34%,25%)]" />
              <Button>Suscribirse</Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-[hsl(224,34%,30%)] pt-6 text-center">
          <p className="text-[hsl(215,100%,92%)/70]">
            © {new Date().getFullYear()} ModaShop. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
