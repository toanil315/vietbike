'use client';

import { CreditCard, Smartphone, Wallet, Building2, Banknote, Check, ShieldCheck } from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import { cn } from '@/lib/utils';

const paymentMethods = [
  { id: 'Momo', name: 'Momo Wallet', icon: Smartphone, color: 'bg-pink-500' },
  { id: 'ZaloPay', name: 'ZaloPay', icon: Wallet, color: 'bg-blue-500' },
  { id: 'Credit Card', name: 'Credit Card', icon: CreditCard, color: 'bg-indigo-500' },
  { id: 'Bank Transfer', name: 'Bank Transfer', icon: Building2, color: 'bg-emerald-500' },
  { id: 'Cash on Pickup', name: 'Cash on Pickup', icon: Banknote, color: 'bg-amber-500' },
];

export default function PaymentMethodSelector() {
  const { paymentMethod, setPaymentMethod } = useBookingStore();

  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-outline-variant/10 space-y-10">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <CreditCard size={24} />
        </div>
        <h2 className="text-2xl font-bold text-on-surface">Payment Method</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setPaymentMethod(method.id)}
            className={cn(
              "p-6 rounded-3xl border-2 text-left transition-all flex items-center gap-4 group",
              paymentMethod === method.id 
                ? "border-primary bg-primary/5 shadow-md shadow-primary/5" 
                : "border-outline-variant/10 hover:border-primary/30 bg-surface-container/30"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm",
              method.color
            )}>
              <method.icon size={24} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-on-surface group-hover:text-primary transition-colors">{method.name}</p>
              <p className="text-[10px] text-secondary uppercase tracking-wider font-bold">Secure Payment</p>
            </div>
            {paymentMethod === method.id && (
              <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center scale-110 shadow-lg">
                <Check size={18} />
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="p-6 rounded-3xl bg-surface-container/30 border border-outline-variant/10 flex items-start gap-4">
        <ShieldCheck size={24} className="text-primary shrink-0" />
        <p className="text-sm text-secondary leading-relaxed">
          Your payment information is encrypted and processed securely. We never store your full credit card details on our servers.
        </p>
      </div>
    </div>
  );
}
