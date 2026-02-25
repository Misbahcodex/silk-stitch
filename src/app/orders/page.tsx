'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Inria_Serif } from 'next/font/google';
import Link from 'next/link';
import Footer from '../../components/Footer';

const inriaSerif = Inria_Serif({ 
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className={`min-h-screen bg-gray-50 pt-20 ${inriaSerif.className}`}>
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6A2C70] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className={`min-h-screen bg-gray-50 pt-20 ${inriaSerif.className}`}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
            <p className="text-gray-600">View and track your order history</p>
          </div>
          <Link
            href="/profile"
            className="text-[#6A2C70] hover:text-[#8B5A8B] font-medium transition-colors duration-200"
          >
            ← Back to Profile
          </Link>
        </div>
      </div>

      {/* Orders Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Empty State */}
          <div className="text-center py-20">
            <div className="text-gray-300 mb-6">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Orders Yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Start shopping to see your order history here!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="inline-block bg-[#6A2C70] hover:bg-[#8B5A8B] text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Start Shopping
              </Link>
              <Link
                href="/collections"
                className="inline-block border border-[#6A2C70] text-[#6A2C70] hover:bg-[#6A2C70] hover:text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Browse Collections
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}