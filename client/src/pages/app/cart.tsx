import { useState, useEffect } from "react"
import { ShoppingCart, Trash2, ArrowLeft, CreditCard } from 'lucide-react'
import { Button, Input } from "@/components/ui"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"

import { CartItemList } from "@/components/pages/app/cart/CartItemList"
import { OrderSummary } from "@/components/pages/app/cart/OrderSummary"
import { EmptyCart } from "@/components/pages/app/cart/EmptyCart"

import { CartItem } from "@/types/CartItem"

import { getCart, updateCartItem, removeFromCart, clearCart } from "@/services/cartService"
import LoadingPage from "@/components/common/LoadingPage"
import { AnimatedPage } from "@/components/layouts/AnimatedPage"
import { PageHeader } from "@/components/PageHeader"

export function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [originalItems, setOriginalItems] = useState<CartItem[]>([])
  const [updatingItems, setUpdatingItems] = useState<number[]>([])
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isClearing, setIsClearing] = useState(false) 
  const [discount, setDiscount] = useState<number>(0)
  const [subtotal, setSubtotal] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true)
      try {
        const data = await getCart()
        setItems(data.cart.items)
        setOriginalItems(data.cart.items)
        setSubtotal(data.cart.sum_total)
        setTotal(data.cart.sum_total - discount)
      } catch (error) {
        console.error("Error al obtener el carrito:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCart()
  }, [])

  const processedItems = items.map(item => ({
    ...item,
    hasChanged: item.quantity !== originalItems.find(oi => oi.id === item.id)?.quantity,
    isUpdating: updatingItems.includes(item.id)
  }))

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
    )
  }

  const handleUpdateItem = async (id: number) => {
    const item = items.find(item => item.id === id)
    if (!item) return

    try {
      setUpdatingItems(prev => [...prev, id])
      const response = await updateCartItem(item.id, item.quantity)
      
      setOriginalItems(prev => 
        prev.map(original => 
          original.id === id ? {...original, quantity: item.quantity} : original
        )
      )
      setSubtotal(response.cart.sum_total)
      setTotal(response.cart.sum_total - discount)
    } catch (error) {
      console.error("Error al actualizar el carrito:", error)
    } finally {
      setUpdatingItems(prev => prev.filter(itemId => itemId !== id))
    }
  }

  const handleRemoveItem = async (id: number) => {
    try {
      setUpdatingItems(prev => [...prev, id])
      const response = await removeFromCart(id)
      setSubtotal(response.cart.sum_total)
      setTotal(response.cart.sum_total - discount)
      setItems(prevItems => prevItems.filter(item => item.id !== id))
      setOriginalItems(prevItems => prevItems.filter(item => item.id !== id))
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error) 
    } finally {
      setUpdatingItems(prev => prev.filter(itemId => itemId!== id)) 
    }
  }

  const handleClearCart = async () => {
    try {
      setIsClearing(true)
      await clearCart()
      setItems([])
      setOriginalItems([])
      setCouponCode("")
      setDiscount(0)
      setSubtotal(0)
      setTotal(0)
    } catch (error) {
      console.error("Error al vaciar el carrito:", error) 
    } finally {
      setIsClearing(false)
    }
  }

  const handleApplyCoupon = () => {
    if (!couponCode) return
    setIsApplyingCoupon(true)
    
    setTimeout(() => {
      setIsApplyingCoupon(false)
      setDiscount(10)
      alert(`Cupón "${couponCode}" aplicado con éxito`)
    }, 1000)
  }

  if (isLoading) {
    return <LoadingPage message="Cargando carrito" /> 
  }

  return (
    <AnimatedPage>
      <div className="p-4 md:p-6">
      <PageHeader
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Carrito", href: "/app/cart" },
        ]}
      />

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[hsl(215,100%,92%)]">Tu Carrito</h1>
            <p className="text-tertiary">
              {items.length > 0
                ? `${items.length} ${items.length === 1 ? "producto" : "productos"} en tu carrito`
                : "Tu carrito está vacío"}
            </p>
          </div>
          <Button variant="outline">
            <a href="/app" className="flex flex-row justify-center items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Seguir comprando
            </a>
          </Button>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="border-b border-[hsl(224,34%,30%)]">
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5" /> Productos en tu carrito
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <CartItemList
                    items={processedItems}
                    onQuantityChange={handleQuantityChange}
                    onRemoveItem={handleRemoveItem}
                    onUpdateItem={handleUpdateItem}
                  />
                </CardContent>
                <CardFooter className="flex flex-col border-t border-[hsl(224,34%,30%)] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-4 flex w-full flex-col gap-2 sm:mb-0 sm:max-w-xs">
                    <div className="flex">
                      <Input
                        placeholder="Código de descuento"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="rounded-r-none"
                      />
                      <Button
                        onClick={handleApplyCoupon}
                        disabled={!couponCode || isApplyingCoupon}
                        className="rounded-l-none"
                      >
                        {isApplyingCoupon ? "Aplicando..." : "Aplicar"}
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" onClick={handleClearCart} disabled={isClearing} isLoading={isClearing }>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Vaciar carrito
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <OrderSummary
                subtotal={subtotal}
                discount={discount}
                total={total}
                isUpdating={updatingItems.length > 0}
              />

              <Card className="mt-6">
                <CardHeader className="border-b border-[hsl(224,34%,30%)]">
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" /> Métodos de pago aceptados
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {["Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay"].map((method) => (
                      <div
                        key={method}
                        className="flex h-10 items-center justify-center rounded-md bg-[hsl(224,34%,25%)] px-3 text-sm font-medium text-[hsl(215,100%,92%)]"
                      >
                        {method}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </AnimatedPage>
  )
}