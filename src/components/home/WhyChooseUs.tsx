import { CheckCircle2 } from 'lucide-react';

export default function WhyChooseUs() {
  return (
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
  );
}
