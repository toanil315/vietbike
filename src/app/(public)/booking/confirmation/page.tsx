import { Metadata } from "next";
import BookingConfirmation from "@/components/booking/BookingConfirmation";
import { connection } from "next/server";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  description: "Your VietBike motorbike rental has been confirmed.",
};

export default async function BookingConfirmationPage() {
  await connection();

  return (
    <div className="bg-surface-container/30 min-h-screen pb-20">
      <BookingConfirmation />
    </div>
  );
}
