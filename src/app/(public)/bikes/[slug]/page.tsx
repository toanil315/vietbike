import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Star } from 'lucide-react';
import { VEHICLES } from '@/data/mockData';
import BikeGallery from '@/components/bikes/BikeGallery';
import BikeSpecs from '@/components/bikes/BikeSpecs';
import BikeFeatures from '@/components/bikes/BikeFeatures';
import BookingCard from '@/components/bikes/BookingCard';

export async function generateStaticParams() {
  return VEHICLES.map((bike) => ({
    slug: bike.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const bike = VEHICLES.find(v => v.slug === slug);
  if (!bike) return { title: 'Bike Not Found' };
  
  return {
    title: `Rent ${bike.name} in Vietnam`,
    description: bike.description,
    openGraph: {
      title: `Rent ${bike.name} | VietBike`,
      description: bike.description,
      images: [bike.image],
      type: 'website',
    },
  };
}

export default async function BikeDetailPage({ params }: Props) {
  const { slug } = await params;
  const bike = VEHICLES.find(v => v.slug === slug);

  if (!bike) {
    notFound();
  }

  const allImages = [bike.image, ...(bike.images || [])];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": bike.name,
    "description": bike.description,
    "image": bike.image,
    "offers": {
      "@type": "Offer",
      "price": bike.pricePerDay.toString(),
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": bike.rating.toString(),
      "reviewCount": bike.reviewCount.toString()
    }
  };

  return (
    <div className="bg-surface-container/30 min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 mb-8">
        <nav className="flex items-center gap-2 text-xs font-medium text-secondary">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/bikes" className="hover:text-primary transition-colors">Bikes</Link>
          <ChevronRight size={12} />
          <span className="text-on-surface">{bike.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Gallery & Details */}
          <article className="lg:col-span-7 space-y-12">
            {/* Gallery */}
            <BikeGallery images={allImages} name={bike.name} />

            {/* Description & Specs */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-outline-variant/10 space-y-12">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                    {bike.category}
                  </span>
                  <div className="flex items-center gap-1 text-tertiary">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold">{bike.rating} ({bike.reviewCount} reviews)</span>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-on-surface mb-6">{bike.name}</h1>
                <p className="text-secondary leading-relaxed text-lg">
                  {bike.description}
                </p>
              </section>

              <BikeSpecs specs={bike.specs} engineSize={bike.engineSize} />
              <BikeFeatures features={bike.features} />
            </div>
          </article>

          {/* Right Column: Booking Card */}
          <div className="lg:col-span-5">
            <BookingCard bike={bike} />
          </div>

        </div>
      </div>
    </div>
  );
}
