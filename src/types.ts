

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  available?: boolean;
}

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

export interface CartItem {
  productId: number;
  name: string;
  size: string;
  extras: string[];
  quantity: number;
  totalPrice: number;
  image: string;
  addedAt?: Date;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string; // Keeping as string as per original content
  badge?: string;
  image?: string; // Added image for consistency with popup
}


export interface AddToCartPopupProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  onAddToCart?: (item: CartItem) => void;
  sizes?: Size[];
  extras?: Extra[];
}

export interface MenuSideBarProps {
  onAddToCart?: (product: Product) => void;
  className?: string;
  products?: Product[];
  loading?: boolean;
}

export interface MenuPageProps {
  initialProducts?: Product[];
  onCartUpdate?: (items: CartItem[]) => void;
}

// Utility types
export type CartAction = 
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}
