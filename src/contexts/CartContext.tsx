

import React, { useReducer } from 'react';
import type { ReactNode } from 'react';
import type { CartItem } from '../types';
import { CartContext ,type CartContextType} from './cart-context-types'; 

// Define cart actions
type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; size: string; extras: string[]; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: number; size: string; extras: string[] } }
  | { type: 'CLEAR_CART' };

// Define cart state
interface CartState {
  items: CartItem[];
}

// Cart reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size &&
          JSON.stringify(item.extras.sort()) === JSON.stringify(action.payload.extras.sort())
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity,
          totalPrice: updatedItems[existingItemIndex].totalPrice + action.payload.totalPrice
        };
        return { ...state, items: updatedItems };
      } else {
        return { ...state, items: [...state.items, action.payload] };
      }
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item => {
        if (item.productId === action.payload.productId &&
            item.size === action.payload.size &&
            JSON.stringify(item.extras.sort()) === JSON.stringify(item.extras.sort())) {
          const pricePerItem = item.totalPrice / item.quantity;
          return {
            ...item,
            quantity: action.payload.quantity,
            totalPrice: pricePerItem * action.payload.quantity
          };
        }
        return item;
      });
      return { ...state, items: updatedItems };
    }

    case 'REMOVE_ITEM': {
      const filteredItems = state.items.filter(item =>
        !(item.productId === action.payload.productId &&
          item.size === action.payload.size &&
          JSON.stringify(item.extras.sort()) === JSON.stringify(item.extras.sort()))
      );
      return { ...state, items: filteredItems };
    }

    case 'CLEAR_CART':
      return { ...state, items: [] };

    default:
      return state;
  }
};

// Cart provider component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const updateQuantity = (productId: number, size: string, extras: string[], quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, size, extras, quantity } });
  };

  const removeItem = (productId: number, size: string, extras: string[]) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, size, extras } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalItems = (): number => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalValue = (): number => {
    return state.items.reduce((total, item) => total + item.totalPrice, 0);
  };

  const value: CartContextType = {
    state,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalItems,
    getTotalValue
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
