import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Star, AlertCircle } from "lucide-react";

// Bike detail page with ISR and SEO
import BikeGallery from "@/components/bikes/BikeGallery";
import BikeSpecs from "@/components/bikes/BikeSpecs";
import BikeFeatures from "@/components/bikes/BikeFeatures";
import BookingCard from "@/components/bikes/BookingCard";
import { vehicleEndpoints } from "@/lib/api-endpoints";
import apiClient from "@/lib/api";
import { PaginatedData } from "@/hooks/useVehicles";
import { Vehicle } from "@/types";

const ISR_REVALIDATE = 3600; // Revalidate every hour

/**
 * Fetch bikes for ISR static generation
 * Fetches a limited set of bikes for initial static generation
 */
async function fetchBikesForStaticGeneration() {
  try {
    const vehicles = await apiClient.get<PaginatedData<Vehicle>>(
      vehicleEndpoints.list(),
      {
        next: { revalidate: ISR_REVALIDATE } as any,
      },
    );

    // Handle both direct array and paginated responses
    const bikesArray = Array.isArray(vehicles)
      ? vehicles
      : vehicles?.data || [];
    return bikesArray.slice(0, 50); // Limit to first 50 for initial generation
  } catch (error) {
    console.warn("Error fetching bikes for static generation:", error);
    return [];
  }
}

/**
 * Generate static params for all bikes
 * Used for ISR (Incremental Static Regeneration)
 */
