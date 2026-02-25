'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Inria_Serif } from 'next/font/google';

const inriaSerif = Inria_Serif({ 
  weight: ['400', '700'],
  subsets: ['latin'],
});

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        
        
      </div>

             <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          
                                {/* Left Side - Text and CTA */}
           <div className="text-center space-y-6 lg:space-y-8 ml-42 items-center">
             <div className="space-y-3 text-center lg:space-y-4">
                               <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#6A2C70] leading-tight tracking-tight ${inriaSerif.className}`}>
                  Where Silk Meets  Street Style
                </h1>
             </div>
             
        <p className={`text-base sm:text-lg  lg:text-xl text-gray-600  leading-relaxed font-medium ${inriaSerif.className}`}>
                Discover the perfect fusion of luxury silk craftsmanship and contemporary urban fashion. 
                Elevate your everyday style with our premium collection.
              </p>
            
                         <div className="pt-4 text-center">
                               <Link 
                  href="/shop"
                  className={`inline-block bg-[#6A2C70] hover:bg-[#8B5A8B] text-white border-2 border-[#C8A2C8] px-6 py-3 lg:px-8 lg:py-4 rounded-lg font-bold uppercase tracking-wider text-sm lg:text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${inriaSerif.className}`}
                >
                  Explore Now
                </Link>
             </div>
          </div>

                     {/* Right Side - Hero Image */}
           <div className="relative flex justify-center lg:justify-end">
             <div className="relative">
               {/* Dark purple rounded frame background */}
               
               {/* Hero image */}
                               <div className="relative z-10">
                  <Image
                    src="/images/hero-section-1.svg"
                    alt="Fashion Model in Silk Street Style"
                    width={500}
                    height={500}
                    className="w-full h-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
                    priority
                  />
                </div>
             </div>
           </div>
        </div>
      </div>

      
    </section>
  );
};

export default HeroSection;
