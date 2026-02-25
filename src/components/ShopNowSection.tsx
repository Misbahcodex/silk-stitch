import Link from 'next/link';
import { Inria_Serif } from 'next/font/google';

const inriaSerif = Inria_Serif({ 
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

const ShopNowSection = () => {
  return (
    <section className={`py-16 bg-gradient-to-r from-[#F3E5F5] to-[#E1BEE7] ${inriaSerif.className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-[#6A2C70] mb-6">
          Ready to Shop Korean Style?
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Explore our complete collection of Korean fashion pieces. From trendy streetwear to elegant 
          minimalist designs, find your perfect style match.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/shop"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#6A2C70] hover:bg-[#8B5A8B] text-white font-bold text-lg rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
          >
            Shop Now
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link 
            href="/collections"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#6A2C70] text-[#6A2C70] hover:bg-[#6A2C70] hover:text-white font-bold text-lg rounded-lg transition-all duration-300"
          >
            View Collections
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShopNowSection;
