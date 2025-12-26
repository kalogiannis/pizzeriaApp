

// export type User = {
//   _id: string;
//   email: string;
//   name: string;
//   addressLine1: string;
//   city: string;
//   country: string;
// };

// export type MenuItem = {
//   _id: string;
//   name: string;
//   price: number;
// };

// export interface LocalMenuItem {
//   id: number;
//   name: string;
//   description: string;
//   price: string;
//   image: string;
//   badge?: string;
// }

// export interface ProductForPopup {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category?: string;
//   available?: boolean;
// }

// export type Restaurant = {
//   _id: string;
//   user: string;
//   restaurantName: string;
//   city: string;
//   country: string;
//   deliveryPrice: number;
//   estimatedDeliveryTime: number;
//   cuisines: string[];
//   menuItems: MenuItem[];
//   imageUrl: string;
//   lastUpdated: string;
// };

// export type OrderStatus =
//   | "placed"
//   | "paid"
//   | "inProgress"
//   | "outForDelivery"
//   | "delivered";

// export type Order = {
//   _id: string;
//   restaurant: Restaurant;
//   user: User;
//   cartItems: {
//     menuItemId: string;
//     name: string;
//     quantity: string;
//   }[];
//   deliveryDetails: {
//     name: string;
//     addressLine1: string;
//     city: string;
//     email: string;
//   };
//   totalAmount: number;
//   status: OrderStatus;
//   createdAt: string;
//   restaurantId: string;
// };

// export type RestaurantSearchResponse = {
//   data: Restaurant[];
//   pagination: {
//     total: number;
//     page: number;
//     pages: number;
//   };
// };

// export type CartItem = {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image?: string;
//   size?: string;
//   extras?: string[];
//   totalPrice?: number;
// };

// export interface Size {
//   id: string;
//   name: string;
//   price: number;
// }

// export interface Extra {
//   id: string;
//   name: string;
//   price: number;
//   category?: string;
// }

// export interface AddToCartPopupProps {
//   isOpen: boolean;
//   onClose: () => void;
//   product?: ProductForPopup;
//   onAddToCart?: (item: CartItem) => void;
//   sizes?: Size[];
//   extras?: Extra[];
// }

// export interface MenuSideBarProps {
//   onAddToCart?: (product: ProductForPopup) => void;
//   className?: string;
//   products?: ProductForPopup[];
//   loading?: boolean;
// }

// export interface MenuPageProps {
//   initialProducts?: ProductForPopup[];
//   onCartUpdate?: (items: CartItem[]) => void;
// }

// export type CartAction = 
//   | { type: 'ADD_ITEM'; payload: CartItem }
//   | { type: 'REMOVE_ITEM'; payload: string }
//   | { type: 'UPDATE_QUANTITY'; payload: { _id: string; quantity: number } }
//   | { type: 'CLEAR_CART' };

// export interface CartState {
//   items: CartItem[];
//   total: number;
//   itemCount: number;
// }



export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

// Define a generic Option type for choices like sizes, extras, sauces, etc.
export interface Option {
  id: string;
  name: string;
  price: number;
}

// Define a structure for different groups of options
export interface OptionGroup {
  id: string;
  name: string;
  type: 'radio' | 'checkbox'; // How the options are selected (e.g., single choice or multiple)
  options: Option[];
  min?: number; // Minimum selections required
  max?: number; // Maximum selections allowed
}

export interface LocalMenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
  category?: string; // Add category to LocalMenuItem to determine options
}

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

// Updated CartItem to store selected options generically
export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  selectedOptions?: { groupId: string; optionId: string; name: string; price: number }[];
  totalPrice?: number;
};

// Keep Size and Extra for now, but they might be replaced by the generic Option type
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
  product?: LocalMenuItem; // Change product type to LocalMenuItem
  onAddToCart?: (item: CartItem) => void;
}

export interface MenuSideBarProps {
  onAddToCart?: (product: LocalMenuItem) => void;
  className?: string;
  products?: ProductForPopup[];
  loading?: boolean;
}

export interface MenuPageProps {
  initialProducts?: ProductForPopup[];
  onCartUpdate?: (items: CartItem[]) => void;
}

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
