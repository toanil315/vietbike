import Link from 'next/link';
import { Bike, Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowUpRight, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-on-surface text-white pt-24 pb-12 overflow-hidden relative">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          <div className="md:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white transition-all duration-500 group-hover:rotate-12 shadow-lg shadow-primary/20">
                <Bike size={26} />
              </div>
              <span className="text-3xl font-black tracking-tighter">
                VIET<span className="text-primary">BIKE</span>
              </span>
            </Link>
            <p className="text-white/50 text-base leading-relaxed max-w-sm">
              Premium motorbike rental service in Vietnam. Experience the freedom of the open road with our meticulously maintained fleet and 24/7 support.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
                >
                  <Icon size={20} className="text-white/70 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-8">Explore</h4>
            <ul className="space-y-4 text-sm font-bold text-white/60">
              <li><Link href="/" className="hover:text-white transition-colors flex items-center gap-2 group">Home <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              <li><Link href="/bikes" className="hover:text-white transition-colors flex items-center gap-2 group">Our Fleet <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              <li><Link href="/#locations" className="hover:text-white transition-colors flex items-center gap-2 group">Locations <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors flex items-center gap-2 group">Contact <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-8">Support</h4>
            <ul className="space-y-4 text-sm font-bold text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Rental Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-8">Contact Info</h4>
            <ul className="space-y-6 text-sm font-bold text-white/60">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-primary" />
                </div>
                <span className="leading-relaxed">123 Old Quarter, Hoan Kiem,<br />Hanoi, Vietnam</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-primary" />
                </div>
                <span>+84 90 123 4567</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-primary" />
                </div>
                <span>hello@vietbike.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs font-bold text-white/30 uppercase tracking-widest">
            © 2026 VIETBIKE PREMIUM RENTALS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
