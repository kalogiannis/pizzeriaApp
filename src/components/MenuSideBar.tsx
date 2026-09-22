
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react'; 
import { menuData } from '../data/menuData';
import type { MenuCategory } from '../data/menuData';
import { pizzeriaList } from '../constants/pizzeriaList';
import type { LocalMenuItem } from '../types';
import { useCart } from '@/contexts/useCart';

interface MenuSideBarProps {
  onAddToCart: (product: LocalMenuItem) => void;
  searchQuery?: string;
  onResetSearch?: () => void;
  onNavigateToCart?: () => void;
}

const MenuSideBar = ({
  onAddToCart,
  searchQuery = '',
  onResetSearch,
  onNavigateToCart 
}: MenuSideBarProps) => {
  const [activeTab, setActiveTab] = useState<MenuCategory>("Προσφορές");
  const { cartItems } = useCart();

  const handleCategoryChange = (category: MenuCategory) => {
    setActiveTab(category);
    // Clear search filter when user changes tab
    if (onResetSearch) {
      onResetSearch();
    }
  };

  const getCurrentItems = (): LocalMenuItem[] => {
    const items = menuData[activeTab] || [];

    const itemsWithCategory = items.map(item => ({
      ...item,
      category: activeTab
    }));

    if (searchQuery.trim()) {
      return itemsWithCategory.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return itemsWithCategory;
  };

  const getCategoryIcon = (category: MenuCategory): string => {
    const icons: Record<MenuCategory, string> = {
      "Προσφορές": "🎯",
      "Πίτσες": "🍕",
      "Σαλάτες": "🥗",
      "Burgers": "🍔",
      "Παγωτά": "🍦",
      "Vegan": "🌱",
      "Ζυμαρικά": "🍝",
      "Ποτά": "🥤",
    };
    return icons[category] || "📋";
  };

  const getTotalCartItems = (): number => { 
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const currentItems = getCurrentItems();

  return (
    <div className="flex flex-col md:flex-row w-full bg-background min-h-screen transition-colors duration-200">
      
      {/* Mobile Category Navigation */}
      <div className="md:hidden w-full bg-card border-b border-border shadow-sm p-4 overflow-x-auto whitespace-nowrap">
        <div className="flex space-x-2">
          {pizzeriaList.map((category: MenuCategory, index: number) => (
            <button
              key={`${category}-${index}`}
              onClick={() => handleCategoryChange(category)}
              className={`flex-shrink-0 px-4 py-2 rounded-full transition-colors duration-200 ${
                activeTab === category
                  ? 'bg-green-600 text-white font-semibold'
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <span className="text-sm mr-1">{getCategoryIcon(category)}</span>
              <span className="font-medium text-sm">{category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-card border-r border-border shadow-sm">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-foreground">Menu</h2>
            <button
              onClick={onNavigateToCart}
              className="relative p-2 hover:bg-accent hover:text-accent-foreground rounded-full transition-colors"
            >
              <ShoppingCart size={24} className="text-foreground" />
              {getTotalCartItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                  {getTotalCartItems()}
                </span>
              )}
            </button>
          </div>
          <nav className="space-y-2">
            {pizzeriaList.map((category: MenuCategory, index: number) => (
              <button
                key={`${category}-${index}`}
                onClick={() => handleCategoryChange(category)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
                  activeTab === category
                    ? 'bg-green-500/15 text-green-700 dark:text-green-400 font-semibold border-l-4 border-green-600'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <span className="text-sm">{getCategoryIcon(category)}</span>
                <span className="font-medium">{category}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-foreground">{activeTab}</h1>
            {searchQuery && (
              <p className="text-sm text-muted-foreground">
                Αποτελέσματα για: "{searchQuery}" ({currentItems.length} προϊόντα)
              </p>
            )}
          </div>

          {currentItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {searchQuery
                  ? `Δεν βρέθηκαν προϊόντα για "${searchQuery}"`
                  : 'Δεν υπάρχουν προϊόντα σε αυτή την κατηγορία'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {currentItems.map((item: LocalMenuItem) => (
                <div key={item.id} className="bg-card border border-border rounded-lg shadow-sm p-6 flex items-center space-x-4 transition-colors">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-foreground mb-2 truncate">
                          {item.name}
                          {item.badge && (
                            <span className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-foreground">
                        {item.price}
                      </span>
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm"
                        onClick={() => onAddToCart(item)}
                      >
                        Επίλεξε
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuSideBar;