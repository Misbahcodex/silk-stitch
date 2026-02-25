'use client';

import { Inria_Serif } from 'next/font/google';

const inriaSerif = Inria_Serif({ 
  weight: ['400', '700'],
  subsets: ['latin'],
});

const Footer = () => {
  return (
    <footer className="bg-[#4A1942] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Name */}
          <div className="md:col-span-1">
            <h3 className={`text-3xl lg:text-4xl font-bold text-pink-100 ${inriaSerif.className}`}>
              Silk Stitch
            </h3>
          </div>

          {/* Shop Links */}
          <div className="md:col-span-1">
            <h4 className={`text-lg font-semibold text-pink-100 mb-4 ${inriaSerif.className}`}>
              Shop
            </h4>
            <ul className="space-y-2">
              <li><a href="/products" className={`text-pink-100 hover:text-white transition-colors ${inriaSerif.className}`}>Products</a></li>
              <li><a href="/overview" className={`text-pink-100 hover:text-white transition-colors ${inriaSerif.className}`}>Overview</a></li>
              <li><a href="/pricing" className={`text-pink-100 hover:text-white transition-colors ${inriaSerif.className}`}>Pricing</a></li>
              <li><a href="/releases" className={`text-pink-100 hover:text-white transition-colors ${inriaSerif.className}`}>Releases</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="md:col-span-1">
            <h4 className={`text-lg font-semibold text-pink-100 mb-4 ${inriaSerif.className}`}>
              Company
            </h4>
            <ul className="space-y-2">
              <li><a href="/about" className={`text-pink-100 hover:text-white transition-colors ${inriaSerif.className}`}>About Us</a></li>
              <li><a href="/contact" className={`text-pink-100 hover:text-white transition-colors ${inriaSerif.className}`}>Contact</a></li>
              <li><a href="/news" className={`text-pink-100 hover:text-white transition-colors ${inriaSerif.className}`}>News</a></li>
              <li><a href="/support" className={`text-pink-100 hover:text-white transition-colors ${inriaSerif.className}`}>Support</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
