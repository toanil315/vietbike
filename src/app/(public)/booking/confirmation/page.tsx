import { Metadata } from "next";
import BookingConfirmation from "@/components/booking/BookingConfirmation";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  description: "Your VietBike motorbike rental has been confirmed.",
};

export default function BookingConfirmationPage() {
  return (
    <div className="bg-surface-container/30 min-h-screen pb-20">
      <BookingConfirmation />
    </div>
  );
}
