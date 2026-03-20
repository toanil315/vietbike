import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Check, 
  CreditCard, 
  User, 
  Package, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Info,
  CheckCircle2,
  Wallet,
  Smartphone,
  Banknote,
  Building2,
  Star
} from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import { ADDONS, LOCATIONS } from '@/data/mockData';
import { formatPrice, cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function BookingPage() {
  const navigate = useNavigate();
  const { 
    step, setStep, vehicle, startDate, endDate, pickupLocation, dropoffLocation,
    customerInfo, setCustomerInfo, selectedAddons, toggleAddon, paymentMethod, 
    setPaymentMethod, voucherCode, setVoucherCode, setDates, setLocations
  } = useBookingStore();

  if (!vehicle) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center text-secondary mx-auto mb-6">
          <Info size={40} />
        </div>
        <h2 className="text-3xl font-bold mb-4">No bike selected</h2>
        <p className="text-secondary mb-8">Please choose a motorbike from our fleet to start your booking.</p>
        <Link 
          to="/bikes" 
          className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-container transition-all shadow-lg"
        >
          Browse our fleet
        </Link>
      </div>
    );
  }

  const steps = [
    { id: 1, name: 'Personal Info', icon: User },
    { id: 2, name: 'Add-ons & Details', icon: Package },
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

  const paymentMethods = [
    { id: 'Momo', name: 'Momo Wallet', icon: Smartphone, color: 'bg-pink-500' },
    { id: 'ZaloPay', name: 'ZaloPay', icon: Wallet, color: 'bg-blue-500' },
    { id: 'Credit Card', name: 'Credit Card', icon: CreditCard, color: 'bg-indigo-500' },
    { id: 'Bank Transfer', name: 'Bank Transfer', icon: Building2, color: 'bg-emerald-500' },
    { id: 'Cash on Pickup', name: 'Cash on Pickup', icon: Banknote, color: 'bg-amber-500' },
  ];

  return (
    <div className="bg-surface-container/30 min-h-screen pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-12">
        <nav className="flex items-center gap-2 text-xs font-medium text-secondary mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/bikes" className="hover:text-primary transition-colors">Bikes</Link>
          <ChevronRight size={12} />
          <span className="text-on-surface">Booking</span>
        </nav>

        <h1 className="text-4xl font-bold text-on-surface mb-4">Complete Your Booking</h1>
        <p className="text-secondary">Just a few more steps to secure your ride.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Progress Stepper */}
        <div className="bg-white rounded-[2rem] p-8 mb-12 shadow-sm border border-outline-variant/10">
          <div className="flex justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-surface-container -translate-y-1/2 z-0"></div>
            {steps.map((s) => (
              <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border-4 border-white shadow-lg",
                  step >= s.id ? "bg-primary text-white scale-110" : "bg-surface-container text-secondary"
                )}>
                  {step > s.id ? <CheckCircle2 size={24} /> : <s.icon size={24} />}
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest transition-colors duration-500",
                  step >= s.id ? "text-primary" : "text-secondary"
                )}>
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Form Area */}
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-outline-variant/10 space-y-10"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <User size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-on-surface">Personal Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">Full Name</label>
                      <input 
                        type="text" 
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ name: e.target.value })}
                        className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-4 px-5 text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">Email Address</label>
                      <input 
                        type="email" 
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ email: e.target.value })}
                        className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-4 px-5 text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">Phone Number</label>
                      <input 
                        type="tel" 
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ phone: e.target.value })}
                        className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-4 px-5 text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="+84 123 456 789"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">Nationality</label>
                      <input 
                        type="text" 
                        value={customerInfo.nationality}
                        onChange={(e) => setCustomerInfo({ nationality: e.target.value })}
                        className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-4 px-5 text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="e.g. United States"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">Driving License Number</label>
                    <input 
                      type="text" 
                      value={customerInfo.licenseNumber}
                      onChange={(e) => setCustomerInfo({ licenseNumber: e.target.value })}
                      className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-4 px-5 text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Enter your license ID"
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-outline-variant/10 space-y-10">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <Package size={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-on-surface">Select Add-ons</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {ADDONS.map((addon) => (
                        <button
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={cn(
                            "p-6 rounded-3xl border-2 text-left transition-all flex justify-between items-center group",
                            selectedAddons.includes(addon.id) 
                              ? "border-primary bg-primary/5 shadow-md shadow-primary/5" 
                              : "border-outline-variant/10 hover:border-primary/30 bg-surface-container/30"
                          )}
                        >
                          <div className="flex-1 pr-4">
                            <p className="font-bold text-on-surface group-hover:text-primary transition-colors">{addon.name}</p>
                            <p className="text-xs text-secondary mt-1">{addon.description}</p>
                            <p className="text-sm font-bold text-primary mt-3">+{formatPrice(addon.price)}<span className="text-[10px] text-secondary font-medium">/day</span></p>
                          </div>
                          <div className={cn(
                            "w-8 h-8 rounded-xl flex items-center justify-center transition-all",
                            selectedAddons.includes(addon.id) ? "bg-primary text-white scale-110" : "bg-white text-secondary border border-outline-variant/20"
                          )}>
                            <Check size={18} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-outline-variant/10 space-y-10">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <MapPin size={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-on-surface">Pickup & Dropoff</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">Pickup Location</label>
                        <select 
                          value={pickupLocation}
                          onChange={(e) => setLocations(e.target.value, dropoffLocation)}
                          className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-4 px-5 text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                        >
                          <option value="">Select location</option>
                          {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">Dropoff Location</label>
                        <select 
                          value={dropoffLocation}
                          onChange={(e) => setLocations(pickupLocation, e.target.value)}
                          className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-4 px-5 text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                        >
                          <option value="">Select location</option>
                          {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-outline-variant/10 space-y-10"
                >
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
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8">
              <button 
                onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}
                className="flex items-center gap-2 text-secondary font-bold hover:text-primary transition-all group"
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
                {step === 1 ? 'Back to bike' : 'Previous Step'}
              </button>
              <button 
                onClick={() => step < 3 ? setStep(step + 1) : navigate('/booking/confirmation')}
                className="bg-primary text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-primary-container transition-all shadow-xl shadow-primary/20 flex items-center gap-2 group"
              >
                {step === 3 ? 'Confirm Booking' : 'Next Step'} 
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-outline-variant/10 space-y-8">
                <h3 className="text-xl font-bold text-on-surface">Booking Summary</h3>
                
                <div className="flex gap-4 pb-8 border-b border-outline-variant/10">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border border-outline-variant/10 shrink-0">
                    <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface text-lg">{vehicle.name}</p>
                    <p className="text-xs text-secondary font-medium uppercase tracking-wider mt-1">{vehicle.brand} • {vehicle.engineSize}</p>
                    <div className="flex items-center gap-1 text-tertiary mt-2">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-bold">{vehicle.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-secondary font-medium">Rental (3 days)</span>
                    <span className="font-bold text-on-surface">{formatPrice(vehicle.pricePerDay * 3)}</span>
                  </div>
                  
                  {selectedAddons.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Add-ons</p>
                      {selectedAddons.map(id => {
                        const addon = ADDONS.find(a => a.id === id);
                        return (
                          <div key={id} className="flex justify-between items-center text-sm">
                            <span className="text-secondary font-medium">{addon?.name}</span>
                            <span className="font-bold text-on-surface">{formatPrice((addon?.price || 0) * 3)}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="pt-6 border-t border-outline-variant/10 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">Total Amount</p>
                      <p className="text-3xl font-bold text-primary">{formatPrice(calculateTotal())}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">All Taxes Incl.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">Voucher Code</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      className="flex-1 bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="VELO10"
                    />
                    <button className="bg-on-surface text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-on-surface/90 transition-all">Apply</button>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-white rounded-3xl p-6 border border-outline-variant/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-sm">Secure Checkout</h4>
                  <p className="text-xs text-secondary">SSL Encrypted Transaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
