import React, { useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import { CartContext } from './cart-context-definition';
import type { CartItem } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface CartState {
  cartItems: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { _id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.cartItems.find(item => item._id === action.payload._id);
      if (existingItem) {
        // If item exists, update its quantity and totalPrice
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item._id === action.payload._id
              ? {
                  ...item,
                  quantity: item.quantity + action.payload.quantity,
                  totalPrice: (item.totalPrice || item.price * item.quantity) + (action.payload.totalPrice || action.payload.price * action.payload.quantity)
                }
              : item
          ),
        };
      } else {
        // If item is new, add it with its totalPrice
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item._id !== action.payload),
      };
    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case 'CLEAR_CART':
      return { cartItems: [] };
    default:
      return state;
  }
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cartItems: [] }, (initialState) => {
    const storedCartItems = sessionStorage.getItem('cartItems');
    return storedCartItems ? { cartItems: JSON.parse(storedCartItems) } : initialState;
  });

  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const addToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeFromCart = (_id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: _id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const totalAmount = state.cartItems.reduce((total: number, item: CartItem) => {
    // Use totalPrice if available (includes options), otherwise use base price * quantity
    const itemTotal = item.totalPrice || (item.price * item.quantity);
    return total + itemTotal;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
