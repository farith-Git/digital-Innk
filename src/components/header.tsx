import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header: React.FC = () => {
  // const totalCart = useSelector((state: any) => state.cart.length);
  const totalItems = useSelector((state: any) =>
    state.cart.reduce((sum: number, item: any) => sum + item.quantity, 0)
  );
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="w-full px-10 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-xl font-bold">MyStore</h1>

        {/* Menu */}
        <nav className="flex gap-6">
          <Link to="/" className="hover:text-gray-200">Products</Link>
          <Link to="/cart" className="hover:text-gray-200">Cart</Link>
          <a href="#" className="relative inline-block hover:text-gray-200">
            <FaShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {totalItems || 0}
            </span>
          </a>
        </nav>

      </div>
    </header>
  );
};

export default Header;