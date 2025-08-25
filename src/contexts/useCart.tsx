import { useContext } from 'react';
import { CartContext } from './cart-context-types'; // Assuming CartContext is in the same directory
import type { CartContextType } from './cart-context-types'; // Import the type

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
