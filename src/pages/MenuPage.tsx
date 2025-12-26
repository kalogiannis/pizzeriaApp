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

  // Updated to open popup instead of directly adding to cart
  const handleAddToCartClick = (product: LocalMenuItem): void => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
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

  const handleAddToCartFromPopup = (item: CartItem): void => {
    addToCart(item);
    handleClosePopup();
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
        product={selectedProduct}
        onAddToCart={handleAddToCartFromPopup}
      />
    </div>
  );
};

export default MenuPage;
