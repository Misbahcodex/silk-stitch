'use client';

import { useState, useEffect } from 'react';
import { Inria_Serif } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../../components/Footer';

const inriaSerif = Inria_Serif({ 
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand?: string;
  isNew: boolean;
  isSale: boolean;
  images: string[];
  rating: number;
  reviewsCount: number;
}

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const response = await fetch('/api/products?limit=20');
        const data = await response.json();
        
        // Filter for new products
        const newProducts = data.products?.filter((product: Product) => product.isNew) || [];
        setProducts(newProducts);
      } catch (error) {
        console.error('Error fetching new products:', error);
        setError('Failed to load new arrivals');
      } finally {
        setLoading(false);
      }
    };

    fetchNewProducts();
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen bg-gray-50 pt-20 ${inriaSerif.className}`}>
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6A2C70] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading new arrivals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 pt-20 ${inriaSerif.className}`}>
      {/* Hero Section */}
      <div className="text-[#6A2C70] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            New Arrivals
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Discover the latest additions to our collection. Fresh styles, trending pieces, and must-have fashion finds just for you.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {products.length === 0 && !loading && !error ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No New Arrivals Yet</h3>
            <p className="text-gray-600 mb-6">Check back soon for the latest fashion pieces!</p>
            <Link
              href="/shop"
              className="inline-block bg-[#6A2C70] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#8B5A8B] transition-colors duration-200"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Fresh Fashion Finds ({products.length} items)
              </h2>
              <p className="text-gray-600">Stay ahead of the trends with our newest pieces</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link key={product.id} href={`/shop/${product.id}`} className="block">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                    {/* Product Image */}
                    <div className="relative">
                      <Image
                        src={product.images[0] || '/images/placeholder.jpg'}
                        alt={product.name}
                        width={400}
                        height={500}
                        className="w-full h-80 object-cover"
                      />
                      
                      {/* New Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#E91E63] text-white text-xs font-bold px-2 py-1 rounded-full">
                          NEW
                        </span>
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute top-3 right-3">
                        <button 
                          className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all duration-200"
                          onClick={(e) => e.preventDefault()}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-1">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">({product.reviewsCount || 0})</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          {product.originalPrice ? (
                            <>
                              <span className="text-lg font-bold text-[#6A2C70]">
                                ${product.price}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                ${product.originalPrice}
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-[#6A2C70]">
                              ${product.price}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <button 
                        className="w-full bg-[#6A2C70] hover:bg-[#8B5A8B] text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                        onClick={(e) => e.preventDefault()}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}