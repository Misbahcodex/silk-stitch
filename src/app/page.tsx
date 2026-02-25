import HeroSection from '@/components/HeroSection';
import ShopNowSection from '@/components/ShopNowSection';
import TopPicksSection from '@/components/TopPicksSection';
import HeroSection2 from '@/components/HeroSection2';
import MostLovedDesigns from '@/components/MostLovedDesigns';
import CollectionSection from '@/components/CollectionSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen pt-16">
      <HeroSection />
      <ShopNowSection />
      <TopPicksSection />
      <HeroSection2 />
      <MostLovedDesigns />
      <CollectionSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
