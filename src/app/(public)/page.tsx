import { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import SearchBar from '@/components/home/SearchBar';
import CategoryNav from '@/components/bikes/CategoryNav';
import FeaturedBikes from '@/components/home/FeaturedBikes';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'VietBike - Premium Motorbike Rentals in Vietnam',
  description: 'Explore Vietnam on two wheels. Premium motorbike rentals in Hanoi, Da Nang, Ho Chi Minh City. Scooters, sport bikes, and touring bikes available.',
  openGraph: {
    title: 'VietBike - Premium Motorbike Rentals in Vietnam',
    description: 'Explore Vietnam on two wheels with our premium motorbike fleet.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="bg-surface-container/30 min-h-screen">
      <HeroSection />
      <div className="md:block hidden">
        <SearchBar />
      </div>
      <CategoryNav />
      <FeaturedBikes />
      <div className="md:hidden block">
        <SearchBar />
      </div>
      <WhyChooseUs />
      <CTASection />
    </div>
  );
}
