

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuSideBar from '@/components/MenuSideBar';
import AddToCartPopup from '@/components/AddToCartPopup';
import SearchBar from '@/components/SearchBar';
import { useCart } from '@/contexts/CartContext';
import type { MenuItem, Product as ProductForPopup } from '../types';
import type { SearchForm } from '@/components/SearchBar';

const MenuPage: React.FC = () => {
  const navigate = useNavigate();
  const { state: cartState, addItem } = useCart();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductForPopup | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleAddToCartClick = (menuItem: MenuItem): void => {
    // Convert MenuItem to ProductForPopup format for the AddToCartPopup
    const productForPopup: ProductForPopup = {
      id: menuItem.id,
      name: menuItem.name,
      description: menuItem.description,
      // Safely convert price string to number, handling potential non-numeric values
      price: parseFloat(menuItem.price.replace(/[^0-9.-]+/g, "")) || 0,
      image: menuItem.image || "/api/placeholder/300/200" // Provide a default image if none exists
    };
    setSelectedProduct(productForPopup);
    setIsPopupOpen(true);
  };

  const handleClosePopup = (): void => {
    setIsPopupOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (item: any): void => {
    addItem(item);
    console.log("Item added to cart:", item);
    console.log("Current cart:", cartState.items);
  };

  const handleSearch = (formData: SearchForm): void => {
    setSearchQuery(formData.searchQuery);
    console.log('Searching for:', formData.searchQuery);
    // Implement search logic here
  };

  const handleSearchReset = (): void => {
    setSearchQuery('');
    console.log('Search reset');
    // Implement search reset logic here
  };

  const navigateToCart = (): void => {
    navigate('/menu/shoppingCart');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="p-6 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <SearchBar
            onSubmit={handleSearch}
            onReset={handleSearchReset}
            placeHolder="Αναζήτηση προϊόντων..."
            searchQuery={searchQuery}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <MenuSideBar 
          onAddToCart={handleAddToCartClick}
          searchQuery={searchQuery}
          cartItems={cartState.items}
          onNavigateToCart={navigateToCart}
        />
      </div>

      {/* Add to Cart Popup */}
      <AddToCartPopup 
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        product={selectedProduct || undefined}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default MenuPage;

