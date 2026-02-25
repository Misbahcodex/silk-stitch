'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import AuthModal from './AuthModal';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const { data: session, status } = useSession();
  const { state, toggleCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState<'login' | 'signup' | 'forgot'>('login');
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu) {
        const target = event.target as HTMLElement;
        if (!target.closest('.user-menu')) {
          setShowUserMenu(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20' 
          : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo.svg"
                  alt="Silk Stitch"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link 
                  href="/" 
                  className="text-[#6A2C70] hover:text-[#8B5A8B] px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors duration-200"
                >
                  Home
                </Link>
                <Link 
                  href="/shop" 
                  className="text-[#6A2C70] hover:text-[#8B5A8B] px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors duration-200"
                >
                  Shop
                </Link>
                <Link 
                  href="/collections" 
                  className="text-[#6A2C70] hover:text-[#8B5A8B] px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors duration-200"
                >
                  Collections
                </Link>
                <Link 
                  href="/new-arrivals" 
                  className="text-[#6A2C70] hover:text-[#8B5A8B] px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors duration-200"
                >
                  New Arrivals
                </Link>
                <Link 
                  href="/sale" 
                  className="text-[#6A2C70] hover:text-[#8B5A8B] px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors duration-200"
                >
                  Sale
                </Link>
                <Link 
                  href="/about" 
                  className="text-[#6A2C70] hover:text-[#8B5A8B] px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors duration-200"
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className="text-[#6A2C70] hover:text-[#8B5A8B] px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors duration-200"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Right side - Cart and Login */}
            <div className="flex items-center space-x-6">
              {/* Shopping Cart Icon */}
              <div className="relative">
                <button 
                  onClick={toggleCart}
                  className="text-[#6A2C70] hover:text-[#8B5A8B] transition-colors duration-200 relative"
                >
                  <Image
                    src="/images/shopping-bag.svg"
                    alt="Shopping Cart"
                    width={24}
                    height={24}
                    className="h-8 w-8"
                  />
                  {/* Cart item count badge */}
                  {state.itemCount > 0 && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#E933C1] text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                      {state.itemCount > 99 ? '99+' : state.itemCount}
                    </div>
                  )}
                </button>
              </div>

              {/* User Authentication */}
              {status === 'loading' ? (
                <div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full"></div>
              ) : session ? (
                <div className="relative user-menu">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-[#6A2C70] hover:text-[#8B5A8B] transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-[#C8A2C8] rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                        <p className="text-sm text-gray-500">{session.user?.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Orders
                      </Link>
                      {session.user?.role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            signOut();
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => {
                      setAuthModalType('login');
                      setIsAuthModalOpen(true);
                    }}
                    className="text-[#6A2C70] hover:text-[#8B5A8B] font-medium transition-colors duration-200"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => {
                      setAuthModalType('signup');
                      setIsAuthModalOpen(true);
                    }}
                    className="bg-[#C8A2C8] hover:bg-[#B894B8] text-[#6A2C70] border border-[#6A2C70] px-4 py-2 rounded-md font-medium transition-all duration-200 hover:shadow-lg"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-[#6A2C70] hover:text-[#8B5A8B] p-2"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black border-t border-[#6A2C70]">
                <Link 
                  href="/" 
                  className="text-[#6A2C70] hover:text-[#8B5A8B] block px-3 py-2 text-base font-medium uppercase tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/shop" 
                  className="text-[#6A2C70] hover:text-[#8B5A8B] block px-3 py-2 text-base font-medium uppercase tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link 
                  href="/collections" 
                  className="text-[#6A2C70] hover:text-[#8B5A8B] block px-3 py-2 text-base font-medium uppercase tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Collections
                </Link>
                <Link 
                  href="/new-arrivals" 
                  className="text-[#6A2C70] hover:text-[#8B5A8B] block px-3 py-2 text-base font-medium uppercase tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  New Arrivals
                </Link>
                <Link 
                  href="/sale" 
                  className="text-[#6A2C70] hover:text-[#8B5A8B] block px-3 py-2 text-base font-medium uppercase tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sale
                </Link>
                <Link 
                  href="/about" 
                  className="text-[#6A2C70] hover:text-[#8B5A8B] block px-3 py-2 text-base font-medium uppercase tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className="text-[#6A2C70] hover:text-[#8B5A8B] block px-3 py-2 text-base font-medium uppercase tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialType={authModalType}
      />
    </>
  );
};

export default Navbar;
