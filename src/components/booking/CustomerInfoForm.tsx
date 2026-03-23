"use client";

import { MessageCircle, Phone, User, NotebookPen, Bike } from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";

export default function CustomerInfoForm() {
  const {
    customerInfo,
    setCustomerInfo,
    sourceApp,
    setSourceApp,
    note,
    setNote,
    vehicle,
  } = useBookingStore();

  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-outline-variant/10 space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <User size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-on-surface">
              Booking Details
            </h2>
            <p className="text-sm text-secondary">
              Fill in your contact info so we can confirm this booking quickly.
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 rounded-2xl border border-outline-variant/20 bg-surface-container/40 px-3 py-2 text-xs font-semibold text-secondary">
          <Bike size={14} />
          <span>{vehicle?.licensePlate || "No plate"}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">
            Full Name *
          </label>
          <div className="relative">
            <User
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
            />
            <input
              type="text"
              required
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({ name: e.target.value })}
              className="w-full pl-11 pr-4 bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-4 text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Your full name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">
            Phone Number *
          </label>
          <div className="relative">
            <Phone
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
            />
            <input
              type="tel"
              required
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo({ phone: e.target.value })}
              className="w-full pl-11 pr-4 bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-4 text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="+84 90 123 4567"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">
            Email (Optional)
          </label>
          <input
            type="email"
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({ email: e.target.value })}
            className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-4 px-5 text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="your@email.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">
            How You Found Us
          </label>
          <div className="relative">
            <MessageCircle
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
            />
            <select
              value={sourceApp}
              onChange={(e) => setSourceApp(e.target.value)}
              className="w-full appearance-none pl-11 pr-4 bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-4 text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            >
              <option value="web">Website</option>
              <option value="facebook">Facebook</option>
              <option value="zalo">Zalo</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">
            Nationality
          </label>
          <input
            type="text"
            value={customerInfo.nationality}
            onChange={(e) => setCustomerInfo({ nationality: e.target.value })}
            className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-4 px-5 text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="e.g. Vietnam"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">
            Driving License Number
          </label>
          <input
            type="text"
            value={customerInfo.licenseNumber}
            onChange={(e) => setCustomerInfo({ licenseNumber: e.target.value })}
            className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-4 px-5 text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="License ID"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">
          Special Request
        </label>
        <div className="relative">
          <NotebookPen
            size={16}
            className="absolute left-4 top-4 text-secondary"
          />
          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full pl-11 pr-4 py-4 bg-surface-container/50 border border-outline-variant/20 rounded-2xl text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            placeholder="Any request for pick-up time, support, or contact preference"
          />
        </div>
      </div>

      <div className="md:hidden inline-flex items-center gap-2 rounded-2xl border border-outline-variant/20 bg-surface-container/40 px-3 py-2 text-xs font-semibold text-secondary">
        <Bike size={14} />
        <span>{vehicle?.licensePlate || "No plate"}</span>
      </div>
    </div>
  );
}
