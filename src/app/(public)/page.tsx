import { Link } from "react-router-dom";
import {
  ArrowRight,
  Star,
  Shield,
  Clock,
  MapPin,
  Bike,
  ChevronRight,
  CheckCircle2,
  Play,
} from "lucide-react";
import { VEHICLES } from "@/data/mockData";
import { formatPrice } from "@/lib/utils";
import { motion } from "motion/react";

export default function HomePage() {
  const featuredBikes = VEHICLES.slice(0, 4);

  return (
    <div className="bg-surface-container/30 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-on-surface">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/vietnam-road-trip/1920/1080"
            alt="Vietnam Road"
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-on-surface via-on-surface/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/30 px-4 py-2 rounded-full text-primary text-xs font-bold uppercase tracking-widest mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Premium Bike Rentals in Vietnam
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-[0.9]"
            >
              Ride Your <br />
              <span className="text-primary italic">Adventure.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/70 max-w-xl mb-12 leading-relaxed"
            >
              Curated fleet of premium motorbikes for the discerning traveler.
              Explore Vietnam's hidden gems with style and reliability.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/bikes"
                className="bg-primary text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-primary-container transition-all shadow-xl shadow-primary/20 flex items-center gap-2 group"
              >
                Explore Fleet{" "}
                <ArrowRight
                  size={22}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Play size={14} fill="currentColor" />
                </div>
                How it works
              </button>
            </motion.div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-12 right-12 hidden lg:flex gap-12 text-white">
          <div>
            <p className="text-4xl font-bold mb-1">500+</p>
            <p className="text-xs font-bold text-white/50 uppercase tracking-widest">
              Happy Riders
            </p>
          </div>
          <div className="w-px h-12 bg-white/20"></div>
          <div>
            <p className="text-4xl font-bold mb-1">12</p>
            <p className="text-xs font-bold text-white/50 uppercase tracking-widest">
              Cities Covered
            </p>
          </div>
          <div className="w-px h-12 bg-white/20"></div>
          <div>
            <p className="text-4xl font-bold mb-1">4.9</p>
            <p className="text-xs font-bold text-white/50 uppercase tracking-widest">
              Average Rating
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar Overlay */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-outline-variant/10 flex flex-wrap items-center gap-8">
          <div className="flex-1 min-w-[200px] space-y-2">
            <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">
              Location
            </label>
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-primary" />
              <select className="bg-transparent font-bold text-on-surface focus:outline-none w-full appearance-none cursor-pointer">
                <option>Ho Chi Minh City</option>
                <option>Hanoi</option>
                <option>Da Nang</option>
                <option>Da Lat</option>
              </select>
            </div>
          </div>
          <div className="w-px h-12 bg-outline-variant/20 hidden md:block"></div>
          <div className="flex-1 min-w-[200px] space-y-2">
            <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">
              Pickup Date
            </label>
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-primary" />
              <input
                type="date"
                className="bg-transparent font-bold text-on-surface focus:outline-none w-full cursor-pointer"
              />
            </div>
          </div>
          <div className="w-px h-12 bg-outline-variant/20 hidden md:block"></div>
          <div className="flex-1 min-w-[200px] space-y-2">
            <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">
              Bike Type
            </label>
            <div className="flex items-center gap-3">
              <Bike size={20} className="text-primary" />
              <select className="bg-transparent font-bold text-on-surface focus:outline-none w-full appearance-none cursor-pointer">
                <option>All Types</option>
                <option>Scooter</option>
                <option>Sport</option>
                <option>Off-road</option>
              </select>
            </div>
          </div>
          <Link
            to="/bikes"
            className="bg-on-surface text-white px-10 py-5 rounded-2xl font-bold hover:bg-on-surface/90 transition-all shadow-lg"
          >
            Search
          </Link>
        </div>
      </div>

      {/* Featured Bikes */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 tracking-tight">
              Our Featured Fleet
            </h2>
            <p className="text-secondary text-lg">
              Hand-picked premium motorbikes maintained to the highest standards
              for your safety and comfort.
            </p>
          </div>
          <Link
            to="/bikes"
            className="group flex items-center gap-2 text-primary font-bold text-lg hover:underline"
          >
            View All Fleet{" "}
            <ChevronRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredBikes.map((bike, index) => (
            <motion.div
              key={bike.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/bikes/${bike.slug}`}
                className="group bg-white rounded-[2rem] overflow-hidden border border-outline-variant/10 hover:border-primary/30 transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-bold text-primary uppercase tracking-wider shadow-sm">
                      {bike.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                      {bike.name}
                    </h3>
                    <div className="flex items-center gap-1 text-tertiary">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-bold">{bike.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-secondary text-xs mb-6">
                    <MapPin size={12} className="text-primary" />
                    <span>{bike.location || "Vietnam"}</span>
                  </div>
                  <div className="mt-auto pt-6 border-t border-outline-variant/10 flex justify-between items-center">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-on-surface">
                        {formatPrice(bike.pricePerDay)}
                      </span>
                      <span className="text-[10px] text-secondary font-medium">
                        /day
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-all">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-on-surface py-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 skew-x-12 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-tight">
                Why Choose <br />
                <span className="text-primary italic">VeloRent?</span>
              </h2>
              <p className="text-white/60 text-lg mb-12 max-w-lg">
                We're not just a rental service. We're your partners in
                adventure, providing the best gear and support for your journey.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Premium Fleet",
                    desc: "Only latest models from top brands, meticulously maintained.",
                  },
                  {
                    title: "Full Insurance",
                    desc: "Comprehensive coverage included with every rental.",
                  },
                  {
                    title: "24/7 Roadside Assistance",
                    desc: "We're always just a call away, anywhere in Vietnam.",
                  },
                  {
                    title: "Flexible Pickup",
                    desc: "Pickup and drop-off at airports, hotels, or our city hubs.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">
                        {item.title}
                      </h4>
                      <p className="text-white/40 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden border-8 border-white/5 relative z-10">
                <img
                  src="https://picsum.photos/seed/bike-adventure/1000/1000"
                  alt="Bike Adventure"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary rounded-[3rem] -z-0 animate-pulse opacity-20 blur-3xl"></div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary rounded-[3rem] -z-0 animate-pulse opacity-20 blur-3xl delay-700"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/30">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tighter">
                Ready to start your <br /> Vietnamese journey?
              </h2>
              <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
                Join thousands of happy riders who explored Vietnam with
                VeloRent. Book your bike today and get 10% off your first
                rental.
              </p>
              <Link
                to="/bikes"
                className="bg-white text-primary px-12 py-6 rounded-2xl font-bold text-xl hover:bg-surface-container transition-all shadow-xl inline-flex items-center gap-2 group"
              >
                Book Your Ride{" "}
                <ArrowRight
                  size={24}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
