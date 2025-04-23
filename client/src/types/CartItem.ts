import { Product } from "./Product";

interface CartItem {
    id: number;
    product: Product;
    quantity: number;
}

export type { CartItem };