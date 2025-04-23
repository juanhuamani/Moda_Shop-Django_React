import { ChevronRight } from 'lucide-react'

import { AnimatedPage } from "@/components/layouts/AnimatedPage";


export function ProductsRoute() {
  
  return (
     <AnimatedPage>
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <div className="flex items-center text-sm text-[hsl(215,100%,92%)/70]">
            <a href="#" className="hover:text-[hsl(215,100%,92%)]">
              Inicio
            </a>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span className="text-[hsl(215,100%,92%)]">Productos</span>
          </div>
        </div>
      </div>
    </AnimatedPage> 
  )
}
