'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Inria_Serif } from 'next/font/google';

const inriaSerif = Inria_Serif({ 
  weight: ['400', '700'],
  subsets: ['latin'],
});

const HeroSection2 = () => {
  return (
         <section className="relative h-screen bg-white overflow-hidden">
       <div className="relative z-10 w-full mx-auto h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          {/* Left Side - Fashion Model Image */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative">
              <Image
                src="/images/hero-section-3.svg"
                alt="Fashion Model in Elegant Style"
                width={600}
                height={1000}
                className="w-full h-full max-w-sm pb-19 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
                priority
              />
            </div>
          </div>

          {/* Right Side - Text and Button */}
          <div className="text-center space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-6">
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#6A2C70] leading-tight tracking-tight ${inriaSerif.className}`}>
                Not Just Fashion, It's A Feeling
              </h1>
            </div>
            <div className="space-y-3  lg:space-y-4">
              <p className={`text-lg sm:text-xl ml-30 lg:text-2xl text-gray-700 max-w-lg lg:max-w-xl leading-relaxed font-medium ${inriaSerif.className}`}>
                Every Thread Whispers Elegance, Every Silhouette Speaks Confidence.Discover A Style That Moves With Your Soul.

              </p>
              
            </div>
            <div className="pt-4">
              <Link 
                href="/shop"
                className={`inline-block bg-white hover:bg-gray-50 text-[#E933C1] border-2 border-[#6A2C70] px-8 py-4 rounded-lg font-bold uppercase tracking-wider text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${inriaSerif.className}`}
              >
                Step Into Elegance
              </Link>
            </div>
          </div>
        </div>
      </div>

     
    </section>
  );
};

export default HeroSection2;
