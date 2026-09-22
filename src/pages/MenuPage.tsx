import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuSideBar from '@/components/MenuSideBar';
import AddToCartPopup from '@/components/AddToCartPopup';
import SearchBar from '@/components/SearchBar';
import { useCart } from '@/contexts/useCart';
import type { LocalMenuItem, CartItem } from '../types';
import type { SearchForm } from '@/components/SearchBar';

const MenuPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<LocalMenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  // Resets search state in parent
  const handleResetSearch = (): void => {
    setSearchQuery('');
  };

  const handleNavigateToCart = (): void => {
    navigate('/cart');
  };

  const handleAddToCartFromPopup = (item: CartItem): void => {
    addToCart(item);
    handleClosePopup();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors">
      <div className="bg-card border-b border-border p-4 shadow-sm">
        <SearchBar 
          onSubmit={handleSearch} 
          onReset={handleResetSearch}
          searchQuery={searchQuery}
          placeHolder="Search menu..." 
        />
      </div>

      <div className="flex-1 flex flex-col w-full">
        <MenuSideBar 
          onAddToCart={handleAddToCartClick}
          searchQuery={searchQuery}
          onResetSearch={handleResetSearch}
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