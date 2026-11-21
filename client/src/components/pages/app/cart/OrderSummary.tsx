import { Button, Spinner } from "@/components/ui";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { formatPrice } from "@/utils/formatPrice";
import { showInfoToast } from "@/utils/toast";

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  total: number;
  isUpdating: boolean;
}

export function OrderSummary({
  subtotal,
  discount,
  total,
  isUpdating,
}: OrderSummaryProps) {
  return (
    <Card>
      {isUpdating ? (
        <>
          <CardHeader className="border-b border-border">
            <CardTitle>Actualizando pedido...</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex justify-center items-center">
              <Spinner className="h-5 w-5 text-ring" />
            </div>
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader className="border-b border-border">
            <CardTitle>Resumen del pedido</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Envío</span>
                <span className="font-medium text-foreground">
                  {"Gratis"}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Descuento</span>
                  <span className="font-medium text-success-light">
                    -{formatPrice(discount)}
                  </span>
                </div>
              )}
              <div className="border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-medium text-foreground">
                    Total
                  </span>
                  <span className="text-lg font-bold text-foreground">
                    {formatPrice(total)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Impuestos incluidos. El envío se calcula en el checkout.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-border p-4">
            <Button
              className="w-full"
              size="lg"
              onClick={() => showInfoToast("El pago estará disponible pronto")}
            >
              Proceder al pago
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
