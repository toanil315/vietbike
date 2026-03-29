import Link from "next/link";
import { cn } from "@/lib/utils";
import { VehicleCategory } from "@/types";

/**
 * Derive visual config from the real backend category name
 */
function getCategoryVisuals(name: string) {
  const lower = name.toLowerCase();

  if (lower.includes("premium")) {
    return {
      emoji: "🛵",
      colorClass:
        "bg-amber-50 border-amber-200/50 hover:border-amber-400 hover:shadow-amber-100",
    };
  }

  if (lower.includes("electric")) {
    return {
      emoji: "⚡",
      colorClass:
        "bg-emerald-50 border-emerald-200/50 hover:border-emerald-400 hover:shadow-emerald-100",
    };
  }

  if (lower.includes("50cc")) {
    return {
      emoji: "⛽",
      colorClass:
        "bg-sky-50 border-sky-200/50 hover:border-sky-400 hover:shadow-sky-100",
    };
  }

  if (lower.includes("budget")) {
    return {
      emoji: "🏷️",
      colorClass:
        "bg-violet-50 border-violet-200/50 hover:border-violet-400 hover:shadow-violet-100",
    };
  }

  // Fallback
  return {
    emoji: "🏍️",
    colorClass:
      "bg-slate-50 border-slate-200/50 hover:border-slate-400 hover:shadow-slate-100",
  };
}

async function fetchCategories(): Promise<VehicleCategory[]> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  try {
    const response = await fetch(`${apiBaseUrl}/admin/vehicle-categories`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) return [];

    const payload = (await response.json()) as {
      success: boolean;
      data?: { items: VehicleCategory[] };
    };

    return payload?.data?.items || [];
  } catch {
    return [];
  }
}

export default async function CategoryNav() {
  const categories = await fetchCategories();

  if (categories.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-on-surface">
          Explore Our Scooters
        </h2>
        <p className="text-secondary mt-2">
          Choose the perfect scooter for your trip
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
        {categories.map((cat) => {
          const visuals = getCategoryVisuals(cat.name);
          return (
            <Link
              key={cat.id}
              href={`/bikes?categoryId=${cat.id}`}
              className={cn(
                "group flex flex-col items-center gap-2 p-6 md:p-8 rounded-2xl border transition-all duration-300 hover:shadow-lg",
                visuals.colorClass,
              )}
            >
              <span className="text-3xl md:text-4xl mb-1">{visuals.emoji}</span>
              <span className="font-bold text-on-surface text-sm md:text-base text-center">
                {cat.name}
              </span>
              {cat.description && (
                <span className="text-[11px] text-secondary text-center">
                  {cat.description}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
