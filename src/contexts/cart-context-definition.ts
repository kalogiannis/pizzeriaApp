

import { createContext } from "react";
import type { CartItem } from "../types";

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (cartItem: CartItem) => void;
  removeFromCart: (_id: string) => void;
  clearCart: () => void;
  totalAmount: number;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);
