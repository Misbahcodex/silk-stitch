'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Inria_Serif } from 'next/font/google';
import Footer from '../../components/Footer';

const inriaSerif = Inria_Serif({ 
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

export default function ProfilePage() {
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
          <p className="text-gray-600">Loading profile...</p>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your account information and preferences</p>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#6A2C70] to-[#8B5A8B] px-6 py-8">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mr-6">
                <span className="text-[#6A2C70] font-bold text-2xl">
                  {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-bold">{session.user?.name}</h2>
                <p className="text-purple-100">{session.user?.email}</p>
                <div className="mt-2">
                  <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                    session.user?.role === 'ADMIN' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {session.user?.role === 'ADMIN' ? 'Administrator' : 'Customer'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Account Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
                      {session.user?.name}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
                      {session.user?.email}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                    <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
                      {session.user?.role === 'ADMIN' ? 'Administrator' : 'Customer'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-[#6A2C70] hover:bg-[#8B5A8B] text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 text-left">
                    <div className="flex items-center justify-between">
                      <span>View Order History</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                  
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-3 rounded-lg font-medium transition-colors duration-200 text-left">
                    <div className="flex items-center justify-between">
                      <span>Update Profile Information</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                  
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-3 rounded-lg font-medium transition-colors duration-200 text-left">
                    <div className="flex items-center justify-between">
                      <span>Change Password</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>

                  {session.user?.role === 'ADMIN' && (
                    <a
                      href="/admin"
                      className="block w-full bg-purple-100 hover:bg-purple-200 text-purple-800 px-4 py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <span>Admin Dashboard</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="border-t border-gray-200 px-6 py-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-2">📋</div>
              <p className="text-gray-500">No recent activity to display</p>
              <p className="text-sm text-gray-400 mt-1">Your order history and account changes will appear here</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}