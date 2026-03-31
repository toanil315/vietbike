import BookingUpsertForm from "@/components/admin/bookings/booking-upsert-form";
import { adminBookingEndpoints } from "@/lib/api-endpoints";
import { getAdminAuthorizationHeader } from "@/lib/auth/require-admin-auth";
import { Booking } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

interface EditBookingPageProps {
  params: Promise<{ reference: string }>;
}

async function fetchBookingByReference(
  reference: string,
): Promise<Booking | null> {
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

    return payload.success ? payload.data || null : null;
  } catch {
    return null;
  }
}

export default async function EditBookingPage({
  params,
}: EditBookingPageProps) {
  const { reference } = await params;
  const initialBooking = await fetchBookingByReference(reference);

  return (
    <BookingUpsertForm
      mode="edit"
      bookingId={initialBooking?.id}
      initialBooking={initialBooking}
    />
  );
}
