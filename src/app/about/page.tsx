import { Inria_Serif } from 'next/font/google';
import Image from 'next/image';
import Footer from '../../components/Footer';

const inriaSerif = Inria_Serif({ 
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

export default function About() {
  return (
    <div className={`min-h-screen bg-white pt-20 ${inriaSerif.className}`}>
      {/* Hero Section */}
      <div className="text-[#6A2C70] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About Silk Stitch
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Where timeless elegance meets contemporary Korean fashion. 
            We believe every woman deserves to feel confident and beautiful.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Founded in 2020, Silk Stitch was born from a passion for Korean fashion and a desire to bring 
                the elegance of Seoul's fashion districts to women worldwide. Our founder, inspired by the 
                harmonious blend of traditional craftsmanship and modern design in Korean culture, set out 
                to create a brand that celebrates both heritage and innovation.
              </p>
              <p>
                We carefully curate each piece in our collection, working directly with Korean designers and 
                artisans who share our commitment to quality, sustainability, and timeless style. From the 
                bustling streets of Gangnam to the artistic neighborhoods of Hongdae, we draw inspiration 
                from Korea's vibrant fashion scene.
              </p>
              <p>
                Every garment tells a story of meticulous craftsmanship, attention to detail, and the 
                pursuit of perfection that defines Korean fashion. We believe that true style transcends 
                trends, and our pieces are designed to be cherished for years to come.
              </p>
            </div>
          </div>
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=700&fit=crop"
              alt="Our Story"
              width={600}
              height={700}
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#E91E63] rounded-full opacity-20"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#6A2C70] rounded-full opacity-20"></div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quality */}
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-[#6A2C70] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Craftsmanship</h3>
              <p className="text-gray-600">
                We partner with skilled artisans who bring decades of experience and traditional Korean 
                techniques to every piece we create.
              </p>
            </div>

            {/* Sustainability */}
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-[#E91E63] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to ethical fashion practices, using eco-friendly materials and supporting 
                fair trade throughout our supply chain.
              </p>
            </div>

            {/* Innovation */}
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-[#C8A2C8] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                We continuously explore new designs, materials, and techniques while honoring traditional 
                Korean fashion heritage.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind Silk Stitch
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Founder */}
            <div className="text-center">
              <div className="relative mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
                  alt="Founder"
                  width={300}
                  height={300}
                  className="w-48 h-48 rounded-full mx-auto shadow-lg"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sarah Kim</h3>
              <p className="text-[#6A2C70] font-medium mb-3">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                With 15 years in fashion and a deep love for Korean culture, Sarah founded Silk Stitch 
                to bridge Eastern and Western fashion aesthetics.
              </p>
            </div>

            {/* Designer */}
            <div className="text-center">
              <div className="relative mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                  alt="Head Designer"
                  width={300}
                  height={300}
                  className="w-48 h-48 rounded-full mx-auto shadow-lg"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Min-jun Park</h3>
              <p className="text-[#6A2C70] font-medium mb-3">Head Designer</p>
              <p className="text-gray-600 text-sm">
                A Seoul-based designer with a background in traditional Korean textiles, Min-jun brings 
                authentic Korean aesthetic to our modern collections.
              </p>
            </div>

            {/* Operations */}
            <div className="text-center">
              <div className="relative mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
                  alt="Operations Manager"
                  width={300}
                  height={300}
                  className="w-48 h-48 rounded-full mx-auto shadow-lg"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Emily Chen</h3>
              <p className="text-[#6A2C70] font-medium mb-3">Operations Manager</p>
              <p className="text-gray-600 text-sm">
                Emily ensures every order meets our high standards, from quality control to customer 
                satisfaction and sustainable practices.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-[#6A2C70] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Our Mission
          </h2>
          <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto mb-8">
            "To empower women through fashion by creating timeless, high-quality pieces that celebrate 
            Korean aesthetic while embracing global sophistication. We believe that when you look good, 
            you feel confident, and when you feel confident, you can achieve anything."
          </p>
          <div className="flex justify-center">
            <div className="w-20 h-1 bg-[#E91E63] rounded"></div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}