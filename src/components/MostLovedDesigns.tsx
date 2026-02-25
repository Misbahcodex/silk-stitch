'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Inria_Serif } from 'next/font/google';

const inriaSerif = Inria_Serif({ 
  weight: ['400', '700'],
  subsets: ['latin'],
});

const MostLovedDesigns = () => {
  const products = [
    { id: 1, name: "Name Of Product", price: "$90.00", rating: "5.0", image: "/images/div1.svg" },
    { id: 2, name: "Name Of Product", price: "$90.00", rating: "5.0", image: "/images/div2.svg" },
    { id: 3, name: "Name Of Product", price: "$90.00", rating: "5.0", image: "/images/div3.svg" },
    { id: 4, name: "Name Of Product", price: "$90.00", rating: "5.0", image: "/images/div4.svg" },
    { id: 5, name: "Name Of Product", price: "$90.00", rating: "5.0", image: "/images/div5.svg" },
    { id: 6, name: "Name Of Product", price: "$90.00", rating: "5.0", image: "/images/div6.svg" },
    { id: 7, name: "Name Of Product", price: "$90.00", rating: "5.0", image: "/images/div7.svg" },
    { id: 8, name: "Name Of Product", price: "$90.00", rating: "5.0", image: "/images/div8.svg" },
  ];

  return (
                   <section className=" bg-white pt-2  overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl lg:text-5xl font-bold text-[#6A2C70] ${inriaSerif.className}`}>
            Most-Loved Designs
          </h2>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-16">
          <nav className="flex space-x-8 lg:space-x-12">
            <a href="#" className={`text-lg font-medium text-gray-600 hover:text-[#6A2C70] transition-colors ${inriaSerif.className}`}>
              SALE
            </a>
            <a href="#" className={`text-lg font-medium text-gray-600 hover:text-[#6A2C70] transition-colors ${inriaSerif.className}`}>
              HOT
            </a>
            <a href="#" className={`text-lg font-medium text-[#6A2C70] border-b-2 border-[#6A2C70] pb-1 ${inriaSerif.className}`}>
              NEW ARRIVALS
            </a>
            <a href="#" className={`text-lg font-medium text-gray-600 hover:text-[#6A2C70] transition-colors ${inriaSerif.className}`}>
              ACCESSORIES
            </a>
          </nav>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <div key={product.id} className="text-center">
              {/* Product Image Container */}
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={300}
                  className="w-full h-auto rounded-xl"
                />
              
              {/* Product Info */}
              <div className="space-y-2 mt-4">
                <h3 className=" text-gray-900 text-center font-bold">{product.name}</h3>
                <div className="flex justify-center gap-6 items-center">
                  <span className="text-gray-900 font-medium">{product.price}</span>
                  <span className="text-orange-300 font-medium"><strong className='text-black'>{product.rating}</strong> ★</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-12">
          <Link 
            href="/shop"
            className={`inline-block bg-[#6A2C70] hover:bg-[#8B5A8B] text-white px-8 py-4 rounded-lg font-bold uppercase tracking-wider text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${inriaSerif.className}`}
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MostLovedDesigns;
