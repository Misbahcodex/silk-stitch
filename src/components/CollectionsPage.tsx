'use client';

import { useState } from 'react';
import { Inria_Serif } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const inriaSerif = Inria_Serif({ 
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

const CollectionsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample collections data
  const collections: Collection[] = [
    {
      id: 'summer-essentials',
      name: 'Summer Essentials',
      description: 'Light, breathable pieces perfect for warm weather. From flowy dresses to lightweight tops.',
      image: 'https://picsum.photos/seed/summer1/600/400',
      itemCount: 45,
      category: 'seasonal',
      isNew: true
    },
    {
      id: 'korean-street-style',
      name: 'Korean Street Style',
      description: 'Trendy, oversized silhouettes and bold patterns inspired by Seoul fashion districts.',
      image: 'https://picsum.photos/seed/street1/600/400',
      itemCount: 78,
      category: 'style',
      isFeatured: true
    },
    {
      id: 'minimalist-elegance',
      name: 'Minimalist Elegance',
      description: 'Clean lines, neutral tones, and sophisticated cuts for the modern woman.',
      image: 'https://picsum.photos/seed/minimal1/600/400',
      itemCount: 32,
      category: 'style'
    },
    {
      id: 'evening-glamour',
      name: 'Evening Glamour',
      description: 'Stunning dresses and sophisticated pieces for special occasions and nights out.',
      image: 'https://picsum.photos/seed/evening1/600/400',
      itemCount: 28,
      category: 'occasion'
    },
    {
      id: 'casual-comfort',
      name: 'Casual Comfort',
      description: 'Effortlessly stylish everyday wear that combines comfort with contemporary fashion.',
      image: 'https://picsum.photos/seed/casual1/600/400',
      itemCount: 56,
      category: 'style'
    },
    {
      id: 'workplace-chic',
      name: 'Workplace Chic',
      description: 'Professional attire that maintains style and comfort throughout the workday.',
      image: 'https://picsum.photos/seed/work1/600/400',
      itemCount: 41,
      category: 'occasion'
    },
    {
      id: 'sustainable-fashion',
      name: 'Sustainable Fashion',
      description: 'Eco-friendly pieces made from sustainable materials without compromising on style.',
      image: 'https://picsum.photos/seed/sustain1/600/400',
      itemCount: 23,
      category: 'lifestyle',
      isNew: true
    },
    {
      id: 'accessories-collection',
      name: 'Accessories Collection',
      description: 'Complete your look with our curated selection of bags, jewelry, and statement pieces.',
      image: 'https://picsum.photos/seed/accessories1/600/400',
      itemCount: 67,
      category: 'accessories'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Collections' },
    { value: 'seasonal', label: 'Seasonal' },
    { value: 'style', label: 'Style' },
    { value: 'occasion', label: 'Occasion' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const filteredCollections = selectedCategory === 'all' 
    ? collections 
    : collections.filter(collection => collection.category === selectedCategory);

  return (
    <div className={`min-h-screen bg-gray-50 pt-20 ${inriaSerif.className}`}>
      {/* Hero Section */}
      <div className=" text-[#6A2C70] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our Collections
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Discover curated fashion collections that tell your unique style story. 
            From seasonal essentials to timeless classics, find your perfect look.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category.value
                  ? 'bg-[#6A2C70] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCollections.map((collection) => (
            <div key={collection.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Collection Image */}
              <div className="relative">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {collection.isNew && (
                    <span className="bg-[#E91E63] text-white text-xs font-bold px-3 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                  {collection.isFeatured && (
                    <span className="bg-[#6A2C70] text-white text-xs font-bold px-3 py-1 rounded-full">
                      FEATURED
                    </span>
                  )}
                </div>

                {/* Item Count */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                  {collection.itemCount} items
                </div>
              </div>

              {/* Collection Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {collection.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {collection.description}
                </p>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link
                    href={`/shop?collection=${collection.id}`}
                    className="flex-1 bg-[#6A2C70] hover:bg-[#8B5A8B] text-white py-3 px-4 rounded-lg font-medium text-center transition-colors duration-200"
                  >
                    Shop Collection
                  </Link>
                  <button className="px-4 py-3 border border-[#6A2C70] text-[#6A2C70] rounded-lg hover:bg-[#6A2C70] hover:text-white transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-gray-600 mb-6">
              Our personal stylists are here to help you discover the perfect pieces for your unique style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-[#6A2C70] hover:bg-[#8B5A8B] text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200"
              >
                Browse All Products
              </Link>
              <button className="border-2 border-[#6A2C70] text-[#6A2C70] py-3 px-6 rounded-lg font-medium hover:bg-[#6A2C70] hover:text-white transition-colors duration-200">
                Contact Stylist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;

