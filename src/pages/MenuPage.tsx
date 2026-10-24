import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
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
  const [popupQuantity, setPopupQuantity] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleAddToCartClick = (product: LocalMenuItem): void => {
    setPopupQuantity(1);
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  const handlePopupQuantityChange = (nextQuantity: number): void => {
    setPopupQuantity(Math.max(1, nextQuantity));
  };

  const handleClosePopup = (): void => {
    setIsPopupOpen(false);
    setSelectedProduct(null);
  };

  const handleSearch = (data: SearchForm): void => {
    setSearchQuery(data.searchQuery);
  };

  const handleResetSearch = (): void => {
    setSearchQuery('');
  };

  const handleNavigateToCart = (): void => {
    navigate('/cart');
  };

  const handleAddToCartFromPopup = (item: CartItem): void => {
    addToCart(item);
    handleClosePopup();
    toast.success(`${item.name} προστέθηκε στο καλάθι.`);
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
        key={selectedProduct?.id ?? "no-product"}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        product={selectedProduct}
        onAddToCart={handleAddToCartFromPopup}
        quantity={popupQuantity}
        onQuantityChange={handlePopupQuantityChange}
      />
    </div>
  );
};

export default MenuPage;
