import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
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
              href="/bikes"
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
  );
}
