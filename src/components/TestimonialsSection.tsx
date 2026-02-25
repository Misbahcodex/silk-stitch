'use client';

import { useState } from 'react';
import { Inria_Serif } from 'next/font/google';

const inriaSerif = Inria_Serif({ 
  weight: ['400', '700'],
  subsets: ['latin'],
});

const TestimonialsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(9 / testimonialsPerPage);
  
  const testimonials = [
    {
      id: 1,
      name: "Ayesha Malik",
      text: "Absolutely In Love With The Fabric And Fit! The Outfit Felt Elegant And Comfortable — Exactly What I Was Looking For."
    },
    {
      id: 2,
      name: "Mehak Raza",
      text: "Silk Stitch Brings A Dreamy Touch To Everyday Wear. The Detailing And Stitching Are Perfection. Highly Recommended!"
    },
    {
      id: 3,
      name: "Hina Yousaf",
      text: "I Got So Many Compliments Wearing Their Dress To A Party! Stylish, Graceful, And Just My Kind Of Look."
    },
    {
      id: 4,
      name: "Fatima Khan",
      text: "The Quality Of Their Silk Collection Is Unmatched. Every Piece Feels Luxurious And Looks Stunning. My Go-To Brand!"
    },
    {
      id: 5,
      name: "Sana Ahmed",
      text: "Perfect Fit Every Time! Their Attention To Detail And Customer Service Makes Shopping Here A Delightful Experience."
    },
    {
      id: 6,
      name: "Zara Hassan",
      text: "I Love How Versatile Their Pieces Are. From Casual Day Wear To Elegant Evening Outfits, They Have Everything!"
    },
    {
      id: 7,
      name: "Nadia Ali",
      text: "The Colors And Patterns Are So Beautiful. Each Outfit Makes Me Feel Confident And Beautiful. Highly Recommend!"
    },
    {
      id: 8,
      name: "Aisha Rehman",
      text: "Silk Stitch Has Transformed My Wardrobe. The Quality And Style Are Exactly What I've Been Looking For. Love It!"
    },
    {
      id: 9,
      name: "Mariam Khan",
      text: "Exceptional Craftsmanship And Beautiful Designs. Their Collection Speaks To My Personal Style Perfectly. Amazing Brand!"
    }
  ];

  return (
    <section className="pb-24 bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title and Description */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold text-[#6A2C70] mb-6 ${inriaSerif.className}`}>
            Your Style, Your Stories
          </h2>
          <p className={`text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed ${inriaSerif.className}`}>
            Real Voices From Our Beautiful Customers Who Made Silk Stitch Part Of Their Journey. See How They Styled It, Lived It, And Loved It.
          </p>
        </div>

                 {/* Testimonial Cards */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
           {testimonials
             .slice(currentPage * testimonialsPerPage, (currentPage + 1) * testimonialsPerPage)
             .map((testimonial) => (
             <div key={testimonial.id} className="bg-[#A879A8] rounded-2xl p-8 shadow-lg relative">
               {/* Subtle background layer for depth */}
               <div className="absolute inset-0 bg-[#C8A2C8] rounded-2xl transform translate-y-1 opacity-30"></div>
               
               {/* Content */}
               <div className="relative z-10">
                 <h3 className={`text-xl font-bold text-[#6A2C70] mb-4 ${inriaSerif.className}`}>
                   {testimonial.name}
                 </h3>
                 <p className={`text-gray-800 leading-relaxed ${inriaSerif.className}`}>
                   "{testimonial.text}"
                 </p>
               </div>
             </div>
           ))}
         </div>

                 {/* Navigation Buttons */}
         <div className="flex justify-center space-x-4">
           <button 
             onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
             disabled={currentPage === 0}
             className={`bg-white hover:bg-gray-50 text-[#6A2C70] border-2 border-[#6A2C70] px-8 py-3 rounded-lg font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${inriaSerif.className}`}
           >
             Previous
           </button>
           <button 
             onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
             disabled={currentPage === totalPages - 1}
             className={`bg-white hover:bg-gray-50 text-[#6A2C70] border-2 border-[#6A2C70] px-8 py-3 rounded-lg font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${inriaSerif.className}`}
           >
             Next
           </button>
         </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
