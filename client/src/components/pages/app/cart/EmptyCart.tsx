import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui";
import { buttonVariants } from "@/components/ui/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { paths } from "@/config/paths";

export function EmptyCart() {
  return (
    <Card className="mx-auto max-w-2xl">
      <CardContent className="p-0">
        <EmptyState
          icon={<ShoppingCart className="h-8 w-8" />}
          title="Tu carrito está vacío"
          description="Parece que aún no has añadido ningún producto a tu carrito."
          action={
            <>
              <Link
                to={paths.app.products.getHref()}
                className={buttonVariants({ variant: "primary", size: "lg" })}
              >
                Explorar productos
              </Link>
              <Link
                to={paths.app.categories.getHref()}
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Ver categorías
              </Link>
            </>
          }
        />
      </CardContent>
    </Card>
  );
}
