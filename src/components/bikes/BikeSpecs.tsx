import { Gauge, Fuel, Weight, ArrowUpRight } from "lucide-react";
import { Vehicle } from "@/types";

interface BikeSpecsProps {
  specs: Vehicle["specs"];
  engineSize: string;
}

export default function BikeSpecs({ specs, engineSize }: BikeSpecsProps) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-secondary">
          <Gauge size={16} className="text-primary" />
          <span className="text-[10px] uppercase font-bold tracking-wider">
            Engine
          </span>
        </div>
        <p className="font-bold text-on-surface">{engineSize}</p>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-secondary">
          <Fuel size={16} className="text-primary" />
          <span className="text-[10px] uppercase font-bold tracking-wider">
            Fuel
          </span>
        </div>
        <p className="font-bold text-on-surface">{specs?.fuelCapacity}</p>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-secondary">
          <Weight size={16} className="text-primary" />
          <span className="text-[10px] uppercase font-bold tracking-wider">
            Weight
          </span>
        </div>
        <p className="font-bold text-on-surface">{specs?.weight}</p>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-secondary">
          <ArrowUpRight size={16} className="text-primary" />
          <span className="text-[10px] uppercase font-bold tracking-wider">
            Top Speed
          </span>
        </div>
        <p className="font-bold text-on-surface">{specs?.topSpeed}</p>
      </div>
    </section>
  );
}
