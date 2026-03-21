'use client';

import Link from 'next/link';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { motion } from 'motion/react';
import { Vehicle } from '@/types';

interface BikeCardProps {
  bike: Vehicle;
  index?: number;
}

export default function BikeCard({ bike, index = 0 }: BikeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        href={`/bikes/${bike.slug || bike.id}`}
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
  );
}
