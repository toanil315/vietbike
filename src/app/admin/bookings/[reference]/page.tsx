import Link from "next/link";
import BookingDetailCard from "@/components/admin/bookings/booking-detail-card";
import { adminBookingEndpoints } from "@/lib/api-endpoints";
import { getAdminAuthorizationHeader } from "@/lib/auth/require-admin-auth";
import { Booking } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

interface BookingDetailPageProps {
  params: Promise<{ reference: string }>;
}

async function fetchBooking(reference: string): Promise<Booking | null> {
  const authorization = await getAdminAuthorizationHeader();

  try {
    const response = await fetch(
      `${API_BASE_URL}${adminBookingEndpoints.detail(reference)}`,
      {
        cache: "no-store",
        headers: { Authorization: authorization },
      },
    );

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as {
      success: boolean;
      data?: Booking | null;
    };

    if (!payload.success || !payload.data) {
      return null;
    }

    return payload.data;
  } catch {
    return null;
  }
}

export default async function BookingDetailPage({
  params,
}: BookingDetailPageProps) {
  const { reference } = await params;
  const booking = await fetchBooking(reference);

  if (!booking) {
    return (
      <div className="space-y-4 rounded-3xl border border-outline-variant/10 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-on-surface">
          Không tìm thấy booking
        </h1>
        <p className="text-sm text-secondary">
          Không có booking với mã {reference}.
        </p>
        <Link href="/admin/bookings" className="text-sm font-bold text-primary">
          Quay lại quản lý booking
        </Link>
      </div>
    );
  }

  return <BookingDetailCard booking={booking} />;
}
