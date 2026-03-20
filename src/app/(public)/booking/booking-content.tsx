'use client';

import { useRouter } from 'next/navigation';
import { Check, CreditCard, User, Package, ChevronRight, ChevronLeft } from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import { ADDONS, LOCATIONS } from '@/data/mockData';
import { formatPrice, cn } from '@/lib/utils';

export default function BookingContent() {
  const router = useRouter();
  const { 
    step, setStep, vehicle, pickupLocation, dropoffLocation,
    customerInfo, setCustomerInfo, selectedAddons, toggleAddon, paymentMethod, 
    setPaymentMethod, voucherCode, setVoucherCode, setLocations
  } = useBookingStore();

  if (!vehicle) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">No bike selected</h2>
        <button onClick={() => router.push('/bikes')} className="text-primary font-bold">Browse our fleet</button>
      </div>
    );
  }

  const steps = [
    { id: 1, name: 'Customer Info', icon: User },
    { id: 2, name: 'Add-ons & Review', icon: Package },
    { id: 3, name: 'Payment', icon: CreditCard },
  ];

  const calculateTotal = () => {
    const days = 3; // Mock duration
    let total = vehicle.pricePerDay * days;
    selectedAddons.forEach(id => {
      const addon = ADDONS.find(a => a.id === id);
      if (addon) total += addon.price * days;
    });
    return total;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Progress Bar */}
      <div className="flex justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-surface-container -translate-y-1/2 z-0"></div>
        {steps.map((s) => (
          <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-default border-4 border-surface",
              step >= s.id ? "bg-primary text-white" : "bg-surface-container text-secondary"
            )}>
              <s.icon size={20} />
            </div>
            <span className={cn("text-xs font-bold uppercase tracking-wider", step >= s.id ? "text-primary" : "text-secondary")}>
              {s.name}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {step === 1 && (
            <div className="glass p-8 rounded-3xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="text-2xl font-bold">Customer Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase">Full Name</label>
                  <input 
                    type="text" 
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ name: e.target.value })}
                    className="w-full bg-surface-container border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase">Email Address</label>
                  <input 
                    type="email" 
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ email: e.target.value })}
                    className="w-full bg-surface-container border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase">Phone Number</label>
                  <input 
                    type="tel" 
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ phone: e.target.value })}
                    className="w-full bg-surface-container border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20"
                    placeholder="090 123 4567"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase">Nationality</label>
                  <input 
                    type="text" 
                    value={customerInfo.nationality}
                    onChange={(e) => setCustomerInfo({ nationality: e.target.value })}
                    className="w-full bg-surface-container border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. Vietnam"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary uppercase">License Number</label>
                <input 
                  type="text" 
                  value={customerInfo.licenseNumber}
                  onChange={(e) => setCustomerInfo({ licenseNumber: e.target.value })}
                  className="w-full bg-surface-container border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter your driving license number"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="glass p-8 rounded-3xl space-y-6">
                <h2 className="text-2xl font-bold">Select Add-ons</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ADDONS.map((addon) => (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={cn(
                        "p-4 rounded-2xl border-2 text-left transition-default flex justify-between items-center",
                        selectedAddons.includes(addon.id) 
                          ? "border-primary bg-primary/5" 
                          : "border-outline-variant/15 hover:border-primary/30"
                      )}
                    >
                      <div>
                        <p className="font-bold">{addon.name}</p>
                        <p className="text-xs text-secondary">{addon.description}</p>
                        <p className="text-sm font-bold text-primary mt-1">+{formatPrice(addon.price)}/day</p>
                      </div>
                      {selectedAddons.includes(addon.id) && (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white">
                          <Check size={14} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass p-8 rounded-3xl space-y-6">
                <h2 className="text-2xl font-bold">Booking Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondary uppercase">Pickup Location</label>
                    <select 
                      className="w-full bg-surface-container border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20"
                      onChange={(e) => setLocations(e.target.value, dropoffLocation)}
                    >
                      <option value="">Select location</option>
                      {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondary uppercase">Dropoff Location</label>
                    <select 
                      className="w-full bg-surface-container border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20"
                      onChange={(e) => setLocations(pickupLocation, e.target.value)}
                    >
                      <option value="">Select location</option>
                      {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="glass p-8 rounded-3xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="text-2xl font-bold">Payment Selection</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Momo', 'ZaloPay', 'Credit Card', 'Bank Transfer', 'Cash on Pickup'].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={cn(
                      "p-6 rounded-2xl border-2 text-left transition-default flex justify-between items-center",
                      paymentMethod === method 
                        ? "border-primary bg-primary/5" 
                        : "border-outline-variant/15 hover:border-primary/30"
                    )}
                  >
                    <span className="font-bold">{method}</span>
                    {paymentMethod === method && (
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white">
                        <Check size={14} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-8">
            <button 
              onClick={() => step > 1 ? setStep(step - 1) : router.back()}
              className="flex items-center gap-2 text-secondary font-bold hover:text-primary transition-default"
            >
              <ChevronLeft size={20} /> {step === 1 ? 'Back' : 'Previous Step'}
            </button>
            <button 
              onClick={() => step < 3 ? setStep(step + 1) : router.push('/booking/confirmation')}
              className="bg-primary text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary-container transition-default ambient-shadow"
            >
              {step === 3 ? 'Confirm Booking' : 'Next Step'} <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <div className="glass p-6 rounded-3xl space-y-6 sticky top-24">
            <h3 className="font-bold text-lg">Booking Summary</h3>
            
            <div className="flex gap-4 pb-6 border-b border-outline-variant/15">
              <img src={vehicle.image} alt={vehicle.name} className="w-20 h-20 rounded-xl object-cover" referrerPolicy="no-referrer" />
              <div>
                <p className="font-bold">{vehicle.name}</p>
                <p className="text-xs text-secondary">{vehicle.engineSize} • {vehicle.type}</p>
                <p className="text-sm font-bold text-primary mt-1">{formatPrice(vehicle.pricePerDay)}/day</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-secondary">Rental (3 days)</span>
                <span className="font-medium">{formatPrice(vehicle.pricePerDay * 3)}</span>
              </div>
              {selectedAddons.map(id => {
                const addon = ADDONS.find(a => a.id === id);
                return (
                  <div key={id} className="flex justify-between">
                    <span className="text-secondary">{addon?.name}</span>
                    <span className="font-medium">{formatPrice((addon?.price || 0) * 3)}</span>
                  </div>
                );
              })}
              <div className="pt-3 border-t border-outline-variant/15 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">{formatPrice(calculateTotal())}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-secondary">Voucher Code</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  className="flex-1 bg-surface-container border-none rounded-xl py-2 px-3 text-sm"
                  placeholder="Enter code"
                />
                <button className="bg-secondary text-white px-4 py-2 rounded-xl text-xs font-bold">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
