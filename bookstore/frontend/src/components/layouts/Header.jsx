import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser, FiSearch, FiMenu, FiX } from "react-icons/fi";
import { PiCaretDownBold, PiCaretUpBold } from 'react-icons/pi'
import { useState } from "react";

import { useCart } from "../../hooks/useCart";
import useAuth from "../../auth/useAuth";
import SearchBar from "../common/SearchBar";

const Header = ({ showAuthButtons = true }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, logOut} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800">
            JoshyBooks
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-blue-600">
              Shop
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600">
              Contact
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-blue-600"
            >
              <FiShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {showAuthButtons ? (
              !user ? (
                <>
                  <Link
                    to="/login"
                    className="hidden md:block px-4 py-2 text-gray-600 hover:text-blue-600"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="hidden md:block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="relative hidden md:block">
                  <button
                    className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <FiUser className="h-6 w-6" />
                    <span>{user.username}</span>
                    {isProfileOpen ? <PiCaretUpBold/> : <PiCaretDownBold />}
                  </button>
                  {isProfileOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                      onMouseLeave={() => setIsProfileOpen(false)}
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )
            ) : null}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/products"
                className="px-3 py-2 text-gray-600 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="px-3 py-2 text-gray-600 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="px-3 py-2 text-gray-600 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              {showAuthButtons && !user && (
                <>
                  <Link
                    to="/login"
                    className="px-3 py-2 text-gray-600 hover:text-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-2 text-center bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
              {user && (
                <>
                  <Link
                    to="/profile"
                    className="px-3 py-2 text-gray-600 hover:text-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
