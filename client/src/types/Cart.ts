import { CartItem } from "./CartItem";

interface Cart {
  id: number;
  createdAt: string;
  updatedAt: string;
  items: CartItem[];
  num_of_items: number;
  sum_total: number;
}

export type { Cart };