'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Inria_Serif } from 'next/font/google';

const inriaSerif = Inria_Serif({ 
  weight: ['400', '700'],
  subsets: ['latin'],
});

const CollectionSection = () => {
  return (
         <section className=" bg-white overflow-hidden">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         {/* Image Section - Full Width and Height */}
         <div className="w-full mb-16">
           <Image
             src="/images/collection-image.svg"
             alt="Fashion Model in Elegant Collection"
             width={1200}
             height={800}
             className="w-full h-auto max-w-full"
             priority
           />
         </div>

         {/* Text and Button Section - Below Image */}
         <div className="text-center space-y-8">
           <div className="space-y-6">
             <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#6A2C70] leading-tight tracking-tight ${inriaSerif.className}`}>
               Fall In Love With The Art Of Dressing
             </h2>
           </div>
           
           <div className="space-y-4">
             <p className={`text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium ${inriaSerif.className}`}>
               Every Piece Is A Canvas Of Elegance And Emotion. Dress Not Just To Impress, But To Express.
             </p>
           </div>
           
           <div className="pt-4">
             <Link 
               href="/shop"
               className={`inline-block bg-white hover:bg-gray-50 text-[#6A2C70] border-2 border-[#6A2C70] px-8 py-4 rounded-lg font-bold uppercase tracking-wider text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${inriaSerif.className}`}
             >
               Shop the Collection
             </Link>
           </div>
         </div>
       </div>
       <div className="w-full mb-16">
           <Image
             src="/images/group-4.svg"
             alt="Fashion Model in Elegant Collection"
             width={100}
             height={100}
             className="w-full h-auto max-w-full px-58"

             priority
           />
         </div>
     </section>
  );
};

export default CollectionSection;
