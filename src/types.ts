

export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

// New MenuItem type from the provided repository
export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

// Existing Product type, renamed to avoid conflict with new MenuItem
export interface ProductForPopup {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  available?: boolean;
}

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

export type Order = {
  _id: string;
  restaurant: Restaurant;
  user: User;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    name: string;
    addressLine1: string;
    city: string;
    email: string;
  };
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  restaurantId: string;
};

export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

// New CartItem type from the provided repository
export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

// Existing types, adjusted or kept as is
export interface Size {
  id: string;
  name: string;
  price: number;
}

export interface Extra {
  id: string;
  name: string;
  price: number;
  category?: string;
}

export interface AddToCartPopupProps {
  isOpen: boolean;
  onClose: () => void;
  product?: ProductForPopup;
  onAddToCart?: (item: CartItem) => void;
  sizes?: Size[];
  extras?: Extra[];
}

export interface MenuSideBarProps {
  onAddToCart?: (product: ProductForPopup) => void;
  className?: string;
  products?: ProductForPopup[];
  loading?: boolean;
}

export interface MenuPageProps {
  initialProducts?: ProductForPopup[];
  onCartUpdate?: (items: CartItem[]) => void;
}

// Utility types for the new cart logic
export type CartAction = 
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { _id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}


