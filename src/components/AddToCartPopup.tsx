


import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Product, Size, Extra, CartItem } from '../types';

interface AddToCartPopupProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  onAddToCart?: (item: CartItem) => void;
}

const AddToCartPopup: React.FC<AddToCartPopupProps> = ({
  isOpen,
  onClose,
  product = {
    id: 1,
    name: "Μαργαρίτα Pizza",
    description: "Τομάτα, μοτσαρέλα, βασιλικός",
    price: 12.50,
    image: "/api/placeholder/300/200"
  },
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>('medium');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const sizes: Size[] = [
    { id: 'small', name: 'Μικό', price: 0 },
    { id: 'medium', name: 'Μεσαίο', price: 2.50 },
    { id: 'large', name: 'Μεγάλο', price: 5.00 }
  ];

  const extras: Extra[] = [
    { id: 'cheese', name: 'Επιπλέον τυρί', price: 1.50 },
    { id: 'pepperoni', name: 'Πεπερόνι', price: 2.00 },
    { id: 'mushrooms', name: 'Μανιτάρια', price: 1.00 },
    { id: 'olives', name: 'Ελιές', price: 1.00 }
  ];

  const handleQuantityChange = (change: number): void => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleExtraToggle = (extraId: string): void => {
    setSelectedExtras(prev =>
      prev.includes(extraId)
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const calculateTotalPrice = (): number => {
    const basePrice = product.price;
    const sizePrice = sizes.find(size => size.id === selectedSize)?.price || 0;
    const extrasPrice = selectedExtras.reduce((total, extraId) => {
      const extra = extras.find(e => e.id === extraId);
      return total + (extra?.price || 0);
    }, 0);

    return (basePrice + sizePrice + extrasPrice) * quantity;
  };

  const handleAddToCart = (): void => {
    const cartItem: CartItem = {
      productId: product.id,
      name: product.name,
      size: selectedSize,
      extras: selectedExtras,
      quantity: quantity,
      totalPrice: calculateTotalPrice(),
      image: product.image
    };

    if (onAddToCart) {
      onAddToCart(cartItem);
    } else {
      console.log('Adding to cart:', cartItem);
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Προσθήκη στο καλάθι</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-muted-foreground text-sm">{product.description}</p>
                  <p className="text-primary font-semibold mt-1">€{product.price.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Label className="text-base font-medium">Μέγεθος</Label>
            <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
              {sizes.map(size => (
                <div key={size.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={size.id} id={size.id} />
                    <Label htmlFor={size.id}>{size.name}</Label>
                  </div>
                  {size.price > 0 && (
                    <span className="text-muted-foreground">+€{size.price.toFixed(2)}</span>
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Επιπλέον υλικά</Label>
            <div className="space-y-3">
              {extras.map(extra => (
                <div key={extra.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={extra.id}
                      checked={selectedExtras.includes(extra.id)}
                      onCheckedChange={() => handleExtraToggle(extra.id)}
                    />
                    <Label htmlFor={extra.id}>{extra.name}</Label>
                  </div>
                  <span className="text-muted-foreground">+€{extra.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Ποσότητα</Label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="h-8 w-8"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-medium text-lg min-w-[2rem] text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                className="h-8 w-8"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            className="w-full"
            size="lg"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Προσθήκη στο καλάθι - €{calculateTotalPrice().toFixed(2)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartPopup;