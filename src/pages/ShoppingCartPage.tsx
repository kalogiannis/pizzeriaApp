


import React from "react";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartItem } from "../types";

interface ShoppingCartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, size: string, extras: string[], newQuantity: number) => void;
  onRemoveItem: (productId: number, size: string, extras: string[]) => void;
  onClearCart: () => void;
}

const ShoppingCartPage: React.FC<ShoppingCartPageProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const getTotalCartValue = (): number => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const getTotalCartItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleQuantityChange = (item: CartItem, change: number): void => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      onUpdateQuantity(item.productId, item.size, item.extras, newQuantity);
    } else {
      onRemoveItem(item.productId, item.size, item.extras);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex items-center space-x-3">
              <ShoppingCart size={32} className="text-green-600" />
              <h1 className="text-3xl font-bold text-gray-800">Καλάθι Αγορών</h1>
            </div>

            {cartItems.length > 0 && (
              <div className="mt-4 sm:mt-0 self-start sm:self-auto">
                <Button
                  onClick={onClearCart}
                  variant="outline"
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Καθαρισμός Καλαθιού
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Cart Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                Το καλάθι σας είναι άδειο
              </h2>
              <p className="text-gray-500 mb-6">
                Προσθέστε προϊόντα από το μενού για να ξεκινήσετε την παραγγελία σας
              </p>
              <Button onClick={() => window.history.back()} className="bg-green-600 hover:bg-green-700">
                Επιστροφή στο Μενού
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems.map((item, index) => {
                  const unitPrice = item.quantity ? item.totalPrice / item.quantity : item.totalPrice;
                  return (
                    <div
                      key={`${item.productId}-${item.size}-${item.extras.join("-")}-${index}`}
                      // vertical layout on mobile (centered), row on larger screens
                      className="flex flex-col sm:flex-row items-center sm:items-start justify-between border-b pb-4 last:border-b-0 w-full"
                    >
                      {/* Image: centered on mobile, fixed on sm+ */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-40 sm:w-20 sm:h-20 object-cover rounded-lg mx-auto"
                      />

                      {/* Details: centered on mobile, left aligned on larger screens */}
                      <div className="mt-2 sm:mt-0 sm:ml-4 flex-1 w-full flex flex-col items-center sm:items-start text-center sm:text-left">
                        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <h3 className="text-lg font-semibold text-gray-800 break-words">
                            {item.name}{" "}
                            <span className="text-sm font-normal text-gray-600">€{unitPrice.toFixed(2)}</span>
                          </h3>
                          <p className="text-lg font-bold text-green-600 mt-1 sm:mt-0">
                            €{item.totalPrice.toFixed(2)}
                          </p>
                        </div>

                        <p className="text-sm text-gray-600 mt-1">Μέγεθος: {item.size}</p>

                        {item.extras.length > 0 && (
                          <p className="text-sm text-gray-600">Επιπλέον: {item.extras.join(", ")}</p>
                        )}
                      </div>

                      {/* Controls: full width + centered on mobile; right-aligned on larger screens */}
                      <div className="mt-2 sm:mt-0 sm:ml-4 w-full sm:w-auto flex items-center justify-center sm:justify-end space-x-3">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item, -1)}
                            className="h-8 w-8"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-medium text-lg min-w-[2rem] text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item, 1)}
                            className="h-8 w-8"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onRemoveItem(item.productId, item.size, item.extras)}
                          className="h-8 w-8 text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="border-t pt-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg text-gray-600">Συνολικά Προϊόντα:</span>
                    <span className="text-lg font-semibold">{getTotalCartItems()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-gray-800">Σύνολο Πληρωμής:</span>
                    <span className="text-xl font-bold text-green-600">
                      €{getTotalCartValue().toFixed(2)}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Button onClick={() => window.history.back()} variant="outline" className="flex-1">
                      Συνέχεια Αγορών
                    </Button>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700" size="lg">
                      Προχώρηση στην Πληρωμή
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
