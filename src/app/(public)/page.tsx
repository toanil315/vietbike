import { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import SearchBar from "@/components/home/SearchBar";
import CategoryNav from "@/components/bikes/CategoryNav";
import FeaturedBikes from "@/components/home/FeaturedBikes";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CTASection from "@/components/home/CTASection";
import {
  adminVehicleCategoryEndpoints,
  vehicleEndpoints,
} from "@/lib/api-endpoints";
import { Vehicle, VehicleCategory } from "@/types";

export const metadata: Metadata = {
  title: "VietBike - Premium Motorbike Rentals in Vietnam",
  description:
    "Explore Vietnam on two wheels. Premium motorbike rentals in Hanoi, Da Nang, Ho Chi Minh City. Scooters, sport bikes, and touring bikes available.",
  openGraph: {
    title: "VietBike - Premium Motorbike Rentals in Vietnam",
    description:
      "Explore Vietnam on two wheels with our premium motorbike fleet.",
    type: "website",
  },
};

interface VehiclesListResponse {
  data: Vehicle[];
}

interface FeaturedCategorySection {
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
  vehicles: Vehicle[];
}

async function fetchCategories(): Promise<VehicleCategory[]> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  try {
    const response = await fetch(
      `${apiBaseUrl}${adminVehicleCategoryEndpoints.list()}?page=1&pageSize=200`,
      { next: { revalidate: 300 } },
    );

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as {
      success?: boolean;
      data?: {
        items?: VehicleCategory[];
        data?: VehicleCategory[];
      };
    };

    if (!payload.success) {
      return [];
    }

    return payload.data?.items || payload.data?.data || [];
  } catch {
    return [];
  }
}

async function fetchFeaturedVehiclesByCategories(): Promise<
  FeaturedCategorySection[]
> {
  const categories = await fetchCategories();
  if (categories.length === 0) {
    return [];
  }

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  const sections = await Promise.all(
    categories.map(async (category) => {
      const query = new URLSearchParams({
        page: "1",
        pageSize: "4",
        categoryId: category.id,
      });

      try {
        const response = await fetch(
          `${apiBaseUrl}${vehicleEndpoints.list()}?${query.toString()}`,
          { next: { revalidate: 300 } },
        );

        if (!response.ok) {
          return null;
        }

        const payload = (await response.json()) as {
          success?: boolean;
          data?: VehiclesListResponse;
        };

        if (!payload.success) {
          return null;
        }

        const vehicles = (payload.data?.data || []).slice(0, 4);
        if (vehicles.length === 0) {
          return null;
        }

        return {
          categoryId: category.id,
          categoryName: category.name,
          categoryDescription: category.content,
          vehicles,
        } as FeaturedCategorySection;
      } catch {
        return null;
      }
    }),
  );

  return sections.filter((section): section is FeaturedCategorySection => {
    return Boolean(section && section.vehicles.length > 0);
  });
}

export default async function HomePage() {
  const featuredSections = await fetchFeaturedVehiclesByCategories();

  return (
    <div className="bg-surface-container/30 min-h-screen">
      <HeroSection />
      <div className="md:block hidden">
        <SearchBar />
      </div>
      <CategoryNav />
      <FeaturedBikes sections={featuredSections} />
      <div className="md:hidden block">
        <SearchBar />
      </div>
      <WhyChooseUs />
      <CTASection />
    </div>
  );
}
