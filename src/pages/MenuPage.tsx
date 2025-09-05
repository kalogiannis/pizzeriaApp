
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuSideBar from '@/components/MenuSideBar';
import AddToCartPopup from '@/components/AddToCartPopup';
import SearchBar from '@/components/SearchBar';
import { useCart } from '@/contexts/useCart';
import type { LocalMenuItem, CartItem } from '../types';
import type { SearchForm } from '@/components/SearchBar';

const MenuPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<LocalMenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleAddToCartClick = (product: LocalMenuItem): void => {
    const cartItem: CartItem = {
      _id: product.id.toString(), 
      name: product.name,
      price: parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0, 
      quantity: 1,
      image: product.image 
    };
    
    addToCart(cartItem);
  };

  const handleClosePopup = (): void => {
    setIsPopupOpen(false);
    setSelectedProduct(null);
  };

  const handleSearch = (data: SearchForm): void => {
    setSearchQuery(data.searchQuery);
  };

  const handleNavigateToCart = (): void => {
    navigate('/cart');
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white shadow-sm border-b p-4">
        <SearchBar onSubmit={handleSearch} placeHolder="Search menu..." />
      </div>

      <div className="flex-1 flex overflow-hidden">
        <MenuSideBar 
          onAddToCart={handleAddToCartClick}
          searchQuery={searchQuery}
          onNavigateToCart={handleNavigateToCart}
        />
      </div>

      <AddToCartPopup 
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        product={selectedProduct ? {
          id: selectedProduct.id,
          name: selectedProduct.name,
          description: selectedProduct.description,
          price: parseFloat(selectedProduct.price.replace(/[^0-9.]/g, '')) || 0,
          image: selectedProduct.image
        } : undefined}
        onAddToCart={(item: CartItem) => {
          addToCart(item);
          handleClosePopup();
        }}
      />
    </div>
  );
};

export default MenuPage;
