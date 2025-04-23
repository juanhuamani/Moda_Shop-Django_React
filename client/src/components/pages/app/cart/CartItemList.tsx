import { Minus, Plus, Trash2, Check } from "lucide-react"
import { Button, Image } from "@/components/ui"
import { Tooltip } from "@/components/ui/ToolTip"
import { CartItem } from "@/types/CartItem"

interface CartItemListProps {
  items: Array<CartItem & { hasChanged: boolean; isUpdating: boolean }>
  onQuantityChange: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
  onUpdateItem: (id: number) => void
}

export function CartItemList({ items, onQuantityChange, onUpdateItem, onRemoveItem }: CartItemListProps) {
  return (
      <div className="divide-y divide-[hsl(224,34%,30%)]">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col p-4 sm:flex-row">
            <div className="mb-4 flex sm:mb-0 sm:w-32 sm:flex-none">
              <Image
                src={item.product.image || "/placeholder.svg"}
                alt={item.product.name}
                className="h-24 w-24 rounded-md border border-[hsl(224,34%,30%)] object-cover sm:h-32 sm:w-32"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between sm:pl-4">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-[hsl(215,100%,92%)]">{item.product.name}</h3>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-[hsl(215,100%,92%)]">€{item.product.price}</div>
                    {item.product.originalPrice && (
                      <div className="text-sm text-[hsl(215,100%,92%)/70] line-through">
                        €{item.product.originalPrice}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Tooltip content="Disminuir cantidad">
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                  </Tooltip>
                  <span className="mx-2 w-8 text-center text-[hsl(215,100%,92%)]">{item.quantity}</span>
                  <Tooltip content="Aumentar cantidad">
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </Tooltip>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-medium text-[hsl(215,100%,92%)]">€{(item.product.price * item.quantity).toFixed(2)}</div>
                  <Tooltip content="Actualizar producto">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-tertiary bg-primary hover:bg-secondary"
                      onClick={() => onUpdateItem(item.id)}
                      disabled={!item.hasChanged || item.isUpdating}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Eliminar producto">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-tertiary bg-primary hover:bg-secondary"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
  )
}
