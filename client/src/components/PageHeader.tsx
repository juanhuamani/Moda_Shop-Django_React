import { ChevronRight } from "lucide-react"

export function PageHeader() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center text-sm text-[hsl(215,100%,92%)/70]">
          <a href="#" className="hover:text-[hsl(215,100%,92%)]">
            Inicio
          </a>
          <ChevronRight className="mx-2 h-4 w-4" />
          <span className="text-[hsl(215,100%,92%)]">Tienda</span>
        </div>
      </div>

      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[hsl(215,100%,92%)]">Tienda</h1>
        <p className="text-[hsl(215,100%,92%)/70]">Explora nuestra colección de productos</p>
      </div>
    </>
  )
}
