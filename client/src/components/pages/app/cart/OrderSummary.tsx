import { Button, Spinner } from "@/components/ui";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

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
          <CardHeader className="border-b border-[hsl(224,34%,30%)]">
            <CardTitle>Actualizando pedido...</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex justify-center items-center">
              <Spinner className="h-5 w-5 text-[hsl(215,100%,92%)]" />
            </div>
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader className="border-b border-[hsl(224,34%,30%)]">
            <CardTitle>Resumen del pedido</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[hsl(215,100%,92%)/70]">Subtotal</span>
                <span className="font-medium text-[hsl(215,100%,92%)]">
                  €{subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[hsl(215,100%,92%)/70]">Envío</span>
                <span className="font-medium text-[hsl(215,100%,92%)]">
                  {"Gratis"}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-[hsl(215,100%,92%)/70]">Descuento</span>
                  <span className="font-medium text-green-500">
                    -€{discount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="border-t border-[hsl(224,34%,30%)] pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-medium text-[hsl(215,100%,92%)]">
                    Total
                  </span>
                  <span className="text-lg font-bold text-[hsl(215,100%,92%)]">
                    €{total.toFixed(2)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[hsl(215,100%,92%)/70]">
                  Impuestos incluidos. El envío se calcula en el checkout.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-[hsl(224,34%,30%)] p-4">
            <Button className="w-full" size="lg">
              Proceder al pago
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
