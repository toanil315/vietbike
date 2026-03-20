import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Star, 
  Shield, 
  Check, 
  ChevronRight, 
  MapPin, 
  Fuel, 
  Gauge, 
  Weight, 
  ArrowUpRight,
  Heart,
  Share2,
  Info,
  Calendar,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { VEHICLES } from '@/data/mockData';
import { formatPrice } from '@/lib/utils';
import { useBookingStore } from '@/store/bookingStore';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export default function BikeDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const setVehicle = useBookingStore((state) => state.setVehicle);
  const [activeImage, setActiveImage] = useState(0);
  
  const bike = VEHICLES.find(v => v.slug === slug);

  if (!bike) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Bike not found</h1>
        <Link to="/bikes" className="text-primary font-bold hover:underline">Back to fleet</Link>
      </div>
    );
  }

  const handleBookNow = () => {
    setVehicle(bike);
    navigate('/booking');
  };

  const allImages = [bike.image, ...bike.images];

  return (
    <div className="bg-surface-container/30 min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 mb-8">
        <nav className="flex items-center gap-2 text-xs font-medium text-secondary">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/bikes" className="hover:text-primary transition-colors">Bikes</Link>
          <ChevronRight size={12} />
          <span className="text-on-surface">{bike.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Gallery & Details */}
          <div className="lg:col-span-7 space-y-12">
            {/* Gallery */}
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-[16/10] rounded-[2.5rem] overflow-hidden bg-white border border-outline-variant/10 shadow-sm relative group"
              >
                <img 
                  src={allImages[activeImage]} 
                  alt={bike.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-secondary hover:text-primary transition-colors shadow-lg">
                    <Share2 size={20} />
                  </button>
                  <button className="w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-secondary hover:text-primary transition-colors shadow-lg">
                    <Heart size={20} />
                  </button>
                </div>
              </motion.div>
              
              <div className="grid grid-cols-4 gap-4">
                {allImages.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all",
                      activeImage === i ? "border-primary shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt={`${bike.name} ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            {/* Description & Specs */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-outline-variant/10 space-y-12">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                    {bike.category}
                  </span>
                  <div className="flex items-center gap-1 text-tertiary">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold">{bike.rating} ({bike.reviewCount} reviews)</span>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-on-surface mb-6">{bike.name}</h1>
                <p className="text-secondary leading-relaxed text-lg">
                  {bike.description}
                </p>
              </section>

              <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-secondary">
                    <Gauge size={16} className="text-primary" />
                    <span className="text-[10px] uppercase font-bold tracking-wider">Engine</span>
                  </div>
                  <p className="font-bold text-on-surface">{bike.engineSize}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-secondary">
                    <Fuel size={16} className="text-primary" />
                    <span className="text-[10px] uppercase font-bold tracking-wider">Fuel</span>
                  </div>
                  <p className="font-bold text-on-surface">{bike.specs.fuelCapacity}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-secondary">
                    <Weight size={16} className="text-primary" />
                    <span className="text-[10px] uppercase font-bold tracking-wider">Weight</span>
                  </div>
                  <p className="font-bold text-on-surface">{bike.specs.weight}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-secondary">
                    <ArrowUpRight size={16} className="text-primary" />
                    <span className="text-[10px] uppercase font-bold tracking-wider">Top Speed</span>
                  </div>
                  <p className="font-bold text-on-surface">{bike.specs.topSpeed}</p>
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-xl font-bold text-on-surface">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bike.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-surface-container/30 border border-outline-variant/10">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <CheckCircle2 size={18} />
                      </div>
                      <span className="text-sm font-medium text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Right Column: Booking Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-outline-variant/10">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Rental Price</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-primary">{formatPrice(bike.pricePerDay)}</span>
                      <span className="text-sm text-secondary font-medium">/day</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-tertiary mb-1">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-bold">{bike.rating}</span>
                    </div>
                    <p className="text-xs text-secondary">{bike.reviewCount} reviews</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-4 rounded-2xl bg-surface-container/50 border border-outline-variant/10 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-secondary uppercase tracking-wider">Pickup Location</p>
                      <p className="text-sm font-bold text-on-surface">{bike.location || 'Ho Chi Minh City'}</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-surface-container/50 border border-outline-variant/10 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-secondary uppercase tracking-wider">Availability</p>
                      <p className="text-sm font-bold text-on-surface">Available Today</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleBookNow}
                  className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-primary-container transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
                >
                  Book Now
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="mt-8 pt-8 border-t border-outline-variant/10 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-secondary">
                    <Shield size={18} className="text-primary" />
                    <span>Basic insurance included</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-secondary">
                    <Clock size={18} className="text-primary" />
                    <span>Free cancellation up to 24h</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-secondary">
                    <Info size={18} className="text-primary" />
                    <span>No hidden fees, pay on pickup</span>
                  </div>
                </div>
              </div>

              {/* Support Card */}
              <div className="bg-primary/5 rounded-[2rem] p-6 border border-primary/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                  <Info size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Need help?</h4>
                  <p className="text-sm text-secondary">Chat with our local experts 24/7</p>
                </div>
                <button className="ml-auto text-primary font-bold text-sm hover:underline">
                  Chat
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
