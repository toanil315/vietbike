import VehicleTable from "@/components/admin/VehicleTable";
import { adminVehicleEndpoints } from "@/lib/api-endpoints";
import { Vehicle } from "@/types";

interface AdminVehiclesPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

interface VehiclesPageResponse {
  data: Vehicle[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

async function getVehiclesData(
  queryParams: URLSearchParams,
): Promise<VehiclesPageResponse> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  const response = await fetch(
    `${apiBaseUrl}${adminVehicleEndpoints.list()}?${queryParams.toString()}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return {
      data: [],
      pagination: {
        total: 0,
        page: 1,
        pageSize: Number(queryParams.get("pageSize") || 20),
        totalPages: 1,
      },
    };
  }

  const payload = (await response.json()) as {
    success: boolean;
    data?: VehiclesPageResponse;
  };

  if (!payload.success || !payload.data) {
    return {
      data: [],
      pagination: {
        total: 0,
        page: 1,
        pageSize: Number(queryParams.get("pageSize") || 20),
        totalPages: 1,
      },
    };
  }

  return payload.data;
}

export default async function AdminVehiclesPage({
  searchParams,
}: AdminVehiclesPageProps) {
  const params = await searchParams;
  const page = Number(params?.page || 1);
  const pageSize = Number(params?.pageSize || 20);
  const search = typeof params?.search === "string" ? params.search : "";
  const status = typeof params?.status === "string" ? params.status : "";
  const categoryId =
    typeof params?.categoryId === "string" ? params.categoryId : "";

  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    ...(search ? { search } : {}),
    ...(status ? { status } : {}),
    ...(categoryId ? { categoryId } : {}),
  });

  const vehiclesData = await getVehiclesData(query);

  return (
    <VehicleTable
      initialVehicles={vehiclesData.data}
      initialPagination={{
        total: vehiclesData.pagination.total,
        page: vehiclesData.pagination.page,
        pageSize: vehiclesData.pagination.pageSize,
        totalPages: vehiclesData.pagination.totalPages,
      }}
      initialFilters={{
        search,
        status,
        categoryId,
      }}
    />
  );
}
