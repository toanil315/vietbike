"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Calendar,
  Home,
  Download,
  Share2,
  Bike,
  ShieldCheck,
  MessageCircle,
  Copy,
  PhoneCall,
} from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";
import { motion } from "motion/react";
import { formatPrice } from "@/lib/utils";
import apiClient from "@/lib/api";
import { bookingEndpoints, vehicleEndpoints } from "@/lib/api-endpoints";
import { Booking, Vehicle } from "@/types";

export default function BookingConfirmation() {
  const {
    vehicle,
    customerInfo,
    resetBooking,
    startDate,
    endDate,
    bookingReference,
  } = useBookingStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bookingDetail, setBookingDetail] = useState<Booking | null>(null);
  const [fetchedVehicle, setFetchedVehicle] = useState<Vehicle | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const reference = searchParams.get("reference");
  const currentReference = reference || bookingReference;

  useEffect(() => {
    setIsClient(true);
    if (!vehicle && !reference) {
      // If no vehicle in store and no reference in URL, redirect to home
      const timer = setTimeout(() => {
        router.push("/");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [vehicle, reference, router]);

  useEffect(() => {
    const loadBooking = async () => {
      if (!currentReference) {
        return;
      }

      try {
        setIsLoadingDetails(true);
        setDetailsError(null);

        const booking = await apiClient.get<Booking>(
          bookingEndpoints.getByReference(currentReference),
        );
        setBookingDetail(booking);

        if (booking?.vehicleId) {
          const vehicleDetail = await apiClient.get<Vehicle>(
            vehicleEndpoints.byId(booking.vehicleId),
          );
          setFetchedVehicle(vehicleDetail);
        }
      } catch (err) {
        setDetailsError(
          err instanceof Error ? err.message : "Unable to load booking details",
        );
      } finally {
        setIsLoadingDetails(false);
      }
    };

    if (isClient) {
      void loadBooking();
    }
  }, [currentReference, isClient]);

  if (!isClient) return null;

  // Determine what booking data to display
  const displayVehicle = fetchedVehicle || vehicle;
  const displayCustomer = {
    name: bookingDetail?.customerInfo?.fullName || customerInfo.name,
    email: bookingDetail?.customerInfo?.email || customerInfo.email,
    phone: bookingDetail?.customerInfo?.phone || customerInfo.phone,
  };
  const displayStartDate = bookingDetail?.pickupDate || startDate;
  const displayEndDate = bookingDetail?.dropoffDate || endDate;

  const numberOfDays =
    displayStartDate && displayEndDate
      ? Math.ceil(
          (new Date(displayEndDate).getTime() -
            new Date(displayStartDate).getTime()) /
            (1000 * 60 * 60 * 24),
        ) || 1
      : 3;

  const bookingId =
    bookingDetail?.reference ||
    currentReference ||
    `VELO-${Date.now().toString(36).toUpperCase().slice(-8)}`;

  const totalPrice =
    bookingDetail?.totalAmount ||
    (displayVehicle ? displayVehicle.pricePerDay * numberOfDays : 0);

  const handleCopyReference = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadReceipt = () => {
    // Create a basic receipt document
    const receiptContent = `
VIETBIKE RENTAL CONFIRMATION
========================================
Booking Reference: ${bookingId}
Date: ${new Date().toLocaleDateString()}

VEHICLE DETAILS
${displayVehicle?.name || "N/A"}
${displayVehicle?.brand} • ${displayVehicle?.model || "N/A"}

CUSTOMER INFO
Name: ${displayCustomer.name || "N/A"}
Email: ${displayCustomer.email || "N/A"}
Phone: ${displayCustomer.phone || "N/A"}

RENTAL PERIOD
Check-in: ${displayStartDate || "N/A"}
Check-out: ${displayEndDate || "N/A"}
Duration: ${numberOfDays} days

PRICING
Daily Rate: ${formatPrice(displayVehicle?.pricePerDay || 0)}
Number of Days: ${numberOfDays}
Total: ${formatPrice(totalPrice)}

Thank you for booking with VietBike!
Contact: support@vietbike.com | +84 1234 567 890
    `;

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(receiptContent),
    );
    element.setAttribute("download", `VietBike_${bookingId}.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = async () => {
    const shareText = `I just booked a ${displayVehicle?.name || "motorbike"} with VietBike! Reference: ${bookingId}`;
    if (navigator.share) {
      await navigator.share({
        title: "VietBike Booking",
        text: shareText,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert("Booking details copied to clipboard!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-12 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-[3rem] shadow-2xl border border-outline-variant/10 overflow-hidden"
      >
        {/* Success Banner */}
        <div className="bg-linear-to-br from-emerald-500 via-emerald-600 to-teal-600 p-12 text-center text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)",
            }}
          />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              damping: 12,
              stiffness: 200,
              delay: 0.2,
            }}
            className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/30"
          >
            <CheckCircle2 size={48} className="text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-white/90 text-lg">
            Your adventure is officially reserved. Get ready to ride!
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 inline-flex items-center gap-3 bg-white/15 backdrop-blur-lg px-6 py-3 rounded-full border border-white/30 group"
          >
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">
              Booking Reference:
            </span>
            <span className="font-mono font-bold text-lg">{bookingId}</span>
            <button
              onClick={handleCopyReference}
              className="ml-2 p-1.5 hover:bg-white/20 rounded-lg transition-all opacity-70 hover:opacity-100"
              title="Copy reference"
            >
              <Copy size={16} />
            </button>
            {copied && <span className="text-xs ml-1">Copied!</span>}
          </motion.div>
        </div>

        <div className="p-8 md:p-12 space-y-12">
          {isLoadingDetails && (
            <div className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
              Loading booking details...
            </div>
          )}

          {detailsError && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              {detailsError}. Showing available local data.
            </div>
          )}

          {/* Main Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Vehicle Details */}
              <div>
                <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-4">
                  🏍️ Vehicle Details
                </h3>
                {displayVehicle ? (
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border border-outline-variant/10 shrink-0 bg-surface-container/20">
                      <img
                        src={
                          displayVehicle.images?.[0]?.url ||
                          "https://picsum.photos/seed/bike-confirm/200/200"
                        }
                        alt={displayVehicle.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        width={200}
                        height={200}
                      />
                    </div>
                    <div>
                      <p className="font-bold text-on-surface text-lg">
                        {displayVehicle.name}
                      </p>
                      <p className="text-sm text-secondary font-medium uppercase tracking-wide mt-1">
                        {displayVehicle.brand} • {displayVehicle.model}
                      </p>
                      <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                        <Bike size={12} />
                        Premium Fleet
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-surface-container/30 rounded-xl border border-outline-variant/10">
                    <p className="text-secondary text-sm">
                      Vehicle information not available
                    </p>
                  </div>
                )}
              </div>

              {/* Rental Period */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">
                  📅 Rental Period
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 bg-linear-to-br from-blue-50 to-blue-50/50 p-4 rounded-2xl border border-blue-200/20">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-sm">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-secondary font-medium mb-1">
                        Check-in
                      </p>
                      <p className="text-sm font-bold text-on-surface">
                        {displayStartDate
                          ? new Date(displayStartDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-linear-to-br from-red-50 to-red-50/50 p-4 rounded-2xl border border-red-200/20">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-red-600 shadow-sm">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-secondary font-medium mb-1">
                        Check-out
                      </p>
                      <p className="text-sm font-bold text-on-surface">
                        {displayEndDate
                          ? new Date(displayEndDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="bg-primary/5 p-3 rounded-xl border border-primary/20 text-center">
                    <p className="text-primary font-bold text-lg">
                      {numberOfDays} Days
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Customer Info */}
              <div>
                <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-4">
                  👤 Customer Information
                </h3>
                <div className="bg-surface-container/20 p-6 rounded-2xl border border-outline-variant/10 space-y-4">
                  <div>
                    <p className="text-xs text-secondary mb-1">Full Name</p>
                    <p className="font-bold text-on-surface">
                      {displayCustomer.name || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-secondary mb-1">Email</p>
                    <p className="font-bold text-on-surface break-all">
                      {displayCustomer.email || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-secondary mb-1">Phone</p>
                    <p className="font-bold text-on-surface">
                      {displayCustomer.phone || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Summary */}
          {displayVehicle && (
            <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-200/30">
              <h3 className="text-lg font-bold text-on-surface mb-6">
                💰 Pricing Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-secondary">
                    {displayVehicle.name} × {numberOfDays} days
                  </span>
                  <span className="font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <div className="border-t border-amber-200/50 pt-4 flex justify-between">
                  <span className="font-bold text-lg">Total Payment</span>
                  <span className="font-bold text-2xl text-primary">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-surface-container/30 rounded-3xl p-8 border border-outline-variant/10">
            <h3 className="text-xl font-bold text-on-surface mb-8 flex items-center gap-2">
              <ShieldCheck className="text-primary text-2xl" />
              What's Next?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3 p-4 rounded-xl bg-white/50"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <p className="font-bold text-sm">Check Your Email</p>
                <p className="text-xs text-secondary leading-relaxed">
                  Confirmation and rental agreement sent to your inbox.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-3 p-4 rounded-xl bg-white/50"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <p className="font-bold text-sm">Prepare Documents</p>
                <p className="text-xs text-secondary leading-relaxed">
                  Have original license and passport ready for pickup.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-3 p-4 rounded-xl bg-white/50"
              >
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <p className="font-bold text-sm">Enjoy Your Ride</p>
                <p className="text-xs text-secondary leading-relaxed">
                  Our team will meet you with your bike ready to go!
                </p>
              </motion.div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            <Link
              href="/"
              onClick={resetBooking}
              className="flex items-center justify-center gap-2 bg-on-surface hover:bg-on-surface/90 text-white py-4 px-6 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl"
            >
              <Home size={20} />
              Return Home
            </Link>
            <button
              onClick={handleDownloadReceipt}
              className="flex items-center justify-center gap-2 bg-surface-container hover:bg-surface-container/80 text-on-surface py-4 px-6 rounded-2xl font-bold transition-all border border-outline-variant/20"
            >
              <Download size={20} />
              Download Receipt
            </button>
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 bg-surface-container hover:bg-surface-container/80 text-on-surface py-4 px-6 rounded-2xl font-bold transition-all border border-outline-variant/20"
            >
              <Share2 size={20} />
              Share Booking
            </button>
          </div>

          {/* Support Section */}
          <div className="bg-primary/5 rounded-3xl p-8 border border-primary/20">
            <h3 className="font-bold text-on-surface mb-4">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="mailto:support@vietbike.com"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <MessageCircle className="text-primary" size={20} />
                <div>
                  <p className="text-xs font-bold text-secondary">
                    Email Support
                  </p>
                  <p className="text-sm font-bold text-on-surface">
                    support@vietbike.com
                  </p>
                </div>
              </a>
              <a
                href="tel:+84123456789"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <PhoneCall className="text-primary" size={20} />
                <div>
                  <p className="text-xs font-bold text-secondary">Call Us</p>
                  <p className="text-sm font-bold text-on-surface">
                    +84 1234 5678
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
