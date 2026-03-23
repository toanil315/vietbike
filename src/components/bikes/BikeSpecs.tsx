import { Gauge, Fuel, Weight, ArrowUpRight } from "lucide-react";
import { Vehicle } from "@/types";

interface BikeSpecsProps {
  vehicle: Vehicle;
}

export default function BikeSpecs({ vehicle }: BikeSpecsProps) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-secondary">
          <Gauge size={16} className="text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Model
          </span>
        </div>
        <p className="font-bold text-on-surface">{vehicle.model}</p>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2 text-secondary">
          <Fuel size={16} className="text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Fuel
          </span>
        </div>
        <p className="font-bold text-on-surface">{vehicle.fuelType}</p>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2 text-secondary">
          <Weight size={16} className="text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Seats
          </span>
        </div>
        <p className="font-bold text-on-surface">{vehicle.availableSeats}</p>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2 text-secondary">
          <ArrowUpRight size={16} className="text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Transmission
          </span>
        </div>
        <p className="font-bold text-on-surface">{vehicle.transmission}</p>
      </div>
    </section>
  );
}
