import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { VEHICLES } from '@/data/mockData';
import BikeCard from '../bikes/BikeCard';

export default function FeaturedBikes() {
  const featuredBikes = VEHICLES.slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 tracking-tight">
            Our Featured Fleet
          </h2>
          <p className="text-secondary text-lg">
            Hand-picked premium motorbikes maintained to the highest standards
            for your safety and comfort.
          </p>
        </div>
        <Link
          href="/bikes"
          className="group flex items-center gap-2 text-primary font-bold text-lg hover:underline"
        >
          View All Fleet{" "}
          <ChevronRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredBikes.map((bike, index) => (
          <BikeCard key={bike.id} bike={bike} index={index} />
        ))}
      </div>
    </section>
  );
}
