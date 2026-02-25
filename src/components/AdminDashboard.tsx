'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Inria_Serif } from 'next/font/google';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

const inriaSerif = Inria_Serif({ 
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

type TabType = 'products' | 'add-product' | 'categories' | 'analytics';

const AdminDashboard = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<TabType>('products');
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const tabs = [
    { id: 'products', label: 'All Products', icon: '📦' },
    { id: 'add-product', label: 'Add Product', icon: '➕' },
    { id: 'categories', label: 'Categories', icon: '🏷️' },
    { id: 'analytics', label: 'Analytics', icon: '📊' }
  ];

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setIsEditing(true);
    setActiveTab('add-product');
  };

  const handleProductSaved = () => {
    setIsEditing(false);
    setEditingProduct(null);
    setActiveTab('products');
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <div className={`min-h-screen bg-gray-50 pt-20 ${inriaSerif.className}`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your e-commerce store</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {session?.user?.name || session?.user?.email}
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-[#6A2C70] text-[#6A2C70]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'products' && (
          <ProductList onEditProduct={handleEditProduct} />
        )}
        
        {activeTab === 'add-product' && (
          <ProductForm 
            product={editingProduct}
            isEditing={isEditing}
            onSaved={handleProductSaved}
          />
        )}
        
        {activeTab === 'categories' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Categories Management</h2>
            <p className="text-gray-600">Category management coming soon...</p>
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h2>
            <p className="text-gray-600">Analytics dashboard coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
