
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/useCart";

const Header = () => {
  const { cartItems } = useCart();

  const getTotalCartItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <header className="border-b-2 border-b-orange-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold tracking-tight text-orange-500"
        >
          MernEats.com
        </Link>
        <div className="flex items-center space-x-6">
          <Link
            to="/menu"
            className="text-xl font-bold tracking-tight text-orange-500"
          >
            Menu
          </Link>
          {/* Shopping Cart Icon */}
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} className="text-orange-500" />
            {getTotalCartItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                {getTotalCartItems()}
              </span>
            )}
          </Link>
          <div className="md:hidden">
            <MobileNav />
          </div>
          <div className="hidden md:block">
            <MainNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
