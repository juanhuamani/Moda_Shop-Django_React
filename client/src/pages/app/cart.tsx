import { useCallback, useEffect, useState } from "react";
import { ShoppingCart, Trash2, ArrowLeft, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui";
import { buttonVariants } from "@/components/ui/Button";

import { CartItemList } from "@/components/pages/app/cart/CartItemList";
import { OrderSummary } from "@/components/pages/app/cart/OrderSummary";
import { EmptyCart } from "@/components/pages/app/cart/EmptyCart";

import { ErrorState } from "@/components/common/ErrorState";
import { Skeleton } from "@/components/common/Skeleton";
import { CartItem } from "@/types/CartItem";

import { getCart, updateCartItem, removeFromCart, clearCart } from "@/services/cartService";
import { AnimatedPage } from "@/components/layouts/AnimatedPage";
import { PageHeader } from "@/components/PageHeader";
import { paths } from "@/config/paths";
import { showErrorToast, showInfoToast, showSuccessToast } from "@/utils/toast";

export function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [originalItems, setOriginalItems] = useState<CartItem[]>([]);
  const [updatingItems, setUpdatingItems] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [subtotal, setSubtotal] = useState<number>(0);

  const fetchCart = useCallback(async () => {
    setIsLoading(true);
    setFetchError(false);
    try {
      const data = await getCart();
      setItems(data.cart.items);
      setOriginalItems(data.cart.items);
      setSubtotal(data.cart.sum_total);
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      setFetchError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const processedItems = items.map(item => ({
    ...item,
    hasChanged: item.quantity !== originalItems.find(oi => oi.id === item.id)?.quantity,
    isUpdating: updatingItems.includes(item.id)
  }));

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleUpdateItem = async (id: number) => {
    const item = items.find(item => item.id === id);
    if (!item) return;

    try {
      setUpdatingItems(prev => [...prev, id]);
      const response = await updateCartItem(item.id, item.quantity);

      setOriginalItems(prev =>
        prev.map(original =>
          original.id === id ? {...original, quantity: item.quantity} : original
        )
      );
      setSubtotal(response.cart.sum_total);
      showSuccessToast("Cantidad actualizada");
    } catch (error) {
      console.error("Error al actualizar el carrito:", error);
      showErrorToast("No se pudo actualizar el carrito");
    } finally {
      setUpdatingItems(prev => prev.filter(itemId => itemId !== id));
    }
  };

  const handleRemoveItem = async (id: number) => {
    try {
      setUpdatingItems(prev => [...prev, id]);
      const response = await removeFromCart(id);
      setSubtotal(response.cart.sum_total);
      setItems(prevItems => prevItems.filter(item => item.id !== id));
      setOriginalItems(prevItems => prevItems.filter(item => item.id !== id));
      showInfoToast("Producto eliminado del carrito");
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
      showErrorToast("No se pudo eliminar el producto");
    } finally {
      setUpdatingItems(prev => prev.filter(itemId => itemId !== id));
    }
  };

  const handleClearCart = async () => {
    try {
      setIsClearing(true);
      await clearCart();
      setItems([]);
      setOriginalItems([]);
      setSubtotal(0);
      showSuccessToast("Carrito vaciado");
    } catch (error) {
      console.error("Error al vaciar el carrito:", error);
      showErrorToast("No se pudo vaciar el carrito");
    } finally {
      setIsClearing(false);
    }
  };

  if (isLoading) {
    return (
      <AnimatedPage>
        <div className="p-4 md:p-6" role="status" aria-live="polite" aria-busy="true">
          <span className="sr-only">Cargando carrito...</span>
          <div className="mb-6 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-9 w-56" />
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-4 rounded-card border border-card-border bg-card p-6 lg:col-span-2">
              <Skeleton className="h-7 w-48" />
              {[0, 1, 2].map((index) => (
                <div key={index} className="flex items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded-control" />
                  <div className="flex flex-1 flex-col gap-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4 rounded-card border border-card-border bg-card p-6">
              <Skeleton className="h-7 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-11 w-full" />
            </div>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <div className="p-4 md:p-6">
        <PageHeader
          breadcrumbs={[
            { label: "Inicio", href: "/" },
            { label: "Carrito", href: paths.app.cart.getHref() },
          ]}
        />

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-heading font-semibold text-foreground">Tu Carrito</h1>
            <p className="text-muted-foreground">
              {fetchError
                ? "No pudimos cargar tu carrito"
                : items.length > 0
                  ? `${items.length} ${items.length === 1 ? "producto" : "productos"} en tu carrito`
                  : "Tu carrito está vacío"}
            </p>
          </div>
          <Link
            to={paths.app.root.getHref()}
            className={buttonVariants({ variant: "outline" })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Seguir comprando
          </Link>
        </div>

        {fetchError ? (
          <Card className="mx-auto max-w-2xl">
            <CardContent className="p-0">
              <ErrorState
                title="No pudimos cargar tu carrito"
                description="Revisa tu conexión e inténtalo de nuevo."
                onRetry={fetchCart}
              />
            </CardContent>
          </Card>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="border-b border-border">
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
                <CardFooter className="flex flex-col border-t border-border p-4 sm:flex-row sm:items-center sm:justify-end">
                  <Button variant="outline" onClick={handleClearCart} disabled={isClearing} isLoading={isClearing}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Vaciar carrito
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <OrderSummary
                subtotal={subtotal}
                discount={0}
                total={subtotal}
                isUpdating={updatingItems.length > 0}
              />

              <Card className="mt-6">
                <CardHeader className="border-b border-border">
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" /> Métodos de pago aceptados
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {["Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay"].map((method) => (
                      <div
                        key={method}
                        className="flex h-10 items-center justify-center rounded-control bg-surface-raised px-3 text-sm font-medium text-foreground"
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
  );
}
