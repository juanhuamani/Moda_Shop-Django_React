import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { Checkbox, Label, Input, Button } from "@/components/ui"

interface FilterSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-[hsl(224,34%,30%)] py-4 last:border-0">
      <button
        className="flex w-full items-center justify-between text-left font-medium text-[hsl(215,100%,92%)]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  )
}

export function ProductFilters() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-1">
          <h3 className="font-medium text-[hsl(215,100%,92%)]">Filtros</h3>
          <p className="text-sm text-[hsl(215,100%,92%)/70]">Refina tu búsqueda</p>
        </div>

        <FilterSection title="Categorías">
          <div className="space-y-2">
            {/*{categories.map((category) => (
              <div key={category.name} className="flex items-center gap-2">
                <Checkbox id={`category-${category.name}`} />
                <Label htmlFor={`category-${category.name}`} className="text-sm">
                  {category.name} <span className="text-[hsl(215,100%,92%)/70]">({category.count})</span>
                </Label>
              </div>
            ))}*/}
          </div>
        </FilterSection>

        <FilterSection title="Precio">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price-min" className="text-xs">
                  Mínimo
                </Label>
                <Input id="price-min" type="number" placeholder="0" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="price-max" className="text-xs">
                  Máximo
                </Label>
                <Input id="price-max" type="number" placeholder="1000" className="mt-1" />
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Aplicar
            </Button>
          </div>
        </FilterSection>

        <FilterSection title="Tallas">
          <div className="grid grid-cols-3 gap-2">
            {["36", "37", "38", "39", "40", "41", "42", "43", "44"].map((size) => (
              <div key={size} className="flex items-center gap-2">
                <Checkbox id={`size-${size}`} />
                <Label htmlFor={`size-${size}`} className="text-sm">
                  {size}
                </Label>
              </div>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Colores">
          <div className="flex flex-wrap gap-2">
            {[
              { name: "Negro", color: "bg-black" },
              { name: "Blanco", color: "bg-white" },
              { name: "Rojo", color: "bg-red-500" },
              { name: "Azul", color: "bg-blue-500" },
              { name: "Verde", color: "bg-green-500" },
              { name: "Amarillo", color: "bg-yellow-500" },
            ].map((color) => (
              <div key={color.name} className="flex items-center gap-2">
                <div className="flex items-center">
                  <input type="checkbox" id={`color-${color.name}`} className="peer sr-only" />
                  <label
                    htmlFor={`color-${color.name}`}
                    className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-[hsl(224,34%,30%)] ${color.color} peer-checked:ring-2 peer-checked:ring-[hsl(215,100%,92%)]`}
                    title={color.name}
                  />
                </div>
              </div>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Valoración">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <Checkbox id={`rating-${rating}`} />
                <Label htmlFor={`rating-${rating}`} className="flex items-center text-sm">
                  {Array.from({ length: rating }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-yellow-500"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                  {Array.from({ length: 5 - rating }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-[hsl(215,100%,92%)/30]"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                  <span className="ml-1">o más</span>
                </Label>
              </div>
            ))}
          </div>
        </FilterSection>

        <div className="mt-6 flex flex-col gap-2">
          <Button className="w-full">Aplicar filtros</Button>
          <Button variant="outline" className="w-full">
            Restablecer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
