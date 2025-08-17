
import React from 'react';
import ShoppingCartPage from './ShoppingCartPage';
import { useCart } from '@/contexts/CartContext';

const ShoppingCartPageWrapper: React.FC = () => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <ShoppingCartPage
      cartItems={state.items}
      onUpdateQuantity={updateQuantity}
      onRemoveItem={removeItem}
      onClearCart={clearCart}
    />
  );
};

export default ShoppingCartPageWrapper;
