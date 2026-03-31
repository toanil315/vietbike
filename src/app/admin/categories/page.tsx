import { adminVehicleCategoryEndpoints } from "@/lib/api-endpoints";
import CategoryManagementPage from "@/components/admin/categories/category-management-page";
import { getAdminAuthorizationHeader } from "@/lib/auth/require-admin-auth";
import { VehicleCategory } from "@/types";

async function getCategoryData(): Promise<VehicleCategory[]> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
  const authorization = await getAdminAuthorizationHeader();

  try {
    const response = await fetch(
      `${apiBaseUrl}${adminVehicleCategoryEndpoints.list()}?page=1&pageSize=200`,
      {
        cache: "no-store",
        headers: { Authorization: authorization },
      },
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

export default async function AdminCategoriesPage() {
  const categories = await getCategoryData();

  return <CategoryManagementPage initialCategories={categories} />;
}
