import React, { useState, useMemo } from 'react';
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
import type { LocalMenuItem, CartItem, OptionGroup } from '../types'; // Removed 'Option'

interface AddToCartPopupProps {
  isOpen: boolean;
  onClose: () => void;
  product?: LocalMenuItem | null; // Changed to accept null
  onAddToCart?: (item: CartItem) => void;
}

const AddToCartPopup: React.FC<AddToCartPopupProps> = ({
  isOpen,
  onClose,
  product,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOptions, setSelectedOptions] = useState<{ [groupId: string]: string[] }>({});

  // Generate options based on product category
  const optionGroups = useMemo((): OptionGroup[] => {
    if (!product) return [];

    const category = product.category;
    
    switch (category) {
      case 'Πίτσες':
        return [
          {
            id: 'size',
            name: 'Μέγεθος',
            type: 'radio',
            options: [
              { id: 'small', name: 'Μικό', price: 0 },
              { id: 'medium', name: 'Μεσαίο', price: 2.50 },
              { id: 'large', name: 'Μεγάλο', price: 5.00 }
            ],
            min: 1,
            max: 1
          },
          {
            id: 'cheese',
            name: 'Προσθέστε τυρί',
            type: 'checkbox',
            options: [
              { id: 'mozzarella', name: 'Μοτσαρέλα', price: 1.30 },
              { id: 'parmesan', name: 'Παρμεζάνα', price: 1.30 },
              { id: 'feta', name: 'Φέτα', price: 1.50 },
              { id: 'gorgonzola', name: 'Γκοργκοντζόλα', price: 1.50 }
            ]
          },
          {
            id: 'meat',
            name: 'Προσθέστε κρεατικά | αλλαντικά',
            type: 'checkbox',
            options: [
              { id: 'prosciutto', name: 'Prosciutto cotto', price: 1.00 },
              { id: 'prosciutto_parma', name: 'Prosciutto parma', price: 1.80 },
              { id: 'salami', name: 'Σαλάμι μπόκας', price: 1.00 },
              { id: 'spinach', name: 'Σαλάμι Σπινάτο', price: 1.00 }
            ]
          }
        ];

      case 'Σαλάτες':
        return [
          {
            id: 'bread',
            name: 'Επιπλέον',
            type: 'checkbox',
            options: [
              { id: 'bread', name: 'Ψωμάκι', price: 1.00 }
            ]
          }
        ];

      case 'Burgers':
        return [
          {
            id: 'sauces',
            name: 'Επιλέξτε σάλτσες',
            type: 'checkbox',
            options: [
              { id: 'ketchup', name: 'Κέτσαπ', price: 0.50 },
              { id: 'mayo', name: 'Μαγιονέζα', price: 0.50 },
              { id: 'bbq', name: 'BBQ Σάλτσα', price: 0.70 },
              { id: 'mustard', name: 'Μουστάρδα', price: 0.50 }
            ]
          }
        ];

      case 'Vegan':
        return [
          {
            id: 'vegan_extras',
            name: 'Vegan Επιπλέον',
            type: 'checkbox',
            options: [
              { id: 'avocado', name: 'Αβοκάντο', price: 2.00 },
              { id: 'vegan_cheese', name: 'Vegan Τυρί', price: 1.50 },
              { id: 'nutritional_yeast', name: 'Μαγιά Φαγητού', price: 1.00 },
              { id: 'tahini', name: 'Ταχίνι', price: 0.80 }
            ]
          }
        ];

      case 'Ζυμαρικά':
        return [
          {
            id: 'sauce',
            name: 'Επίλεξε Sauce',
            type: 'radio',
            options: [
              { id: 'pesto', name: 'Σάλτσα pesto', price: 0 },
              { id: 'cream', name: 'Κρέμα γάλακτος', price: 0 },
              { id: 'bolognese', name: 'Σάλτσα μπολονέζ', price: 0 },
              { id: 'carbonara', name: 'Κρέμα καρμπονάρα', price: 0 },
              { id: 'carbonara_no_egg', name: 'Κρέμα καρμπονάρα χωρίς αβγό', price: 0 },
              { id: 'napoli', name: 'Σάλτσα νάπολι', price: 0 }
            ],
            min: 1,
            max: 1
          },
          {
            id: 'extra_sauce',
            name: 'Επιπλέον Sauce',
            type: 'checkbox',
            options: [
              { id: 'extra_2x', name: '2x', price: 0.70 }
            ]
          },
          {
            id: 'meat_pasta',
            name: 'Επίλεξε Αλλαντικά',
            type: 'checkbox',
            options: [
              { id: 'bacon', name: 'Μπέικον', price: 1.50 },
              { id: 'ham', name: 'Ζαμπόν', price: 1.20 }
            ]
          },
          {
            id: 'vegetables',
            name: 'Επίλεξε Λαχανικά',
            type: 'checkbox',
            options: [
              { id: 'red_pepper', name: 'Κόκκινη Πιπεριά', price: 0.80 },
              { id: 'onion', name: 'Κρεμμύδι', price: 0.50 },
              { id: 'mushrooms', name: 'Μανιτάρια', price: 0.80 },
              { id: 'broccoli', name: 'Μπρόκολο', price: 1.00 },
              { id: 'green_pepper', name: 'Πιπεριά πράσινη', price: 0.80 },
              { id: 'zucchini', name: 'Φρέσκο κολοκολοκυθάκι', price: 0.90 },
              { id: 'green_olives', name: 'Ελιές πράσινες', price: 0.70 }
            ]
          }
        ];

      case 'Ποτά':
        return [
          {
            id: 'size',
            name: 'Μέγεθος',
            type: 'radio',
            options: [
              { id: '330ml', name: '330ml', price: 0 },
              { id: '500ml', name: '500ml', price: 0.50 },
              { id: '1500ml', name: '1.500ml', price: 2.00 }
            ],
            min: 1,
            max: 1
          }
        ];

      case 'Παγωτά':
      default:
        return []; // No options for ice cream, just quantity
    }
  }, [product]);

  // Initialize selected options with default values
  React.useEffect(() => {
    const initialSelections: { [groupId: string]: string[] } = {};
    
    optionGroups.forEach(group => {
      if (group.type === 'radio' && group.min && group.min > 0) {
        // For radio groups with minimum requirements, select the first option by default
        initialSelections[group.id] = [group.options[0].id];
      } else {
        initialSelections[group.id] = [];
      }
    });
    
    setSelectedOptions(initialSelections);
  }, [optionGroups]);

  const handleQuantityChange = (change: number): void => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleOptionChange = (groupId: string, optionId: string, isSelected: boolean): void => {
    const group = optionGroups.find(g => g.id === groupId);
    if (!group) return;

    setSelectedOptions(prev => {
      const currentSelections = prev[groupId] || [];
      
      if (group.type === 'radio') {
        // For radio groups, only one selection allowed
        return { ...prev, [groupId]: isSelected ? [optionId] : [] };
      } else {
        // For checkbox groups, multiple selections allowed
        if (isSelected) {
          return { ...prev, [groupId]: [...currentSelections, optionId] };
        } else {
          return { ...prev, [groupId]: currentSelections.filter(id => id !== optionId) };
        }
      }
    });
  };

  const calculateTotalPrice = (): number => {
    if (!product) return 0;
    
    const basePrice = parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0;
    
    let optionsPrice = 0;
    optionGroups.forEach(group => {
      const selections = selectedOptions[group.id] || [];
      selections.forEach(optionId => {
        const option = group.options.find(opt => opt.id === optionId);
        if (option) {
          optionsPrice += option.price;
        }
      });
    });

    return (basePrice + optionsPrice) * quantity;
  };

  const handleAddToCart = (): void => {
    if (!product) return;

    // Convert selected options to the format expected by CartItem
    const selectedOptionsForCart = optionGroups.flatMap(group => {
      const selections = selectedOptions[group.id] || [];
      return selections.map(optionId => {
        const option = group.options.find(opt => opt.id === optionId);
        return option ? {
          groupId: group.id,
          optionId: option.id,
          name: option.name,
          price: option.price
        } : null;
      }).filter(Boolean);
    }).filter(Boolean) as { groupId: string; optionId: string; name: string; price: number }[];

    const cartItem: CartItem = {
      _id: product.id.toString(),
      name: product.name,
      price: parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0,
      quantity: quantity,
      image: product.image,
      selectedOptions: selectedOptionsForCart,
      totalPrice: calculateTotalPrice(),
    };

    if (onAddToCart) {
      onAddToCart(cartItem);
    }

    onClose();
  };

  if (!product) return null;

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
                  <p className="text-primary font-semibold mt-1">{product.price}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Render option groups dynamically */}
          {optionGroups.map(group => (
            <div key={group.id} className="space-y-3">
              <Label className="text-base font-medium">{group.name}</Label>
              
              {group.type === 'radio' ? (
                <RadioGroup 
                  value={selectedOptions[group.id]?.[0] || ''} 
                  onValueChange={(value) => handleOptionChange(group.id, value, true)}
                >
                  {group.options.map(option => (
                    <div key={option.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={option.id} id={`${group.id}-${option.id}`} />
                        <Label htmlFor={`${group.id}-${option.id}`}>{option.name}</Label>
                      </div>
                      {option.price > 0 && (
                        <span className="text-muted-foreground">+€{option.price.toFixed(2)}</span>
                      )}
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-3">
                  {group.options.map(option => (
                    <div key={option.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${group.id}-${option.id}`}
                          checked={selectedOptions[group.id]?.includes(option.id) || false}
                          onCheckedChange={(checked) => handleOptionChange(group.id, option.id, !!checked)}
                        />
                        <Label htmlFor={`${group.id}-${option.id}`}>{option.name}</Label>
                      </div>
                      {option.price > 0 && (
                        <span className="text-muted-foreground">+€{option.price.toFixed(2)}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Quantity selector */}
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
