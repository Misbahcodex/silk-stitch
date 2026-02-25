'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Inria_Serif } from 'next/font/google';

const inriaSerif = Inria_Serif({ 
  weight: ['400', '700'],
  subsets: ['latin'],
});

const TopPicksSection = () => {
  return (
    <section className="relative pt-8 bg-white overflow-hidden">
             {/* Section Title */}
       <div className="text-center ">
         <h2 className={`text-4xl lg:text-5xl xl:text-6xl font-bold text-[#6A2C70] leading-tight tracking-tight ${inriaSerif.className}`}>
           Top Picks Of The Week
         </h2>
         <p className={`text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mt-6 leading-relaxed ${inriaSerif.className}`}>
           Handpicked styles our shoppers are loving the most. Step into the week with fresh Korean-inspired fashion.
         </p>
       </div>

             {/* Product Grid */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex flex-row justify-center items-center gap-8 lg:gap-12">
           
                       {/* Product 1 - Left */}
            <div className="flex flex-col items-center">
              <div className="relative mb-20">
                <Image
                  src="/images/group-1.svg"
                  alt="Cream Blazer & Black Trousers Outfit"
                  width={500}
                  height={500}
                  className="w-full h-full"
                  priority
                />
                                                                 <div className="text-center text-black mt-4 text-2xl font-bold">Name Of  The Product</div>
 
                 <div className="flex justify-center items-center gap-4 mt-2">
                   <div className={`text-black text-xl font-semibold ${inriaSerif.className}`}>$120</div>
                   <div className="text-2xl">
                     <span className="text-black">5.0</span> <span className="text-yellow-400">★</span>
                   </div>
                 </div>
              </div>
              
              {/* Yellow Star */}
             
            </div>

                       {/* Product 2 - Middle */}
            <div className="flex flex-col items-center">
              <div className="relative mb-12">
                <Image
                  src="/images/group-2.svg"
                  alt="White Shirt & Blue Jeans Outfit"
                  width={500}
                  height={500}
                  className="w-full h-full"
                  priority
                />
                                 <div className="text-center text-black  text-2xl font-bold">Name Of  The Product</div>
 
                 <div className="flex justify-center items-center gap-4 mt-2">
                   <div className={`text-black text-xl font-semibold ${inriaSerif.className}`}>$120</div>
                   <div className="text-2xl">
                     <span className="text-black">5.0</span> <span className="text-yellow-400">★</span>
                   </div>
                 </div>

              </div>
              
            </div>

                       {/* Product 3 - Right */}
            <div className="flex flex-col items-center">
              <div className="relative mb-38">
                <Image
                  src="/images/group-3.svg"
                  alt="Cream Top & Green Skirt Outfit"
                  width={500}
                  height={500}
                  className="w-full h-full"
                  priority
                />
                                 <div className="text-center text-black mt-6 text-2xl font-bold">Name Of  The Product</div>
                 <div className="flex justify-center items-center gap-4 mt-2">
                   <div className={`text-black text-xl font-semibold ${inriaSerif.className}`}>$120</div>
                   <div className="text-2xl">
                     <span className="text-black">5.0</span> <span className="text-yellow-400">★</span>
                   </div>
                 </div>

              </div>
             
            </div>
         </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <Link 
            href="/shop"
            className={`inline-block bg-white hover:bg-gray-100 text-[#6A2C70] border-2 border-[#6A2C70] px-8 py-4 rounded-lg font-bold uppercase tracking-wider text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${inriaSerif.className}`}
          >
            Explore Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopPicksSection;