export async function generateStaticParams() {
  const bikes = await fetchBikesForStaticGeneration();

  return bikes.map((bike: Vehicle) => ({
    slug: bike.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Fetch bike data from API
 */
async function fetchBikeBySlug(slug: string) {
  try {
    const bike = await apiClient.get<Vehicle>(vehicleEndpoints.bySlug(slug), {
      next: { revalidate: ISR_REVALIDATE },
    });

    return bike || null;
  } catch (error) {
    console.error(`Error fetching bike with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Generate dynamic metadata for SEO
 * Each bike detail page gets unique title and description
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const bike = await fetchBikeBySlug(slug);

  if (!bike) {
    return {
      title: "Bike Not Found | VietBike",
      description: "The bike you're looking for is not available.",
    };
  }

  // Get primary image from images array
  const primaryImage = bike.images?.[0] || "";

  return {
    title: `Rent ${bike.name} - ${bike.brand} ${bike.year} | VietBike`,
    description:
      bike.description ||
      `Rent ${bike.name} in Vietnam. ${bike.pricePerDay}/day.`,
    openGraph: {
      title: `Rent ${bike.name} | VietBike Bike Rental`,
      description: bike.description,
      images: primaryImage
        ? [
            {
              url: primaryImage.url,
              width: 1200,
              height: 800,
              alt: bike.name,
            },
          ]
        : [],
      type: "website",
      url: `https://vietbike.example.com/bikes/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `Rent ${bike.name} | VietBike`,
      description: bike.description,
      images: primaryImage ? [primaryImage] : [],
    },
    keywords: [
      bike.name,
      bike.brand,
      "motorbike rental",
      "Vietnam",
      bike.transmission,
      bike.fuelType,
    ],
    alternates: {
      canonical: `https://vietbike.example.com/bikes/${slug}`,
    },
  };
}

export default async function BikeDetailPage({ params }: Props) {
  const { slug } = await params;

  // Fetch bike from API
  const bike = await fetchBikeBySlug(slug);

  if (!bike) {
    notFound();
  }

  // Use images array from API
  const allImages =
    bike.images && Array.isArray(bike.images) ? bike.images : [];

  /**
   * JSON-LD structured data for rich snippets in search results
   * Helps search engines understand the product better
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: bike.name,
    description:
      bike.description || `Professional ${bike.brand} ${bike.name} rental`,
    image: allImages,
    brand: {
      "@type": "Brand",
      name: bike.brand,
    },
    manufacturer: {
      "@type": "Organization",
      name: bike.brand,
    },
    offers: {
      "@type": "Offer",
      url: `https://vietbike.example.com/bikes/${slug}`,
      priceCurrency: "USD",
      price: bike.pricePerDay.toString(),
      availability:
        bike.status === "available"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "VietBike",
        url: "https://vietbike.example.com",
      },
    },
    // Only include rating/review if available
    ...(bike.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: bike.rating.toString(),
            bestRating: "5",
            worstRating: "1",
            ratingCount: (bike.reviewCount || 0).toString(),
          },
        }
      : {}),
  };

  return (
    <div className="bg-surface-container/30 min-h-screen pb-20">
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 mb-8">
        <nav className="flex items-center gap-2 text-xs font-medium text-secondary">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/bikes" className="hover:text-primary transition-colors">
            Bikes
          </Link>
          <ChevronRight size={12} />
          <span className="text-on-surface">{bike.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Gallery & Details */}
          <article className="lg:col-span-7 space-y-12">
            {/* Gallery with Images */}
            {allImages.length > 0 ? (
              <BikeGallery
                images={allImages.map((img) => img.url)}
                name={bike.name}
              />
            ) : (
              <div className="aspect-video rounded-[2.5rem] bg-white border border-outline-variant/10 flex items-center justify-center">
                <div className="text-center">
                  <AlertCircle
                    size={32}
                    className="text-secondary mx-auto mb-2"
                  />
                  <p className="text-secondary text-sm">No images available</p>
                </div>
              </div>
            )}

            {/* Description & Specifications */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-outline-variant/10 space-y-12">
              {/* Header Section */}
              <section>
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                    {bike.transmission || "N/A"}
                  </span>
                  <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                    {bike.fuelType || "N/A"}
                  </span>
                  {bike.rating != null && bike.rating > 0 && (
                    <div className="flex items-center gap-1 text-tertiary">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-bold">
                        {bike.rating.toFixed(1)}
                      </span>
                      <span className="text-xs text-secondary ml-1">
                        ({bike.reviewCount || 0} reviews)
                      </span>
                    </div>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-2">
                  {bike.name}
                </h1>

                <p className="text-lg text-secondary font-medium mb-4">
                  {bike.brand} • {bike.year} • {bike.transmission || "N/A"} •{" "}
                  {bike.fuelType || "N/A"}
                </p>

                <p className="text-lg text-secondary leading-relaxed">
                  {bike.description}
                </p>
              </section>

              {/* Specifications */}
              {bike.specs && bike.engineSize && (
                <BikeSpecs specs={bike.specs} engineSize={bike.engineSize} />
              )}

              {/* Features List */}
              {bike.features && bike.features.length > 0 && (
                <BikeFeatures
                  features={bike.features.map((feature) => feature.featureName)}
                />
              )}
            </div>
          </article>

          {/* Right Column: Booking Card */}
          <aside className="lg:col-span-5">
            <BookingCard bike={bike} />
          </aside>
        </div>

        {/* Related Bikes Section */}
        <div className="mt-20 pt-12 border-t border-outline-variant/10">
          <h2 className="text-3xl font-bold text-on-surface mb-8">
            More Bikes Available
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {bike.relatedVehicles && bike.relatedVehicles.length > 0
              ? bike.relatedVehicles.slice(0, 3).map((relatedBike: any) => (
                  <Link
                    key={relatedBike.id}
                    href={`/bikes/${relatedBike.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-outline-variant/10 hover:border-primary/30 transition-all"
                  >
                    <div className="relative h-40 overflow-hidden bg-surface-container/20">
                      {relatedBike.images && relatedBike.images[0] && (
                        <img
                          src={relatedBike.images[0]}
                          alt={relatedBike.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">
                        {relatedBike.name}
                      </h3>
                      <p className="text-xs text-secondary mt-1">
                        {relatedBike.brand}
                      </p>
                      <p className="text-lg font-bold text-primary mt-2">
                        ${relatedBike.pricePerDay}/day
                      </p>
                    </div>
                  </Link>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
