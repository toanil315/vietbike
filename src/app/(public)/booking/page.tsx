import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import BookingFlow from '@/components/booking/BookingFlow';

export const metadata: Metadata = {
  title: 'Complete Your Booking',
  description: 'Finalize your motorbike rental booking. Add extras, choose pickup location, and select payment method.',
};

export default function BookingPage() {
  return (
    <div className="bg-surface-container/30 min-h-screen pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-12">
        <nav className="flex items-center gap-2 text-xs font-medium text-secondary mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/bikes" className="hover:text-primary transition-colors">Bikes</Link>
          <ChevronRight size={12} />
          <span className="text-on-surface">Booking</span>
        </nav>

        <h1 className="text-4xl font-bold text-on-surface mb-4">Complete Your Booking</h1>
        <p className="text-secondary">Just a few more steps to secure your ride.</p>
      </div>

      <BookingFlow />
    </div>
  );
}
