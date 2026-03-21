import { CheckCircle2 } from 'lucide-react';

export default function BikeFeatures({ features }: { features: string[] }) {
  return (
    <section className="space-y-6">
      <h3 className="text-xl font-bold text-on-surface">Key Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-surface-container/30 border border-outline-variant/10">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <CheckCircle2 size={18} />
            </div>
            <span className="text-sm font-medium text-secondary">{feature}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
