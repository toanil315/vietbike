"use client";

import { CreditCard, ShieldCheck } from "lucide-react";

export default function PaymentMethodSelector() {
  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-outline-variant/10 space-y-10">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <CreditCard size={24} />
        </div>
        <h2 className="text-2xl font-bold text-on-surface">Payment Method</h2>
      </div>

      <p className="text-secondary">
        Payment method is confirmed by staff after your booking request is
        accepted.
      </p>

      <div className="p-6 rounded-3xl bg-surface-container/30 border border-outline-variant/10 flex items-start gap-4">
        <ShieldCheck size={24} className="text-primary shrink-0" />
        <p className="text-sm text-secondary leading-relaxed">
          Your payment information is encrypted and processed securely. We never
          store your full credit card details on our servers.
        </p>
      </div>
    </div>
  );
}
