import { ChevronRight } from "lucide-react"

export function PageHeader() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center text-sm text-tertiary">
          <a href="#" className="hover:text-tertiary">
            Inicio
          </a>
          <ChevronRight className="mx-2 h-4 w-4" />
          <span className="text-tertiary">Tienda</span>
        </div>
      </div>
    </>
  )
}
