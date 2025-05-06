"use client"

import { useState } from "react"
import { ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { addToCart } from "../../cart/actions"

interface AddToCartButtonProps {
  productId: number
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  showIcon?: boolean
  quantity?: number
  attributes?: Record<string, string>
}

export function AddToCartButton({
  productId,
  className,
  variant = "default",
  size = "default",
  showIcon = true,
  quantity = 1,
  attributes = {},
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      const result = await addToCart(productId, quantity, attributes)

      if (result.success) {
        setIsAdded(true)
        setTimeout(() => setIsAdded(false), 2000)
      } else {
        console.error("Error al añadir al carrito:", result.error)
        // Aquí podrías mostrar un toast o notificación de error
      }
    } catch (error) {
      console.error("Error al añadir al carrito:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleAddToCart}
      disabled={isLoading || isAdded}
    >
      {showIcon && <>{isAdded ? <Check className="mr-2 h-4 w-4" /> : <ShoppingCart className="mr-2 h-4 w-4" />}</>}
      {isAdded ? "Añadido" : isLoading ? "Añadiendo..." : "Añadir al carrito"}
    </Button>
  )
}
